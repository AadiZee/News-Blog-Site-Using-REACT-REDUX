import { combineReducers } from "redux";
import posts from "./postsReducer/postsReducer";
import user from "./userReducer/userReducer";

const appReducers = combineReducers({
  posts,
  user,
});

export default appReducers;
