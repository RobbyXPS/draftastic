import React from "react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import SideBar from "./components/layout/Sidebar";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <SideBar />
        <h1>DRAFTASTIC</h1>
      </div>
    </BrowserRouter>
  );
}

export default App;
