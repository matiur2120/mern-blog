import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import DashProfile from "../components/DashProfile";
import DashSidebar from "../components/DashSidebar";

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
      {/* Profile */}
      <div className="flex-1">{tab === "profile" && <DashProfile />}</div>
    </div>
  );
};

export default Dashboard;
