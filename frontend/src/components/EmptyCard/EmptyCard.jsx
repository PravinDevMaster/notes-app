import { AiOutlineFileAdd } from "react-icons/ai";

const EmptyCard = ({ imgSrc, message, isSearch }) => {
  return (
    <div className="w-full flex flex-col items-center justify-center mt-20">
      {isSearch ? (
        <img src={imgSrc} alt="No notes" className="w-60" />
      ) : (
        <AiOutlineFileAdd className="text-[200px]" />
      )}
      <p className="w-1/2 text-lg font-medium text-slate-700 dark:text-primary-a0 text-center leading-7 mt-5">
        {message}
      </p>
    </div>
  );
};

export default EmptyCard;
