import React from "react";
import { Flow } from "../components/Dashboard/Flow";
import { SidePanel } from "../components/Dashboard/SidePanel";
import { Navbar } from "../components/Dashboard/Navbar";

export const Dashboard = () => {
  return (
    <div>
      <Navbar />
      <div className="flex">
        <SidePanel />
        <Flow />
      </div>
    </div>
  );
};
