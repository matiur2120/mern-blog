import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage("Please fill out all fields");
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if (res.ok) {
        navigate("/sign-in");
      }
    } catch (error) {
      setLoading(false);
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };
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
          <form action="" onSubmit={handleSubmit}>
            <div className="my-2">
              <div className="mb-2 block">
                <Label htmlFor="username" value="Username" />
              </div>
              <TextInput
                id="username"
                type="text"
                name="username"
                required
                placeholder="email"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
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
                "Sign Up"
              )}
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

export default SignUp;
