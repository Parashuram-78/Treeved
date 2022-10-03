import "./App.css";
import ListPage from "./Components/List_Page/ListPage";
import Login from "./Components/Auth_Page/LoginPage";
import {  Route, Routes, MemoryRouter } from "react-router-dom";
// import Login from "./Components/Auth_Page/LoginPage";
import Home from "./Components/Home_Page/Home";
function App() {
  return (
    <>
      {/* <ListPage />
      <Login /> */}
      {/* <Home/> */}
      <MemoryRouter>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/List" element={<ListPage />} />
        </Routes>
      </MemoryRouter>
    </>
  );
}

export default App;
