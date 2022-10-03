import "./App.css";
import ListPage from "./Components/List_Page/ListPage";
import Login from "./Components/Auth_Page/LoginPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./Components/Auth_Page/SignUp";
function App() {
  return (
    <>
      {/* <ListPage />
      <Login /> */}
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<SignUp />} />
          <Route exact path="/List" element={<ListPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
