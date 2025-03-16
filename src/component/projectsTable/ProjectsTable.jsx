import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects } from "../../store/slices/projects/projectsSlice";
import { useNavigate } from "react-router-dom";

const ProjectsTable = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const projects = useSelector((state) => state.projects);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchProjects(user.id));
  }, [dispatch, user.id]);

  if (projects.status === "loading") {
    return <div>Loading...</div>;
  }

  if (projects.status === "failed") {
    return <div>Error: {projects.error}</div>;
  }
  return (
    <div className="w-10/12 mx-auto flex justify-center items-center flex-col text-lg text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded-lg overflow-hidden mb-16 ">
      {projects.projects.map((project) => {
        return (
          <div
            key={project.id}
            onClick={() => navigate(`/project/${project.id}`)}
            className="bg-white border-b my-2 rounded-lg cursor-pointer justify-around w-full flex dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            <div
              scope="row"
              className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
            >
              <div className="ps-3">
                <div className="text-lg font-semibold">{project.name}</div>
              </div>
            </div>
            <div className="px-6 py-4">{project.createdAt}</div>
          </div>
        );
      })}
    </div>
  );
};

export default ProjectsTable;
