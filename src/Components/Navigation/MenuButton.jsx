import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PrivacyPolicy from "../PrivacyPolicy/PrivacyPolicy";
import { useNavigate } from "react-router";


const options = [
  
  "PrivacyPolicy",
];

const ITEM_HEIGHT = 48;

export default function LongMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClose1 = () => {
    setAnchorEl(null);

    window.localStorage.clear();
    window.location.reload();
    //console.log(localStorage.get(`accessTokenTreeVed`));
    navigate("/login");
  };
  const handleClose2 = () => {
    setAnchorEl(null);
    navigate("/PrivacyPolicy");
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        }}
      >
        {/* {options.map((option) => (
          
          
        ))} */}
        <MenuItem
          // key={option}
          //selected={option === "Pyxis"}
          onClick={handleClose1}
          style={{color:"red"}}
        >
         Sign Out
        </MenuItem>
        <MenuItem
          // key={option}
          //selected={option === "Pyxis"}
          onClick={handleClose2}
        >
         Privacy Policy
        </MenuItem>
      </Menu>
    </div>
  );
}
