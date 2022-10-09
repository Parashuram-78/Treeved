import React from 'react'
import { useDispatch } from 'react-redux';
import {useNavigate} from "react-router-dom"
import styles from "./style.module.css";
import {setCurrentState,setCurrentStateUserName,setCurrentStateProfileImage,setPageId} from "../../features/User/UserSlice"
const UserPageItem = ({ title,type,profileImage,pageId }) => {
  const dispatch = useDispatch()
const navigate = useNavigate()
  const submit = ()=>{
    dispatch(setCurrentState(type))
    dispatch(setCurrentStateUserName(title))
    dispatch(setCurrentStateProfileImage(profileImage))
    dispatch(setPageId(pageId))
    navigate("/Home")
  }
  return (
    <>
      <div className={styles.item_main_container} onClick={()=>{submit();}}>
        <h1 className={styles.item_title}>{title}</h1>
      </div>
    </>
  )
}

export default UserPageItem