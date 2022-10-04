import "./App.css";
import ListPage from "./Components/List_Page/ListPage";
import Login from "./Components/Auth_Page/LoginPage";
import { Route, Routes, MemoryRouter as BrowserRouter } from "react-router-dom";
import Home from "./Components/Home_Page/Home";
import Navbar from "./Components/Navigation/NavBar";
function App() {
  return (
    <>
      {/* <ListPage />
      <Login /> */}
      {/* <Home/> */}
      <BrowserRouter>
        <Routes>
          {/* <Route exact path="/" element={<Login />} /> */}
          <Route exact path="/" element={<Navbar />} />
          <Route exact path="/ListPage" element={<ListPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
