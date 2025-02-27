import { useState } from "react";
import TagInput from "../../components/Input/TagInput";
import { MdClose } from "react-icons/md";
import axiosInstance from "../../utils/axiosInstance";

const AddEditNote = ({
  onClose,
  noteData,
  type,
  getAllNotes,
  handleShowToast,
}) => {
  // State to manage the title input field value
  const [title, setTitle] = useState(noteData?.title || "");
  // State to manage the content input field value
  const [content, setContent] = useState(noteData?.content || "");
  // State to manage the tags input field value
  const [tags, setTags] = useState(noteData?.tags || "");

  // State to store and display validation error messages related to notes
  const [error, setError] = useState(null);

  // function handle the add new note
  const handleAddNote = () => {
    // validate the title is empty; if is valid, store the an error message in the error state
    if (!title) {
      // store the error message in the error state
      setError("Please enter the title");
      return; //stop function execution
    }

    // validate the content is empty; if is valid, store the ad error message in the error state
    if (!content) {
      // store the error message in the error state
      setError("Please enter the content");
      return; // stop function execution
    }

    setError(null); //clear any previous error message if validation passes

    // validate the type is edit; if is valid, call the edit node else add node function
    if (type === "edit") editNote();
    else addNote();
  };

  // edit note
  const editNote = async () => {
    const noteId = noteData?._id;
    try {
      const response = await axiosInstance.put(`/note/${noteId}`, {
        title,
        content,
        tags,
      });

      if (response.data && response.data.note) {
        handleShowToast("Note Updated Successfully");

        getAllNotes();
        onClose();
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message)
        setError(error.response.data.message);
    }
  };

  // add note
  const addNote = async () => {
    try {
      const response = await axiosInstance.post("/note/", {
        title,
        content,
        tags,
      });

      if (response.data && response.data.note) {
        handleShowToast("Note Added Successfully");
        getAllNotes();
        onClose();
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message)
        setError(error.response.data.message);
    }
  };

  return (
    <div className="relative ">
      {/* close button */}
      <button
        className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-50"
        onClick={onClose}
      >
        <MdClose className="text-xl text-slate-400" />
      </button>
      {/* title input field */}
      <div className="flex flex-col gap-2">
        <label className="input-label">TITLE</label>
        <input
          type="text"
          className="text-2xl text-slate-950 dark:text-primary-a0 outline-none"
          placeholder="Go To Gym At 5"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      {/* content input field */}
      <div className="flex flex-col gap-2 mt-4">
        <label className="input-label">CONTENT</label>
        <textarea
          type="text"
          className="text-2xl text-slate-950 outline-none dark:text-primary-a0 bg-slate-50 dark:bg-[#353535] p-2 rounded"
          placeholder="Content"
          rows={10}
          value={content}
          onChange={({ target }) => setContent(target.value)}
        />
      </div>
      {/* tags  */}
      <div className="mt-3">
        <label className="input-label">TAGS</label>
        {/* Tag input component */}
        <TagInput tags={tags} setTags={setTags} />
      </div>
      {/* display error message if the error state has a value */}
      {error && <p className="text-red-500 text-xs pt-4">{error}</p>}
      <button
        className="btn-primary font-medium mt-5 p-3 cursor-pointer"
        onClick={handleAddNote}
      >
        {type === "edit" ? "UPDATE" : "ADD"}
      </button>
    </div>
  );
};

export default AddEditNote;
