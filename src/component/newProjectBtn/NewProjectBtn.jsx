import React from "react";
import { Link } from "react-router-dom";

const NewProjectBtn = () => {
  return (
    <Link to={"/new-project"} className="flex justify-end py-5">
      <button className="bg-green-400 px-4 py-2 rounded text-white font-bold">
        New Project
      </button>
    </Link>
  );
};

export default NewProjectBtn;
