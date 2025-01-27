import { ChooseRolePage } from './components/ChooseRolePage';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { SideBar } from './components/SideBar';
import Login from './components/Login';
import SignUp from './components/SignUp';

function App() {
  return (
    <div dir="rtl" className="pr-32 pl-32 pt-10 pb-10">
      <Router>
        <SideBar />
        <Routes>
          <Route path="/" element={<ChooseRolePage />} />
          <Route path="/Login/:Role" element={<Login />} />
          <Route path="/SignUp/:Role" element={<SignUp />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
