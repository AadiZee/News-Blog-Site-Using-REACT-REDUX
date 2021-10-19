import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { addNewsLetter, clearNewsLetter } from "../../redux/store/actions";
import { showToast } from "./tools";

const NewsLetter = () => {
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const textInput = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = textInput.current.value;
    dispatch(addNewsLetter({ email: value }));
  };

  useEffect(() => {
    if (userData.newsletter) {
      if (userData.newsletter === "added") {
        showToast("SUCCESS", "Thank you for subscribing!!!");
        textInput.current.value = "";
        // dispatch(clearNewsLetter());
      }
      if (userData.newsletter === "failed") {
        showToast("ERROR", "You are already on the list!!!");
        textInput.current.value = "";
        //  dispatch(clearNewsLetter());
      }
    }
  }, [userData]);

  useEffect(() => {
    return () => {
      dispatch(clearNewsLetter());
    };
  }, [dispatch]);

  return (
    <>
      <div className="newsletter_container">
        <h1>Join our newsletter</h1>
        <div className="form">
          <Form onSubmit={handleSubmit} className="mt-4">
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Example: your@email.com"
                name="email"
                ref={textInput}
              />
              <Button
                variant="outline-dark"
                type="submit"
                style={{ marginTop: "5px" }}
              >
                Add me to the list
              </Button>
            </Form.Group>
          </Form>
        </div>
      </div>
    </>
  );
};

export default NewsLetter;
