import { Button, Modal, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useSelector } from "react-redux";

const DashComments = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [commentIdToDel, setCommentIdToDel] = useState(null);
  const handleShowMore = async () => {
    const startIndex = comments.length;
    try {
      const res = await fetch(
        `/api/comment/getComments?startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setComments((prev) => [...prev, ...data.comments]);
        if (data.posts.length < 10) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async () => {
    setShowModal(false);
    try {
      const res = await fetch(`/api/comment/deleteComment/${commentIdToDel}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
        return;
      }
      if (res.ok) {
        setComments((prev) => prev.filter((c) => c._id !== commentIdToDel));
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch("/api/comment/getComments");
        const data = await res.json();
        if (res.ok) {
          setComments(data.comments);
          if (data.comments.length < 10) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser?.isAdmin) fetchComments();
  }, [currentUser?.isAdmin]);
  console.log(comments);
  return (
    <div className="overflow-x-auto w-full  p-5">
      {currentUser?.isAdmin && comments.length > 0 ? (
        <>
          <Table hoverable className="text-[12px]">
            <Table.Head>
              <Table.HeadCell>Date Updated</Table.HeadCell>
              <Table.HeadCell>Comment Content</Table.HeadCell>
              <Table.HeadCell>Number of Likes</Table.HeadCell>
              <Table.HeadCell>Post Id</Table.HeadCell>
              <Table.HeadCell>User Id</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {comments.map((c) => (
                <Table.Row
                  key={c._id}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell>
                    {new Date(c.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <span className="line-clamp-1">{c.content}</span>
                  </Table.Cell>

                  <Table.Cell>{c.numberOfLikes}</Table.Cell>
                  <Table.Cell>{c.postId}</Table.Cell>
                  <Table.Cell>{c.userId}</Table.Cell>

                  <Table.Cell>
                    <span
                      onClick={() => {
                        setShowModal(true);
                        setCommentIdToDel(c._id);
                      }}
                      className="text-red-500 cursor-pointer hover:text-red-700"
                    >
                      Delete
                    </span>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
          {showMore && (
            <button
              onClick={handleShowMore}
              className="w-full self-center py-3"
            >
              Show More
            </button>
          )}
        </>
      ) : (
        "There is no comment"
      )}
      <Modal
        show={showModal}
        size="md"
        onClose={() => setShowModal(false)}
        popup
      >
        <Modal.Body>
          <Modal.Header />
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this comment?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={() => handleDelete()}>
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DashComments;
