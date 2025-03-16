import NewProjectBtn from "../component/newProjectBtn/NewProjectBtn";
import ProjectsTable from "../component/projectsTable/ProjectsTable";

const Home = () => {
  return (
    <div>
      <div>
        <NewProjectBtn />
        <h3 className="text-4xl my-4 text-left bg-none border-none shadow-none w-10/12 mx-auto">
          Projects:
        </h3>

        <ProjectsTable />
      </div>
    </div>
  );
};

export default Home;
