import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../redux/user/userSlice";

const SignIn = () => {
  const [formData, setFormData] = useState({});

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error: errorMessage } = useSelector((state) => state.user);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure("Please fill all the fields"));
    }
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }
      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate("/");
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };
  return (
    <div className="min-h-screen mt-20">
      <div className="flex flex-col gap-8 p-8 md:flex-row w-11/12">
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
          <form action="" onSubmit={handleSubmit}>
            <div className="my-2">
              <div className="mb-2 block">
                <Label htmlFor="email" value="Email" />
              </div>
              <TextInput
                id="email"
                type="email"
                name="email"
                value={formData.email}
                required
                placeholder="email"
                onChange={handleChange}
              />
            </div>
            <div className="my-2">
              <div className="mb-2 block">
                <Label htmlFor="password" value="password" />
              </div>
              <TextInput
                id="password"
                type="password"
                name="password"
                value={formData.password}
                required
                placeholder="password"
                onChange={handleChange}
              />
            </div>
            <Button
              type="submit"
              className="mt-4 w-full"
              gradientDuoTone="purpleToPink"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="ml-2">Loading...</span>
                </>
              ) : (
                "Sign In"
              )}
            </Button>
            <OAuth />
            <p className="text-sm mt-4">
              Don't Have an account?{" "}
              <Link
                className="text-blue-600 ml-2 underline font-semibold"
                to="/sign-up"
              >
                Sign Up
              </Link>
            </p>
          </form>
          {errorMessage && (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignIn;
