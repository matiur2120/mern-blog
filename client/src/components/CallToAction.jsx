import { Button } from "flowbite-react";

const CallToAction = () => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 border border-teal-500 p-3 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center m-3">
      <div className="flex-1 p-2">
        <h2 className="text-2xl font-semibold m-3">
          Want to learn HTML, CSS and JavaScript by building fun and engaging
          projects?
        </h2>
        <p className="text-gray-500 my-2">
          Check our 100 js projects website and start building your own projects
        </p>
        <Button
          gradientDuoTone="purpleToPink"
          className="w-full rounded-tl-xl rounded-bl-none"
          size="xs"
        >
          100 js Projects Website
        </Button>
      </div>
      <div className="flex-1">
        <img
          src="https://bairesdev.mo.cloudinary.net/blog/2023/08/What-Is-JavaScript-Used-For.jpg"
          alt="JavaScript"
        />
      </div>
    </div>
  );
};

export default CallToAction;
