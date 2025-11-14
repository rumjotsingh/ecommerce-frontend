import React from "react";
import ModernHeader from "./ModernHeader";
import ModernFooter from "./ModernFooter";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";

function Layout({ children, title, description, keyword, author }) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <meta charset="UTF-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keyword} />
        <meta name="author" content={author} />
      </Helmet>
      <ModernHeader />
      <main className="flex-1">
        {children}
        <Toaster position="top-right" />
      </main>
      <ModernFooter />
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
