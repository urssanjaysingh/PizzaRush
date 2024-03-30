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
  title: "PizzaRush",
  description: "A pizza delivery application.",
  keywords: "mern, react, node, mongodb",
  author: "Sanjay Singh",
};

export default Layout;
