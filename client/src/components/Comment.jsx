import moment from "moment";
import { useEffect, useState } from "react";
import { FaThumbsUp } from "react-icons/fa";
import { useSelector } from "react-redux";

// eslint-disable-next-line react/prop-types
const Comment = ({ comment, onLike }) => {
  const { currentUser } = useSelector((state) => state.user);

  const { userId, content } = comment;
  const [user, setUser] = useState({});

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/user/${userId}`);
        if (res.ok) {
          const data = await res.json();
          setUser(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getUser();
  }, [userId]);

  return (
    <div>
      <div className="flex gap-2 text-sm my-2 border-b dark:border-gray-600 py-5">
        <img
          src={user.profilePicture}
          alt="avatar"
          className="w-10 h-10 rounded-full object-cover bg-gray-200 flex-shrink-0"
        />
        <div className="flex-1">
          <div>
            <span className="font-bold mr-1 text-xs truncate">
              {user ? `@${user.username}` : "anonymous user"}
            </span>{" "}
            <span className="text-xs italic text-gray-500">
              {moment(comment.createdAt).fromNow()}
            </span>
          </div>
          <p className="text-gray-500 mb-2">{content}</p>
          <div>
            <button
              type="button"
              onClick={onLike}
              className={` hover:text-blue-500 ${
                currentUser && comment.likes.includes(currentUser._id)
                  ? "text-blue-500"
                  : "text-gray-400"
              }`}
            >
              <FaThumbsUp />
            </button>
            <p className="text-xs text-gray-400">
              {comment.numberOfLikes > 0 &&
                comment.numberOfLikes +
                  " " +
                  (comment.numberOfLikes === 1 ? "like" : "likes")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
