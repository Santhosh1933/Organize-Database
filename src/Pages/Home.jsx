import React from "react";
import { NavBar } from "../Components/NavBar";
import { SidePanel } from "../Components/SidePanel";
import Flow from "./Flow";

export const Home = () => {
  return (
    <div>
      <NavBar />
      <div className="flex">
        <SidePanel />
        <Flow />
      </div>
    </div>
  );
};
