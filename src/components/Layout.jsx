import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";

const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <>
      <div className="layout-container">
        <Helmet>
          <meta charSet="utf-8" />
          <meta name="description" content={description} />
          <meta name="keywords" content={keywords} />
          <meta name="author" content={author} />
          <title>{title}</title>
        </Helmet>
        <Header />
        <main className="bg-body-tertiary">{children}</main>
        <Footer className="sticky-footer" />
      </div>
    </>
  );
};

Layout.defaultProps = {
  title: "PizzaRush - Pizza Delivery Application",
  description:
    "Indulge in a delightful culinary journey with PizzaRush! Satisfy your pizza cravings with our mouthwatering selection of artisanal pizzas crafted with the finest ingredients. With our user-friendly ordering platform and efficient delivery service, you can order with confidence at PizzaRush, your go-to pizza destination for every occasion.",
  keywords: "mern, react, node, mongodb",
  author: "Sanjay Singh",
};

export default Layout;
