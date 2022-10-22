import { Avatar } from "@mui/material";
import { useEffect, useState } from "react";
import ListPage from "../List_Page/ListPage";
import { Link } from "react-router-dom";
import "./NavBar.css";
import LongMenu from "./MenuButton";
import { GetAuthRequest } from "../Helper/AuthRequest";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import {
  setUser,
  getUser,
  setCurrentState,
  setCurrentStateUserName,
  setCurrentStateProfileImage,
} from "../../features/User/UserSlice";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../Loader/Loader";

const Navbar = () => {
  const [userName, setUserName] = useState("");
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  useEffect(() => {
    const successFxn = (res) => {
      setUserName(res.data.username);
      setProfileImageUrl(res.data.profile_picture);
      dispatch(setUser(res.data));
      dispatch(setCurrentState("dairy"));
      dispatch(setCurrentStateUserName(res.data.username));
      dispatch(setCurrentStateProfileImage(res.data.profile_picture));
    };
    if (user && user.user && user.userName) {
      setUserName(user.userName);
      setProfileImageUrl(user.profileImage);
    } else {
      GetAuthRequest("users/me/", successFxn, enqueueSnackbar, navigate,setLoading);
    }
    console.log(user);
  }, []);
  return (
    <>
    {loading && <Loader/>}
      <div className="Navbar-box">
        <div className="Avatar">
          <Avatar src={profileImageUrl} style={{ width: "30px", height: "30px" }}></Avatar>
          <h3 className="Navbar_user"> {userName}</h3>
        </div>
        <div className="Navbar-menu">
          <Link to="/UserPages">
            <button className="Navbar_button">Switch</button>
          </Link>
          <LongMenu />
        </div>
      </div>
    </>
  );
};
export default Navbar;
