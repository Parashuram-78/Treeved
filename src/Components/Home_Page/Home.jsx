import React, { useState, useRef } from "react";
import styles from "./styles.module.css";
import { BiSend, BiListUl } from "react-icons/bi";
import bookmark_img from "../../Images/bookmark.svg"
import bookmark_saved_img from "../../Images/bookmark_saved.svg"
import tick_img from "../../Images/tick.svg"
import tick_green_img from "../../Images/tick_green.svg"
import { AiFillStar } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";
const Home = () => {
  const [url, setUrl] = useState("");
  const [tags,setTags] = useState("")
  const [rating, setRating] = useState(3);
  const [bookmark,setBookmark] = useState(false);
  const [tick, setTick] = useState(false)

  return (
    <>
      <header className={styles.header}>
        {/* <div className={styles.header_left}>
          <div className={styles.imageContainer}>
            <img className={styles.avatar} src={avatar} />
          </div>
          <div className={styles.textContainer}>
            <h1 className={styles.userName}>User</h1>
            <p className={styles.userName_small}>User</p>
          </div>
        </div>
        <div className={styles.header_right}></div> */}
      </header>
      <div className={styles.mainContainer}>
        <div className={styles.input_div}>
          <h1
            className={styles.label}
            onChange={(e) => {
              setUrl(e.target.value);
            }}
          >
            URL*
          </h1>
          <input type="text" className={styles.input} placeholder="Paste your link here" />
        </div>
        <div className={styles.input_div}>
          <h1
            className={styles.label}
            onChange={(e) => {
              setTags(e.target.value);
            }}
          >
            Add more details
          </h1>
          <input type="text" className={styles.input} placeholder="Add tags or description" />
        </div>
        <div className={styles.input_div}>
          <h1 className={styles.label}>Rating *</h1>
          <div className={styles.rating_bar}>
            <input
              type="range"
              min="0"
              max="5"
              step="0.5"
              className={styles.input_range}
              defaultValue="3"
              list="steplist"
              onChange={(e) => {
                setRating(e.currentTarget.value);
              }}
            />
            <datalist id="steplist">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </datalist>
            <div
              className={styles.side_label_bar}
              style={{ backgroundColor: rating >= 4 ? "#CEFFD9" : rating >= 3 && rating < 4 ? "#FFFDCE" : "#FFD7CE" }}
            >
              <label
                className={styles.side_label}
                style={{ color: rating >= 4 ? "#1F4E0F" : rating >= 3 && rating < 4 ? "#875323" : "#4E130F" }}
              >
                {rating}
              </label>
              {/* <AiFillStar style={{ color: rating >= 4 ? "#1F4E0F" : rating >= 3 && rating < 4 ? "#875323" : "#4E130F" }} /> */}
            </div>
          </div>
        </div>

        <div className={styles.bottom_container}>
          <div className={styles.bottom_left}>
            <img className={styles.icon} src={bookmark?bookmark_saved_img:bookmark_img} onClick={()=>setBookmark(!bookmark)}/>
            <img className={styles.icon} src={tick?tick_green_img:tick_img} onClick={()=>setTick(!tick)}/>
          </div>
          <div className={styles.bottom_right}>
            <button className={styles.add_btn}>Add to Diary</button>
            {/* <button className={styles.add_list_btn}>Add to List</button> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;