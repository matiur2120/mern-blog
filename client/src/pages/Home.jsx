import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CallToAction from "../components/CallToAction";
import PostCard from "../components/PostCard";

const Home = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/post/getPosts");
        const data = await res.json();
        if (res.ok) {
          setPosts(data.posts);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchPosts();
  }, []);
  console.log(posts);
  return (
    <div>
      <div className="flex flex-col gap-6 p-28 px-3 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold lg:text-6xl">Welcome to my Blog</h1>
        <p className="text-gray-500 text-xs sm:text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima aut,
          ipsum ratione illum nulla sapiente maxime accusantium deleniti iste
          unde aspernatur delectus ut cupiditate earum consequuntur cum nihil
          sunt fugit excepturi quidem .
        </p>
        <Link
          to="/search"
          className="text-xs sm:text-sm text-teal-500 font-bold hover:underline"
        >
          View all posts
        </Link>
      </div>
      <div className="p-3 bg-amber-100 dark:bg-slate-700">
        <CallToAction />
      </div>
      <div className="w-full flex flex-col px-4">
        <h2 className="text-3xl text-center font-bold py-6 border-b border-b-gray-400">
          Recent Posts
        </h2>
        <div className="flex flex-wrap gap-6 items-center justify-center py-6 px-2">
          {posts && posts.length > 0
            ? posts.map((post) => <PostCard key={post._id} post={post} />)
            : "No post found"}
        </div>
        <Link
          className="text-center text-lg text-teal-500 hover:underline"
          to="/posts"
        >
          View all posts
        </Link>
      </div>
    </div>
  );
};

export default Home;
