import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const UserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        setCurrentState: (state, action) => {
            state.stateType = action.payload
        },
        setCurrentStateUserName: (state, action) => {
            state.userName = action.payload
        },
        setCurrentStateProfileImage: (state, action) => {
            state.profileImage = action.payload
        },
        setPageId: (state, action) => {
            state.pageId = action.payload
        }
    },
});

export const { setUser, setCurrentState, setCurrentStateUserName, setCurrentStateProfileImage, setPageId } = UserSlice.actions;
export const getUser = (state) => state.user;
export default UserSlice.reducer;