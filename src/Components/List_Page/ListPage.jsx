import React, { useState, useRef } from "react";
import styles from "./styles.module.css";
import avatar from "../../Images/Avatar.png";
import { BiSend, BiListUl } from "react-icons/bi";
import { GiStarFormation } from "react-icons/gi";
import { AiOutlinePlus } from "react-icons/ai";
const ListPage = () => {
  const [url, setUrl] = useState("");
  const [rating, setRating] = useState(4);
  const [tags, setTags] = useState([]);
  const [comment, setComment] = useState("");
  const tagInputRef = useRef(null);
  const [tagInput, setTagInput] = useState("");
  const addTags = (tag) => {
    if (tag != "") {
      setTags([...tags, tag]);
      setTagInput("");
      tagInputRef.current.value = "";
    }
  };
  const removeTags = (i) => {
    setTags(tags.filter((item, index) => index !== i));
  };
  return (
    <>
      <header className={styles.header}>
        <div className={styles.header_left}>
          <div className={styles.imageContainer}>
            <img className={styles.avatar} src={avatar} />
          </div>
          <div className={styles.textContainer}>
            <h1 className={styles.userName}>User</h1>
            <p className={styles.userName_small}>User</p>
          </div>
        </div>
        <div className={styles.header_right}></div>
      </header>
      <div className={styles.mainContainer}>
        <h1
          className={styles.label}
          onChange={(e) => {
            setUrl(e.target.value);
          }}
        >
          Url *
        </h1>
        <input type="text" className={styles.input} />
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
            <option>0</option>
            <option>0.5</option>
            <option>1</option>
            <option>1.5</option>
            <option>2</option>
            <option>2.5</option>
            <option>3</option>
            <option>3.5</option>
            <option>4</option>
            <option>4.5</option>
            <option>5</option>
          </datalist>
          <div className={styles.side_label_bar}>
            <label className={styles.side_label}>{rating}</label>
          </div>
          <GiStarFormation style={{ color: "rgb(236, 236, 0)" }} />
        </div>
        <div className={styles.tagsDiv}>
          <h1 className={styles.label}>Add tags</h1>
          <div className={styles.tagsInputDiv}>
            <input
              type="text"
              className={styles.tagsInput}
              ref={tagInputRef}
              onChange={(e) => {
                setTagInput(e.target.value);
              }}
            />
            <button
              className={styles.tagsSubmitBtn}
              onClick={() => {
                addTags(tagInput);
              }}
            >
              <BiSend style={{ color: "#2196f3", fontSize: "25px" }} />
            </button>
          </div>
          <div className={styles.tagsContainer}>
            {tags.map((tag, index) => (
              <div className={styles.tagDiv}>
                <p className={styles.tag}>{tag}</p>
                <button className={styles.removeBtn} onClick={() => removeTags(index)}>
                  X
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.commentDiv}>
          <h1 className={styles.label}>Comments</h1>
          <textarea
            type="text"
            className={styles.textarea}
            placeholder="Your Comments......."
            onChange={(e) => {
              setComment(e.target.value);
            }}
          />
        </div>
        <div className={styles.innerDivContainer}>
          <div className={styles.innerDiv}>
            <BiListUl style={{ color: "#2196f3" }} />
            <h1 className={styles.innerDivText}>Add to List</h1>
          </div>
          <div className={styles.innerDiv}>
            <AiOutlinePlus style={{ color: "#2196f3" }} />
            <h1 className={styles.innerDivText}>Add to Diary</h1>
          </div>
          <div className={styles.innerDiv}>
            <AiOutlinePlus style={{ color: "#2196f3" }} />
            <h1 className={styles.innerDivText}>Add to Diary and share as Post</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListPage;
