import React from "react";
import Notifications from "./Notifications";

const Dashboard = () => {
  return (
    <div className="main-content-area" id="dashboard-container">
      <div id="dashboard-intro">
        <h1>DRAFTASTIC</h1>
        <p>Welcome to the draftastic league.</p>
      </div>
      <Notifications />
    </div>
  );
};

export default Dashboard;
