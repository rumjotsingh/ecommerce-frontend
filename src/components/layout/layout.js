import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";

function Layout({ children, title, description, keyword, author }) {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <meta charset="UTF-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keyword} />
        <meta name="author" content={author} />
      </Helmet>
      <Header />
      <main style={{ minHeight: "70vh" }}>
        {children}
        <Toaster />
      </main>
      <Footer />
    </div>
  );
}
Layout.defaultProps = {
  title: "Ecommerce-app shop now",
  description: "mern stack project",
  keyword: "mongo db,react,express,node ",
  author: "Rumjotsingh",
};

export default Layout;
