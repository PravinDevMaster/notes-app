import moment from "moment/moment";
import { MdCreate, MdDelete, MdOutlinePushPin } from "react-icons/md";

const NoteCard = ({
  title,
  date,
  content,
  tags,
  isPinned,
  onEdit,
  onDelete,
  onPinNote,
}) => {
  return (
    <div className="border-gray-300 dark:border-gray-600 border-[1.5px] rounded p-4 bg-primary-a0 dark:bg-surface-a10 hover:shadow-2xl transition-all ease-in-out">
      <div className="flex items-center justify-between">
        <div>
          <h6 className="text-sm font-medium">{title}</h6>
          <span className="text-xs text-slate-500 dark:text-primary-a0">
            {moment(date).format("Do MM YYYY")}
          </span>
        </div>
        <MdOutlinePushPin
          className={`icon-btn ${isPinned ? "text-primary" : "text-slate-300"}`}
          onClick={onPinNote}
        />
      </div>
      <p className="text-xs text-slate-600 dark:text-primary-a0 mt-2">
        {content.slice(0, 60)}
      </p>
      <div className="flex items-center justify-between mt-2">
        <div className="text-xs text-slate-500 dark:text-primary-a0">
          {tags?.map((item) => `#${item} `)}
        </div>
        <div className="flex items-center gap-2">
          <MdCreate
            className="icon-btn hover:text-green-600"
            onClick={onEdit}
          />

          <MdDelete
            onClick={onDelete}
            className="icon-btn hover:text-red-500"
          />
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
