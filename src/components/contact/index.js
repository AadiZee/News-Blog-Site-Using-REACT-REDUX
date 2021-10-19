import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Alert } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { sendMessage } from "../../redux/store/actions";
import { showToast } from "../util/tools";

const Contact = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      firstname: "",
      lastname: "",
      message: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Sorry, EMAIL is required")
        .email("This is not a valid email address"),
      firstname: Yup.string().required("Sorry, First Name is required"),
      lastname: Yup.string().required("Sorry, Last Name is required"),
      message: Yup.string()
        .required("Sorry, You need to say something in your Message")
        .max(
          500,
          "Sorry, Message is too long. Only 500 characters allowed per message"
        ),
    }),
    onSubmit: (values, { resetForm }) => {
      dispatch(sendMessage(values)).then(({ payload }) => {
        if (payload) {
          showToast("SUCCESS", "Thank you, we will get back to you");
        } else {
          showToast("ERROR", "Sorry, something went wrong, try again!");
        }
      });
    },
  });

  return (
    <>
      <h1>Contact Us</h1>
      <form className="mt-3" onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            className="form-control"
            name="email"
            placeholder="you@example.com"
            {...formik.getFieldProps("email")}
          />
          {formik.errors.email && formik.touched.email ? (
            <Alert variant="danger">{formik.errors.email}</Alert>
          ) : null}
        </div>

        <div className="row">
          <div className="form-group col-md-6 mb-3 mt-3">
            <label htmlFor="firstname">First Name</label>
            <input
              type="text"
              className="form-control"
              name="firstname"
              placeholder="Enter First Name"
              {...formik.getFieldProps("firstname")}
            />
            {formik.errors.firstname && formik.touched.firstname ? (
              <Alert variant="danger">{formik.errors.firstname}</Alert>
            ) : null}
          </div>

          <div className="form-group col-md-6 mb-3 mt-3">
            <label htmlFor="lastname">Last Name</label>
            <input
              type="text"
              className="form-control"
              name="lastname"
              placeholder="Enter Last Name"
              {...formik.getFieldProps("lastname")}
            />
            {formik.errors.lastname && formik.touched.lastname ? (
              <Alert variant="danger">{formik.errors.lastname}</Alert>
            ) : null}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            rows="4"
            className="form-control"
            name="message"
            placeholder="Enter Your Message"
            {...formik.getFieldProps("message")}
          >
            {" "}
          </textarea>
          {formik.errors.message && formik.touched.message ? (
            <Alert variant="danger">{formik.errors.message}</Alert>
          ) : null}
        </div>

        <button type="submit" className="btn btn-primary mb-2 mt-3">
          Send Message
        </button>
      </form>
    </>
  );
};

export default Contact;
