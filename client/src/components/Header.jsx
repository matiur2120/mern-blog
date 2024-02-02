import { Button, Navbar, TextInput } from "flowbite-react";
import { FaMoon } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
const Header = () => {
  const path = useLocation().pathname;
  return (
    <Navbar className="border-b-2">
      <Navbar.Brand
        as={Link}
        to="/"
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
      >
        <span className="px-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
          MR's
        </span>
        Blog
      </Navbar.Brand>
      <form action="">
        <TextInput
          type="text"
          placeholder="Search..."
          sizing="md"
          required
          rightIcon={IoSearchOutline}
          className="hidden lg:inline"
        />
      </form>
      <Button className="lg:hidden" color="gray" pill>
        <IoSearchOutline />
      </Button>
      <div className="flex gap-2 md:order-2">
        <Button className="w-12 h-10" color="gray" pill>
          <FaMoon />
        </Button>
        <Link to="/sign-in">
          <Button
            className="h-10"
            color="gray"
            pill
            gradientDuoTone="purpleToBlue"
          >
            SignIn
          </Button>
        </Link>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link as={"div"} active={path === "/"}>
          <Link to="/">Home</Link>
        </Navbar.Link>

        <Navbar.Link as={"div"} active={path === "/projects"}>
          <Link to="/projects">Projects</Link>
        </Navbar.Link>
        <Navbar.Link as={"div"} active={path === "/dashboard"}>
          <Link to="/dashboard">Dashboard</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
