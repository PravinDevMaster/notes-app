import { useState } from "react";
import { MdAdd, MdClose } from "react-icons/md";

const TagInput = ({ tags, setTags }) => {
  const [inputValue, setInputValue] = useState(""); //state to manage tag input field value

  //   function to handle the input field change
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  //   function to add new tag
  const addNewTap = () => {
    if (inputValue.trim() !== "") {
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addNewTap();
    }
  };

  //   function to remove the existing tag
  const handleRemoveTag = (removeTag) => {
    setTags(tags.filter((tag) => tag !== removeTag));
  };
  return (
    <div>
      {tags?.length > 0 && (
        <div className="flex items-center gap-2 mt-2 flex-wrap">
          {tags.map((tag, index) => (
            <span
              className="flex items-center gap-2 text-sm text-surface-a0 dark:text-primary-a0 bg-slate-100 dark:bg-[#353535] px-3 py-1 rounded"
              key={index}
            >
              # {tag}
              <button onClick={() => handleRemoveTag(tag)}>
                <MdClose />
              </button>
            </span>
          ))}
        </div>
      )}
      <div className="flex items-center gap-4 mt-3">
        <input
          className="text-sm bg-transparent text-surface-a0 dark:text-primary-a0 border border-gray-300 px-3 py-2 rounded outline-none"
          type="text"
          placeholder="Add tags"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={addNewTap}
          className="w-8 h-8 flex items-center justify-center rounded border border-blue-700 hover:bg-blue-700"
        >
          <MdAdd className="text-2xl text-blue-700 hover:text-white" />
        </button>
      </div>
    </div>
  );
};

export default TagInput;
