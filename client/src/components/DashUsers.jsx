import { Button, Modal, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { IoCloseOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const DashUsers = () => {
  const [usersData, setUsersData] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [error, setError] = useState(null);
  useEffect(() => {
    try {
      const fetchUsers = async () => {
        const res = await fetch("/api/user/getusers");
        const data = await res.json();
        if (!res.ok) {
          setError("Data fetching error");
          return;
        }
        if (res.ok) {
          setError(null);
          setUsersData(data.users);
          if (data?.users.length > 9) {
            setShowMore(true);
          }
        }
      };
      if (currentUser?.isAdmin) {
        fetchUsers();
      }
    } catch (error) {
      setError(error.message);
    }
  }, [currentUser?.isAdmin]);

  const handleShowMore = async () => {
    const startIndex = usersData.length;
    console.log("hello show more");
    try {
      const res = await fetch(`/api/user/getusers?startIndex=${startIndex}`);
      const { users } = await res.json();
      if (res.ok) {
        setUsersData((prev) => [...prev, ...users]);
        if (users.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async () => {
    setShowModal(false);
    if (!currentUser?.isAdmin) {
      setError("Only admin can delete user");
      return;
    }
    try {
      const res = await fetch(
        `/api/user/deletebyadmin/${userIdToDelete}/${currentUser._id}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (!res.ok) {
        setError(data.message);
        return;
      }
      if (res.ok) {
        setUsersData((prev) =>
          prev.filter((user) => user._id !== userIdToDelete)
        );
      }
    } catch (error) {
      setError("User delete failed!");
    }
  };
  return (
    <div className="overflow-x-auto w-full  p-5">
      {currentUser?.isAdmin && usersData.length > 0 ? (
        <>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Date Created</Table.HeadCell>
              <Table.HeadCell>User Image</Table.HeadCell>
              <Table.HeadCell>Username</Table.HeadCell>
              <Table.HeadCell>Email</Table.HeadCell>
              <Table.HeadCell>Admin</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {usersData.map((user) => (
                <Table.Row
                  key={user._id}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell>
                    {new Date(user.createdAt).toLocaleDateString()}
                  </Table.Cell>
                  <Link to="">
                    <Table.Cell>
                      <img
                        src={user.profilePicture}
                        alt="user-image"
                        className="w-10 h-10 object-cover rounded-full"
                      />
                    </Table.Cell>
                  </Link>

                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {user.username}
                  </Table.Cell>
                  <Table.Cell>{user.email}</Table.Cell>

                  <Table.Cell>
                    {user.isAdmin ? <FaCheck /> : <IoCloseOutline />}
                  </Table.Cell>
                  <Table.Cell>
                    <span
                      onClick={() => {
                        setShowModal(true);
                        setUserIdToDelete(user._id);
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
        "No user found!"
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
              Are you sure you want to delete the user?
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

export default DashUsers;
