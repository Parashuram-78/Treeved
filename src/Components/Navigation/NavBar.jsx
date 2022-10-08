import { Avatar } from "@mui/material";
import ListPage from "../List_Page/ListPage";
import { Link } from "react-router-dom";
import "./NavBar.css";
import LongMenu from "./MenuButton";
const Navbar = ({ user, image }) => {
  useEffect(() =>{
    // const headers = ["Content-Type":"application/json"]
  },[])
  return (
    <div className="Navbar-box">
      <div className="Avatar">
        <Avatar src={image} style={{width:"30px", height:"30px"}}></Avatar>
        <h3 className="Navbar_user"> Ankur Shukla {user} </h3>
      </div>
      <div className="Navbar-menu">
        <Link to="/ListPage">
          <button className="Navbar_button">Switch</button>
        </Link>
        <LongMenu />
      </div>
    </div>
  );
};
export default Navbar;
