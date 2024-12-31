import { ChooseRolePage } from './components/ChooseRolePage';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { SideBar } from './components/SideBar';
function App() {
  
  return (
    <>
    <div dir='rtl'>
    <Router>
      <SideBar />
      <Routes>
        <Route path='/' element={<ChooseRolePage />} />
      </Routes>
    </Router>
    </div>
    </>
  )
}

export default App
