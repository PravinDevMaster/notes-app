import { useEffect, useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import NoteCard from "../../components/Cards/NoteCard";
import { MdAdd } from "react-icons/md";
import AddEditNote from "./AddEditNote";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import Toast from "../../components/ToastMessage/Toast";
import EmptyCard from "../../components/EmptyCard/EmptyCard";
import NoDataFound from "../../assets/images/no-data-found.svg";
Modal.setAppElement("#root");
const Home = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShow: false,
    type: "add",
    data: null,
  });

  const [showToastMessage, setShowToastMessage] = useState({
    isShow: false,
    message: "",
    type: "add",
  });

  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});
  const [allNotes, setAllNotes] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // get user info
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/user/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  // get all notes
  const getAllNotes = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get("/note");
      if (response.data && response.data.notes) {
        setAllNotes(response.data.notes);
      }
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      console.log("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // handle note edit
  const handleEdit = (noteDetail) => {
    setOpenAddEditModal({ isShow: true, data: noteDetail, type: "edit" });
  };

  // toast message close function
  const handleCloseToast = () => {
    setShowToastMessage({
      isShow: false,
      message: "",
    });
  };

  // toast message open function
  const handleShowToast = (message, type) => {
    setShowToastMessage({
      isShow: true,
      message,
      type,
    });
  };

  useEffect(() => {
    getAllNotes();
    getUserInfo();
  }, []);

  // delete note
  const deleteNote = async (data) => {
    const noteId = data?._id;
    try {
      const response = await axiosInstance.delete(`/note/${noteId}`);

      if (response.data && !response.data.error) {
        handleShowToast("Note Deleted Successfully", "delete");
        getAllNotes();
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message)
        console.log("An unexpected error occurred. Please try again.");
    }
  };

  // search note
  const onSearchNote = async (query) => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.post(
        "/note/search-notes/",
        {},
        {
          params: { query },
        }
      );

      if (response.data && response.data.notes) {
        setIsSearch(true);
        setAllNotes(response.data.notes);
      } else {
        setAllNotes([]);
      }
    } catch (error) {
      setAllNotes([]);
      if (error.response && error.response.data && error.response.data.message)
        console.log("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const updateIsPinned = async (noteData) => {
    const noteId = noteData?._id;
    try {
      const response = await axiosInstance.put(
        `/note/update-note-pinned/${noteId}`,
        {
          isPinned: !noteId.isPinned,
        }
      );

      if (response.data && response.data.note) {
        handleShowToast("Note Updated Successfully");
        getAllNotes();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // function to clear the search
  const handleClearSearch = () => {
    setIsSearch(false);
    getAllNotes();
  };
  return (
    <>
      {/* Navbar component */}
      <NavBar
        userInfo={userInfo}
        onSearchNote={onSearchNote}
        handleClearSearch={handleClearSearch}
      />
      <div className="container bg-primary-a0 dark:bg-surface-a0 pb-10 mx-auto transition-all">
        {isLoading ? (
          <div className="mt-20 w-auto text-center animate-pulse text-lg font-semibold">
            Loading...
          </div>
        ) : allNotes && allNotes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 px-2 sm:px-0 gap-4 mt-8">
            {allNotes.map((item, index) => {
              return (
                <NoteCard
                  key={index}
                  title={item?.title}
                  date={item.createdOn}
                  content={item?.content}
                  tags={item?.tags}
                  isPinned={item?.isPinned}
                  onEdit={() => handleEdit(item)}
                  onDelete={() => deleteNote(item)}
                  onPinNote={() => updateIsPinned(item)}
                />
              );
            })}
          </div>
        ) : (
          <EmptyCard
            imgSrc={NoDataFound}
            isSearch={isSearch}
            message={
              isSearch
                ? "No matching notes found. Try refining your search or adding a new note."
                : "You haven't created any notes yet. Start jotting down your thoughts, ideas, or important tasks to keep everything organized in one place. Click the 'Add Note' button to create your first note and make this space yours!"
            }
          />
        )}

        <div
          className=" cursor-pointer w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 fixed right-10 bottom-10"
          onClick={() => {
            setOpenAddEditModal({ isShow: true, type: "add", data: null });
          }}
        >
          {/* note add button */}
          <MdAdd className="text-[32px] text-white" />
        </div>
      </div>
      <Modal
        isOpen={openAddEditModal.isShow}
        onRequestClose={() =>
          setOpenAddEditModal({ isShow: false, type: "add", data: null })
        }
        className={
          "w-[90%] lg:w-[40%] max-h-3/4  rounded-md mx-auto mt-24 p-5 bg-primary-a0 dark:bg-surface-a10"
        }
        contentLabel=""
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
          },
        }}
      >
        {/* notes add and edit component */}
        <AddEditNote
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          onClose={() =>
            setOpenAddEditModal({ isShow: false, type: "add", data: null })
          }
          getAllNotes={getAllNotes}
          handleShowToast={handleShowToast}
        />
      </Modal>

      {/* toast message component */}
      <Toast
        isShow={showToastMessage?.isShow}
        message={showToastMessage.message}
        type={showToastMessage.type}
        onClose={handleCloseToast}
      />
    </>
  );
};

export default Home;
