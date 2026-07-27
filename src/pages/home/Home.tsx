import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Banner } from './Banner';
import { CategorySection } from './Category';
import { ChefService } from './ChefService';
import { PopularMenu } from './PopularMenu';
import { CallUsBanner } from './CallUsBanner';
import { ChefRecommends } from './ChefRecommends';
import { FeaturedSection } from './Featured';
import { TestimonialsSection } from './Testimonials';

export const Home: React.FC = () => {
  return (
    <div className="space-y-4">
      <Helmet>
        <title>SaFus | Home - Premium Restaurant</title>
        <meta
          name="description"
          content="Welcome to SaFus. Experience artisanal gastronomy, fine wines, and handcrafted dishes prepared by world-class chefs."
        />
      </Helmet>
      <Banner />
      <CategorySection />
      <ChefService />
      <PopularMenu />
      <CallUsBanner />
      <ChefRecommends />
      <FeaturedSection />
      <TestimonialsSection />
    </div>
  );
};
