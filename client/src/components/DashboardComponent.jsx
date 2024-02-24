import { Button, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import {
  HiAnnotation,
  HiArrowNarrowUp,
  HiDocumentText,
  HiOutlineUserGroup,
} from "react-icons/hi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const DashboardComponent = () => {
  const [users, setUsers] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const [lastMonthComments, setLastMonthComments] = useState(0);
  const [lastMonthPosts, setLastMonthPosts] = useState(0);
  console.log(posts);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/post/getposts?limit=5");
        const data = await res.json();
        if (res.ok) {
          setPosts(data.posts);
          setTotalPosts(data.totalPosts);
          setLastMonthPosts(data.lastMonthPosts);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    const fetchComments = async () => {
      try {
        const res = await fetch("/api/comment/getComments?limit=5");
        const data = await res.json();
        if (res.ok) {
          setComments(data.comments);
          setTotalComments(data.totalComments);
          setLastMonthComments(data.lastMonthComments);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/user/getusers?limit=5");
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
          setTotalUsers(data.totalUsers);
          setLastMonthUsers(data.lastMonthUsers);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser?.isAdmin) {
      fetchUsers();
      fetchComments();
      fetchPosts();
    }
  }, [currentUser?.isAdmin]);

  return (
    <div>
      <div className="flex flex-col md:flex-row  flex-wrap justify-center items-center gap-4 mt-5">
        <div className="w-[250px] flex flex-col gap-2 p-2 bg-gray-200 rounded-md shadow-md dark:bg-slate-800">
          <div className="flex justify-between px-2 items-center ">
            <div>
              <h4 className="font-bold text-gray-500 uppercase">Total Users</h4>
              <h4>{totalUsers}</h4>
            </div>
            <HiOutlineUserGroup className="bg-green-600 text-white rounded-full text-5xl p-3 shadow-lg" />
          </div>
          <div className="text-green-500 flex justify-start text-xs gap-1 items-center">
            <HiArrowNarrowUp className="font-2xl" />
            <span>{lastMonthUsers}</span>
            <span className="text-gray-500">Last month</span>
          </div>
        </div>
        <div className="w-[250px] flex flex-col gap-2 p-2 bg-gray-200 rounded-md shadow-md dark:bg-slate-800">
          <div className="flex justify-between px-2 items-center ">
            <div>
              <h4 className="font-bold text-gray-500 uppercase">Total Posts</h4>
              <h4>{totalPosts}</h4>
            </div>
            <HiDocumentText className="bg-indigo-600 text-white rounded-full text-5xl p-3 shadow-lg" />
          </div>
          <div className="text-green-500 flex justify-start text-xs gap-1 items-center">
            <HiArrowNarrowUp className="font-2xl" />
            <span>{lastMonthPosts}</span>
            <span className="text-purple-500">Last month</span>
          </div>
        </div>
        <div className="w-[250px] flex flex-col gap-2 p-2 bg-gray-200 rounded-md shadow-md dark:bg-slate-800">
          <div className="flex justify-between px-2 items-center ">
            <div>
              <h4 className="font-bold text-gray-500 uppercase">
                Total Comments
              </h4>
              <h4>{totalComments}</h4>
            </div>
            <HiAnnotation className="bg-teal-600 text-white rounded-full text-5xl p-3 shadow-lg" />
          </div>
          <div className="text-green-500 flex justify-start text-xs gap-1 items-center">
            <HiArrowNarrowUp className="font-2xl" />
            <span>{lastMonthComments}</span>
            <span className="text-gray-500">Last month</span>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 py-4 mx-auto justify-center">
        {/* current users section */}
        <div className="mt-5 flex flex-col flex-1 w-full md:w-auto mx-6 rounded-md dark:bg-gray-800 shadow-md">
          <div className="flex w-full justify-between items-center p-2 text-sm font-semibold md:w-auto rounded-md border-b-gray-500 border-b-2 mb-2 ">
            <h2 className="text-center p-2">Recent Users</h2>
            <Button outline gradientDuoTone="purpleToPink" size="xs">
              <Link to="/dashboard?tab=users">Sell all</Link>
            </Button>
          </div>
          <div>
            <Table hoverable striped>
              <Table.Head>
                <Table.HeadCell>User Image</Table.HeadCell>
                <Table.HeadCell>Username</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {users && users.length > 0
                  ? users.map((user) => (
                      <Table.Row key={user._id}>
                        <Table.Cell className="!py-0">
                          <img
                            src={user.profilePicture}
                            alt={user.username}
                            className="w-12 h-12 rounded-full p-2"
                          />
                        </Table.Cell>
                        <Table.Cell className="!py-0">
                          {user.username}
                        </Table.Cell>
                      </Table.Row>
                    ))
                  : "No user found"}
              </Table.Body>
            </Table>
          </div>
        </div>
        {/* current comments section */}
        <div className="mt-5 mx-6 flex flex-1 flex-col w-full md:w-auto rounded-md dark:bg-gray-800 shadow-md">
          <div className="flex w-full justify-between items-center p-2 text-sm font-semibold md:w-auto rounded-md border-b-gray-500 border-b-2 mb-2 ">
            <h2 className="text-center p-2">Recent Comments</h2>
            <Button outline gradientDuoTone="purpleToPink" size="xs">
              <Link to="/dashboard?tab=comments">Sell all</Link>
            </Button>
          </div>
          <div>
            <Table hoverable striped>
              <Table.Head>
                <Table.HeadCell>Comment content</Table.HeadCell>
                <Table.HeadCell>Likes</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {comments && comments.length > 0
                  ? comments.map((c) => (
                      <Table.Row key={c._id}>
                        <Table.Cell className="w-96">
                          <p className="line-clamp-2">{c.content}</p>
                        </Table.Cell>
                        <Table.Cell>{c.numberOfLikes}</Table.Cell>
                      </Table.Row>
                    ))
                  : "No comment found"}
              </Table.Body>
            </Table>
          </div>
        </div>
        <div className="mt-5 mx-6 flex flex-col w-full md:w-auto rounded-md dark:bg-gray-800 shadow-md">
          <div className="flex w-full justify-between items-center p-2 text-sm font-semibold md:w-auto rounded-md border-b-gray-500 border-b-2 mb-2 ">
            <h2 className="text-center p-2">Recent Posts</h2>
            <Button outline gradientDuoTone="purpleToPink" size="xs">
              <Link to="/dashboard?tab=posts">Sell all</Link>
            </Button>
          </div>
          <div>
            <Table hoverable striped>
              <Table.Head>
                <Table.HeadCell>Post Image</Table.HeadCell>
                <Table.HeadCell>Title</Table.HeadCell>
                <Table.HeadCell>Category</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {posts && posts.length > 0
                  ? posts.map((p) => (
                      <Table.Row key={p._id}>
                        <Table.Cell className="!py-0">
                          <img
                            src={p.image}
                            alt={p.title}
                            className="w-12 h-12 rounded-md p-2"
                          />
                        </Table.Cell>
                        <Table.Cell className="!py-0 line-clamp-1">
                          {p.title}
                        </Table.Cell>
                        <Table.Cell className="!py-0">{p.category}</Table.Cell>
                      </Table.Row>
                    ))
                  : "No post found"}
              </Table.Body>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardComponent;
