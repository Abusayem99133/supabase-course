import { Outlet } from "react-router-dom";
import "./App.css";
import SignUp from "./Signup";
import TaskManagement from "./TaskManagement";

function App() {
  return (
    <>
      <div>
        <Outlet />
      </div>
    </>
  );
}

export default App;
