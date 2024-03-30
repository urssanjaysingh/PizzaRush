import React from "react";
import Layout from "./Layout";

const About = () => {
  return (
    <>
      <Layout title={"About-Us"}>
        <div
          className="row aboutus align-items-center"
          style={{ marginTop: "25px" }}
        >
          <div className="col-md-6 text-center">
            <img
              src="/images/pizza3.png"
              alt="aboutus"
              className="img-fluid rounded"
              style={{ width: "92%" }}
            />
          </div>
          <div className="col-md-5" style={{ textAlign: "justify" }}>
            <h1 className="bg-dark p-2 text-warning text-center">ABOUT US</h1>
            <p className="text-justify mt-3">
              Welcome to PizzaRush! At PizzaRush, we are passionate about
              delivering the finest pizzas right to your doorstep. Our
              commitment to quality ingredients, exceptional taste, and speedy
              delivery makes us the go-to choice for pizza lovers.
            </p>
            <p className="text-justify mt-2">
              We are a team of dedicated professionals who share a love for
              crafting delicious pizzas. Our journey started with the vision of
              bringing joy through mouth-watering flavors and the convenience of
              doorstep delivery.
            </p>
            <p className="text-justify mt-2">
              Indulge in our carefully curated selection of pizzas, each made
              with the freshest ingredients to ensure a burst of flavors in
              every bite. Whether you prefer classic Margherita or adventurous
              toppings, we've got something for everyone.
            </p>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default About;
