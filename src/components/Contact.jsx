import React from "react";
import Layout from "./Layout";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";

const Contact = () => {
  return (
    <>
      <Layout title={"Contact-Us"}>
        <div
          className="row contactus align-items-center"
          style={{ marginTop: "50px" }}
        >
          <div className="col-md-6 text-center">
            <img
              src="/images/pizza2.png"
              alt="contactus"
              className="img-fluid rounded"
              style={{ width: "60%" }}
            />
          </div>
          <div className="col-md-4" style={{ textAlign: "justify" }}>
            <h1 className="bg-dark p-2 text-warning text-center mt-2">
              CONTACT US
            </h1>
            <p className="text-justify mt-2">
              Any query and info about the product, feel free to call anytime;
              we are available 24X7.
            </p>
            <p className="mt-3">
              <BiMailSend /> :{" "}
              <a href="mailto:help@shopnest.com">help@pizzarush.com</a>
            </p>
            <p className="mt-3">
              <BiPhoneCall /> : 012-3456789
            </p>
            <p className="mt-3">
              <BiSupport /> : 1800-0000-0000 (toll free)
            </p>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Contact;
