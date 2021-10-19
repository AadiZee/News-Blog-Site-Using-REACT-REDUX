import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPosts } from "../../../redux/store/actions";

import { Spinner, Button } from "react-bootstrap";
import Masonry from "react-masonry-css";
import Moment from "react-moment";
import { LinkContainer } from "react-router-bootstrap";

const HomePosts = () => {
  const homePosts = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(getPosts({}, 1, "desc", 6));
  }, [dispatch]);

  const loadMorePosts = () => {
    const page = homePosts.page + 1;
    setLoading(true);
    dispatch(getPosts(homePosts, page, "desc", 6)).then(() => {
      setLoading(false);
    });
  };

  return (
    <>
      <Masonry
        breakpointCols={{ default: 3, 800: 2, 400: 1 }}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {homePosts.posts
          ? homePosts.posts.map((post) => (
              <div key={post.id}>
                <img
                  style={{ width: "100%", height: "200px" }}
                  src={post.image}
                  alt="SOMETHING"
                />
                <div className="author">
                  <span>{post.author} -</span>
                  <Moment format="DD MMMM">{post.createdAt}</Moment>
                </div>
                <div className="content">
                  <div className="title"> {post.title}</div>
                  <div className="excerpt">{post.excerpt}</div>
                  <LinkContainer to={`/post/${post.id}`} className="mt-3">
                    <Button variant="light">Read More</Button>
                  </LinkContainer>
                </div>
              </div>
            ))
          : null}
      </Masonry>

      {loading ? (
        <div>
          <Button variant="outline-dark" disabled>
            <Spinner
              as="span"
              animation="grow"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            Loading...
          </Button>
        </div>
      ) : null}

      {!homePosts.end && !loading ? (
        <Button variant="outline-dark" onClick={() => loadMorePosts()}>
          Load More
        </Button>
      ) : null}
    </>
  );
};

export default HomePosts;
