import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPostById, clearPostById } from "../../redux/store/actions";
import { showToast } from "../util/tools";
import Moment from "react-moment";
import NewsLetter from "../util/newsLetter";

const PostComponent = (props) => {
  const post = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPostById(props.match.params.id));
  }, [dispatch, props.match.params.id]);

  useEffect(() => {
    if (post.postById === "404") {
      showToast("ERROR", "PAGE NOT FOUND");
      props.history.push("/");
    }
  }, [post, props.history]);

  useEffect(() => {
    return () => {
      dispatch(clearPostById());
    };
  }, [dispatch]);

  return (
    <>
      {post.postById ? (
        <div className="article_container">
          <h1>{post.postById.title}</h1>
          <div
            style={{ background: `url(${post.postById.imagexl})` }}
            className="image"
          ></div>
          <div className="author">
            Created by: <span>{post.postById.author} -</span>
            <Moment format="DD MMMM">{post.createdAt}</Moment>
          </div>
          <div className="mt-3 content">
            <div
              dangerouslySetInnerHTML={{ __html: post.postById.content }}
            ></div>
          </div>
        </div>
      ) : null}{" "}
      <NewsLetter />
    </>
  );
};

export default PostComponent;
