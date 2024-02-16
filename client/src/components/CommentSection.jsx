import { Alert, Button, Textarea } from "flowbite-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
// eslint-disable-next-line react/prop-types
const CommentSection = ({ postId }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const [commentError, setCommentError] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setCommentError(null);
    if (comment.length > 200) return;
    try {
      const res = await fetch("/api/comment/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: comment,
          userId: currentUser._id,
          postId,
        }),
      });
      if (res.ok) {
        setComment("");
        setCommentError(null);
      }
    } catch (error) {
      setCommentError(error.message);
    }
  };
  return (
    <div className="max-w-2xl mx-auto w-full p-3">
      {currentUser ? (
        <div>
          <div className="flex gap-2 items-center text-gary-500 px-3 text-sm my-4">
            <span className="font-semibold">Sign in as:</span>{" "}
            <img
              className="w-12 h-12 rounded-full p-2 object-cover"
              src={currentUser.profilePicture}
              alt="avatar"
            />{" "}
            <Link to="/dashboard?tab=profile">
              <span className="text-blue-800 italic">
                {currentUser.username}
              </span>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          You must be signed in to comment
          <Link to="/sign-in">Sign In</Link>
        </div>
      )}
      {currentUser && (
        <form
          onSubmit={handleSubmit}
          className="border border-teal-500 rounded-md p-3"
        >
          <Textarea
            onChange={(e) => setComment(e.target.value)}
            rows="3"
            required
            value={comment}
            maxLength="200"
            placeholder="Add a comment...."
          />
          <div className="flex justify-between my-3 items-center">
            <p className="text-xs my-2">
              {200 - comment.length} characters reamaining
            </p>
            <Button size="xs" outline type="submit">
              Submit
            </Button>
          </div>
          {commentError && <Alert color="failure">{commentError}</Alert>}
        </form>
      )}
    </div>
  );
};

export default CommentSection;
