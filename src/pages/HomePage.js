import React from "react";
import Layout from "./../components/layout/layout";
import Hero from "../components/Home/Hero";
import CategorySection from "../components/Home/CategorySection";
import FeaturedProducts from "../components/Home/FeaturedProducts";
import OffersSection from "../components/Home/OffersSection";

const HomePage = () => {
  return (
    <Layout title={"Best Offers - ShopHub"}>
      {/* Hero Section */}
      <Hero />

      {/* Category Section */}
      <CategorySection />

      {/* Offers Section */}
      <OffersSection />

      {/* Featured Products */}
      <FeaturedProducts />
    </Layout>
  );
};

export default HomePage;
