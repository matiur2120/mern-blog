import { Button, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

const PostPage = () => {
  const { postSlug } = useParams();
  console.log(postSlug);
  const [post, setPost] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
        const data = await res.json();
        if (res.ok) {
          setLoading(false);
          setError(null);
          setPost(data.posts[0]);
        }
      } catch (error) {
        setError(error.message);
        setLoading(false);
        console.log(error.message);
      }
    };
    fetchPost();
  }, [postSlug]);
  console.log(post);
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    );
  }
  return (
    <main className="flex flex-col max-w-6xl mx-auto min-h-screen">
      <h2 className="text-4xl text-center mt-4 p-8">{post.title}</h2>
      <Link
        to={`/search?category=${post && post.title}`}
        className="self-center  p-2"
      >
        <Button color="gray" pill size="xs">
          {post && post.category}
        </Button>
      </Link>
      <img
        src={post && post.image}
        alt={post && post.title}
        className="mt-10 p-3 max-h-[600px] max-w-2xl mx-auto w-full object-cover"
      />
      <div className="flex justify-between p-4 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs">
        <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
        <span className="italic">
          {post && (post.content.length / 1000).toFixed(0)} mins read
        </span>
      </div>
      <div
        className="p-3 max-w-2xl mx-auto w-full post-content"
        dangerouslySetInnerHTML={{ __html: post && post.content }}
      ></div>
    </main>
  );
};

export default PostPage;
