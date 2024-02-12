import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import DashPosts from "../components/DashPosts";
import DashProfile from "../components/DashProfile";
import DashSidebar from "../components/DashSidebar";
import DashUsers from "../components/DashUsers";

const Dashboard = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-56">
        {/*Sidebar....*/}
        <DashSidebar />
      </div>
      {/* Posts */}
      {tab === "posts" && (
        <div className="flex-1">
          <DashPosts />
        </div>
      )}
      {/* Profile */}
      {tab === "profile" && (
        <div className="flex-1">
          <DashProfile />
        </div>
      )}
      {tab === "users" && (
        <div className="flex-1">
          <DashUsers />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
