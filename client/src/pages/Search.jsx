import { Button, Select, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import PostCard from "../components/PostCard";

export const Search = () => {
  const [searchData, setSearchData] = useState({
    searchTerm: "",
    sort: "desc",
    category: "uncategorize",
  });
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTearmFromUrl = urlParams.get("searchTerm");
    const sortFromUrl = urlParams.get("sort");
    const categoryFromUrl = urlParams.get("category");
    if (searchTearmFromUrl || sortFromUrl || categoryFromUrl) {
      setSearchData({
        searchTerm: searchTearmFromUrl,
        sort: sortFromUrl,
        category: categoryFromUrl,
      });
    }
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const searchQuery = urlParams.toString();
        const res = await fetch(`/api/post/getposts?${searchQuery}`);
        const data = await res.json();
        if (res.ok) {
          setPosts(data.posts);
          setLoading(false);
          if (data.posts.length === 9) {
            setShowMore(true);
          } else {
            setShowMore(false);
          }
        }
      } catch (error) {
        setLoading(false);
        console.log(error.message);
      }
    };
    fetchPosts();
  }, [location.search]);

  const handleChange = (e) => {
    if (e.target.name === "search") {
      setSearchData({ ...searchData, searchTerm: e.target.value });
    }
    if (e.target.name === "sort") {
      setSearchData({ ...searchData, sort: e.target.value || "desc" });
    }
    if (e.target.name === "category") {
      setSearchData({
        ...searchData,
        category: e.target.value || "uncategorize",
      });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", searchData.searchTerm);
    urlParams.set("sort", searchData.sort);
    urlParams.set("category", searchData.category);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const handleShowMore = async () => {
    const startIndex = posts.length;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex);
    const searchQuary = urlParams.toString();
    try {
      setLoading(true);
      const res = await fetch(`/api/post/getposts?${searchQuary}`);
      const data = await res.json();
      if (res.ok) {
        setPosts((prev) => [...prev, ...data.posts]);
        setLoading(false);
        if (data.posts.length === 9) {
          setShowMore(true);
        } else {
          setShowMore(false);
        }
      }
    } catch (error) {
      setLoading(false);
      console.log(error.message);
    }
  };
  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-6 md:border-r border-gray-500 min-h-screen">
        <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
          <div className="flex items-center gap-2">
            <label>Search Tearm:</label>
            <TextInput
              placeholder="Search..."
              name="search"
              type="text"
              onChange={handleChange}
              value={searchData.searchTerm}
            />
          </div>
          <div className="flex items-center gap-2">
            <label>Sort: </label>
            <Select
              name="sort"
              onChange={handleChange}
              defaultValue={searchData.sort}
            >
              <option value="desc">Latest</option>
              <option value="asc">Oldest</option>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <label>Category: </label>
            <Select
              name="category"
              defaultValue={searchData.category}
              onChange={handleChange}
            >
              <option value="uncategorize">Uncategorize</option>
              <option value="react">React.js</option>
              <option value="nextjs">Next.js</option>
              <option value="nodejs">Node.js</option>
              <option value="mongodb">Mongodb.js</option>
            </Select>
          </div>
          <Button type="submit">Apply filters</Button>
        </form>
      </div>
      <div className="w-full">
        <h1 className="text-3xl font-semibold sm:border-b border-gray-500 p-3 mt-5 text-center">
          Posts results
        </h1>
        <div className="flex flex-wrap gap-6 p-6 justify-center">
          {!loading && posts.length === 0 && (
            <p className="p-6 text-3xl ">No post found!</p>
          )}
          {loading && <p className="p-6 text-3xl ">Loading....</p>}
          {!loading &&
            posts.length > 0 &&
            posts.map((post) => <PostCard key={post._d} post={post} />)}
        </div>
        {showMore && (
          <button
            onClick={handleShowMore}
            className="w-full mx-auto text-teal-500 font-semibold hover:underline text-2xl"
          >
            Show more
          </button>
        )}
      </div>
    </div>
  );
};
