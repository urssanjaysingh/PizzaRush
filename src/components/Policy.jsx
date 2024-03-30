import React from "react";
import Layout from "./Layout";

const Policy = () => {
  return (
    <>
      <Layout title={"Privacy-Policy"}>
        <div className="container">
          <h1 className="text-center text-dark mb-4">Privacy Policy</h1>
          <div className="row">
            <div className="col-md-12 text-center">
              <img
                src="/images/pizza-cover.jpg"
                alt="Privacy Policy"
                className="img-fluid rounded"
                style={{ width: "50%" }}
              />
            </div>
            <div className="col-md-12" style={{ textAlign: "justify" }}>
              <p className="mt-4">
                At PizzaRush, we prioritize the privacy and security of our
                users.This Privacy Policy outlines how we collect, use, and
                protect your personal information when you use our application.
              </p>
              <h4 className="mt-4">Information We Collect</h4>
              <p>
                We collect information that you provide when using our services,
                such as when you place an order, create an account, or contact
                our customer support. This may include your name, contact
                information, delivery address, and payment details.
              </p>
              <h4 className="mt-4">How We Use Your Information</h4>
              <p>
                The information we collect is used to process orders,
                personalize your experience, and improve our services. We may
                also use your information for communication purposes, such as
                providing updates on your order status or sending promotional
                offers.
              </p>
              <h4 className="mt-4">Disclosure of Your Information</h4>
              <p>
                We may share your information with third-party service providers
                to assist in order fulfillment and service provision. We never
                sell your personal information to third parties.
              </p>
              <h4 className="mt-4">Security</h4>
              <p>
                We implement industry-standard security measures to protect your
                personal information from unauthorized access, disclosure, or
                alteration. Your payment information is encrypted and processed
                securely.
              </p>
              <h4 className="mt-4">Updates to Privacy Policy</h4>
              <p>
                We may update our Privacy Policy to reflect changes in our
                practices or for legal reasons. We recommend reviewing this
                policy periodically for any updates.
              </p>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Policy;
