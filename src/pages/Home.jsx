import React from "react";
import HeroSection from "../components/HeroSection";
import AboutUs from "../components/AboutUs";
import RecommendedList from "../components/RecommendedList";
import FanReviews from "../components/FanReviews";
import ContactUs from "../components/ContactUs";

const Home = () => {
  return (
    <>
      <HeroSection />
      <AboutUs />
      <RecommendedList />
      <FanReviews />
      <ContactUs />
    </>
  );
};

export default Home;
