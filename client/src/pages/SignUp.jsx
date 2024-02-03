import { Button, Label, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className="min-h-screen mt-20">
      <div className="flex flex-col gap-8 p-8 md:flex-row">
        <div className="flex-1 px-8">
          <Link
            to="/"
            className="self-center whitespace-nowrap text-sm sm:text-3xl font-semibold dark:text-white"
          >
            <span className="px-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              MR's
            </span>
            Blog
          </Link>
          <p className="text-justify mt-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium
            error minima inventore pariatur dolorem nesciunt consequatur dolor
            sit mollitia omnis? Molestiae nulla ad consequuntur vel iusto
            quibusdam dolores expedita fugit!
          </p>
        </div>
        <div className="flex-1 px-8 ">
          <form action="">
            <div className="my-2">
              <div className="mb-2 block">
                <Label htmlFor="username" value="Username" />
              </div>
              <TextInput
                id="username"
                type="text"
                required
                placeholder="email"
              />
            </div>
            <div className="my-2">
              <div className="mb-2 block">
                <Label htmlFor="email" value="Email" />
              </div>
              <TextInput id="email" type="email" required placeholder="email" />
            </div>
            <div className="my-2">
              <div className="mb-2 block">
                <Label htmlFor="password" value="password" />
              </div>
              <TextInput
                id="password"
                type="password"
                required
                placeholder="password"
              />
            </div>
            <Button
              type="submit"
              className="mt-4 w-full"
              gradientDuoTone="purpleToPink"
            >
              Sign Up
            </Button>
            <p className="text-sm mt-4">
              Have an account?{" "}
              <Link
                className="text-blue-600 ml-2 underline font-semibold"
                to="/sign-in"
              >
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
