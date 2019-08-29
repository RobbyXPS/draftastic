import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import SideBar from "./components/layout/Sidebar";
import Dashboard from "./components/dashboard/Dashboard";
import AdminTools from "./components/admin_tools/AdminTools";
import SignIn from "./components/auth/SignIn";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <SideBar />
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path="/admin-tools" component={AdminTools} />
          <Route path="/signin" component={SignIn} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
