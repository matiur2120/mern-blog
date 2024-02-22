import { Alert, Button, Textarea } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Comment from "./Comment";
// eslint-disable-next-line react/prop-types
const CommentSection = ({ postId }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const [commentError, setCommentError] = useState(null);
  const [postComments, setPostComments] = useState([]);
  console.log(comment);

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
      const data = await res.json();
      if (res.ok) {
        setComment("");
        setPostComments([data, ...postComments]);
        setCommentError(null);
      }
    } catch (error) {
      setCommentError(error.message);
    }
  };
  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await fetch(`/api/comment/getPostComments/${postId}`);
        if (res.ok) {
          const data = await res.json();
          setPostComments(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getComments();
  }, [postId]);
  const handleCommentLike = async (commentId) => {
    console.log(commentId);
    try {
      const res = await fetch(`/api/comment/likeComment/${commentId}`, {
        method: "PUT",
      });
      if (res.ok) {
        console.log("data updated succesf");
        const data = await res.json();
        setPostComments(
          postComments.map((item) =>
            item._id === commentId
              ? {
                  ...item,
                  likes: data.likes,
                  numberOfLikes: data.likes.length,
                }
              : item
          )
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleUpdate = (commentId, editedContent) => {
    setPostComments(
      postComments.map((c) =>
        c._id === commentId ? { ...c, content: editedContent } : c
      )
    );
  };
  const handleDelete = async (commentId) => {
    console.log(commentId);
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
      {postComments.length < 0 ? (
        <p>No comment yet!</p>
      ) : (
        <>
          <div className="flex text-sm items-center gap-2 my-5">
            <p>Comments: </p>
            <p className="border border-gray-400 px-2 rounded-sm">
              {postComments.length}
            </p>
          </div>
          {postComments.map((comment) => (
            <Comment
              key={comment._id}
              comment={comment}
              onLike={() => handleCommentLike(comment._id)}
              onDelete={() => handleDelete(comment._id)}
              onUpdate={handleUpdate}
            />
          ))}
        </>
      )}{" "}
    </div>
  );
};

export default CommentSection;
