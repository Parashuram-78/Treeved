import "./App.css";
import ListPage from "./Components/List_Page/ListPage";
import Login from "./Components/Auth_Page/LoginPage";
import { Route, Routes, MemoryRouter as BrowserRouter } from "react-router-dom";
import Home from "./Components/Home_Page/Home";
import Navbar from "./Components/Navigation/NavBar";
import PrivacyPolicy from "./Components/PrivacyPolicy/PrivacyPolicy";
import Dairy_Success from "./Components/Success_Page/Dairy_Success";
import List_Success from "./Components/Success_Page/List_Success";
import Userpage from "./Components/UserPages/Userpage";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/" element={<Home />} />
          <Route exact path="/ListPage" element={<ListPage />} />
          <Route exact path="/UserPages" element={<Userpage />} />
          <Route exact path="/PrivacyPolicy" element={<PrivacyPolicy />} />
          <Route exact path="/success/dairy" element={<Dairy_Success/>} />
          <Route exact path="/success/list" element={<List_Success />} />
          
          <Route exact path="*" element={<Login />} />
          <Route exact path="/PrivacyPolicy" element={<PrivacyPolicy />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
