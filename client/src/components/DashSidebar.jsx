import { Sidebar } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiArrowRight, HiDocumentText, HiUser } from "react-icons/hi";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

const DashSidebar = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  return (
    <Sidebar className="w-full md:w-56">
      <Sidebar.ItemGroup className="flex flex-col gap-1">
        <Link to="/dashboard?tab=profile">
          <Sidebar.Item
            active={tab === "profile"}
            icon={HiUser}
            label={currentUser?.isAdmin ? "Admin" : "User"}
            labelColor="dark"
            as="div"
          >
            Profile
          </Sidebar.Item>
        </Link>

        <Sidebar.Item icon={HiArrowRight} className="cursor-pointer">
          Sign Out
        </Sidebar.Item>
        {currentUser?.isAdmin && (
          <Link to="/dashboard?tab=posts">
            <Sidebar.Item
              active={tab === "posts"}
              as="div"
              icon={HiDocumentText}
            >
              Posts
            </Sidebar.Item>
          </Link>
        )}
      </Sidebar.ItemGroup>
    </Sidebar>
  );
};

export default DashSidebar;
