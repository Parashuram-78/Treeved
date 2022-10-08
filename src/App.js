import "./App.css";
import ListPage from "./Components/List_Page/ListPage";
import Login from "./Components/Auth_Page/LoginPage";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./Components/Home_Page/Home";
import Navbar from "./Components/Navigation/NavBar";
import PrivacyPolicy from "./Components/PrivacyPolicy/PrivacyPolicy";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/Home" element={<Home />} />
          <Route exact path="/ListPage" element={<ListPage />} />
          <Route exact path="/PrivacyPolicy" element={<PrivacyPolicy />} />
          <Route exact path="*" element={<Login />} />
          <Route exact path="/PrivacyPolicy" element={<PrivacyPolicy />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
