import "./App.css";
import Navbar from "./component/navbar/Navbar";
import Home from "./pages/Home";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import NewProject from "./pages/NewProject";
import Footer from "./component/footer/Footer";
import Project from "./pages/Project";
import Login from "./pages/Login";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkUser } from "./store/slices/auth/loginSlice";

function App() {
  const user = useSelector((state) => state.user.user);
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUser());
  }, [dispatch]);

  return (
    <div className="App">
      <Navbar />
      <div className="container">
        {location.pathname === "/login" && (
          <Routes>
            <Route path="/login" element={<Login />} />
          </Routes>
        )}
        {location.pathname === "/create-account" && (
          <Routes>
            <Route path="/create-account" element={<Login />} />
          </Routes>
        )}
        {user ? (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new-project" element={<NewProject />} />
            <Route path="/project/:projectId" element={<Project />} />
          </Routes>
        ) : location.pathname !== "/login" &&
          location.pathname !== "/create-account" ? (
          <>
            <h2 className="mt-12 inline-block">Please</h2>
            <Link to="/login">
              <button className="bg-green-400 px-5 ml-2 py-1 rounded text-white font-bold">
                Login
              </button>
              <h2 className="inline-block ml-1">to show your projects</h2>
            </Link>
          </>
        ) : null}
      </div>
      <Footer />
    </div>
  );
}

export default App;
