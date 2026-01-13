import React from "react";
import Layout from "./../components/layout/layout";
import ModernHero from "../components/Home/ModernHero";
import TrustBadges from "../components/Home/TrustBadges";
import CategoryShowcase from "../components/Home/CategoryShowcase";
import FeaturedProducts from "../components/Home/FeaturedProducts";
import OffersSection from "../components/Home/OffersSection";
import TestimonialsSection from "../components/Home/TestimonialsSection";
import NewsletterSection from "../components/Home/NewsletterSection";

const HomePage = () => {
  return (
    <Layout title={"ShopHub - Premium E-commerce Experience"}>
      {/* Modern Hero Section */}
      <ModernHero />

      {/* Trust Badges */}
      <TrustBadges />

      {/* Category Showcase */}
      <CategoryShowcase />

      {/* Offers Section */}
      <OffersSection />

      {/* Featured Products */}
      <FeaturedProducts />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Newsletter */}
      <NewsletterSection />
    </Layout>
  );
};

export default HomePage;
