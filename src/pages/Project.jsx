import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchProject } from "../store/slices/projects/projectsSlice";

const Project = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const projects = useSelector((state) => state.projects);
  const navigate = useNavigate();
  const location = useLocation();


  useEffect(() => {
    dispatch(
      fetchProject({
        userId: user.id,
        projectId: location.pathname.split("/")[2],
      })
    );
  }, [dispatch, user.id]);

  if (projects.status === "loading") {
    return <div>Loading...</div>;
  }

  if (projects.status === "failed") {
    return <div>Error: {projects.error}</div>;
  }
  return <div>Project</div>;
};

export default Project;
