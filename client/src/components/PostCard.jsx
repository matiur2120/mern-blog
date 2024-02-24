import { Link } from "react-router-dom";

const PostCard = ({ post }) => {
  console.log(post);
  return (
    <div className="group relative overflow-hidden w-full border h-[400px] p-2 rounded-lg max-w-[250px]">
      <Link to={`/post/${post.slug}`}>
        <img
          src={post.image}
          alt="covet photo"
          className="h-[260px]  w-full object-cover group-hover:h-[200px] transition-all duration-300 z-20"
        />
      </Link>
      <div className="flex flex-col gap-2 pt-5">
        <h4 className="font-semibold line-clamp-2">{post.title}</h4>
        <p className="text-xs text-gray-600 italic ">{post.category}</p>
        <Link
          className="z-10 group-hover:bottom-0 absolute bottom-[-200px] left-0 right-0 border border-teal-500 rounded-md text-teal-500 hover:bg-teal-500 hover:text-white text-center py-2 m-2 !rounded-tl-none text-sm transition-all duration-300"
          to={`/post/${post.slug}`}
        >
          Read article
        </Link>
      </div>
    </div>
    // <Card
    //   className="max-w-sm border-gray-300 rounded-md"
    //   renderImage={() => (
    //     <img className="w-full" src={post.image} alt="image 1" />
    //   )}
    // >
    //   <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
    //     {post.title}
    //   </h5>
    //   <p className="font-normal text-xs text-gray-700 dark:text-gray-400">
    //     {post.category}
    //   </p>
    //   <Button size="xs">Read article</Button>
    // </Card>
  );
};

export default PostCard;
