import {
  faCircle,
  faHistory,
  faHome,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import NavItem from "../../components/NavItem/NavItem";
import { useGetCurrentTab } from "../../hooks/useGetCurrentTab";
import { useUser } from "../../hooks/useUser";
import Header from "../../layouts/Header/Header";
import Wrapper from "../../layouts/Wrapper/Wrapper";
import DashboardHome from "../DashboardHome/DashboardHome";
import Profile from "../Profile/Profile";
import StreamHistory from "../StreamHistory/StreamHistory";

const Dashboard = () => {
  const url = new URLSearchParams(useHistory().location.search);
  const { currentTab, setTab } = useGetCurrentTab(url.get("tab"));
  const userQuery = useUser();
  const history = useHistory();
  if (userQuery.isSuccess && !userQuery.data) return null;

  const linkHandler = (tab) => {
    setTab(tab);
    history.push(`/dashboard?tab=${tab}`);
  };

  return (
    <>
      <Header />

      <Wrapper className="mt-4">
        <div className="flex gap-6">
          <aside className="w-80 flex flex-col gap-4">
            <Link to="/dashboard/live">
              <div className="w-full p-3 px-4 bg-red-500 rounded-md flex items-center">
                <FontAwesomeIcon
                  icon={faCircle}
                  className="text-white mr-4"
                  size="1x"
                />
                <p>Go Live</p>
              </div>
            </Link>
            <NavItem
              onClick={() => linkHandler("home")}
              icon={faHome}
              active={currentTab === "home"}
            >
              <p>Dashboard</p>
            </NavItem>
            <NavItem
              icon={faHistory}
              active={currentTab === "history"}
              onClick={() => linkHandler("history")}
            >
              <p>Past Streams</p>
            </NavItem>
            <NavItem
              icon={faUser}
              active={currentTab === "profile"}
              onClick={() => linkHandler("profile")}
            >
              <p>Profile</p>
            </NavItem>
          </aside>
          <section>
            {currentTab === "home" && <DashboardHome />}
            {currentTab === "history" && <StreamHistory />}
            {currentTab === "profile" && <Profile />}
          </section>
        </div>
      </Wrapper>
    </>
  );
};

export default Dashboard;
