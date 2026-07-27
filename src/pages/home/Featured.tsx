import React from 'react';
import { Link } from 'react-router-dom';
import { SectionTitle } from '../../components/common/SectionTitle';

export const FeaturedSection: React.FC = () => {
  return (
    <section className="relative my-24 bg-fixed bg-cover bg-center text-white" style={{ backgroundImage: `url('/assets/home/featured.jpg')` }}>
      <div className="bg-black/75 py-24 md:py-36 px-4">
        <div className="max-w-6xl mx-auto space-y-12">
          <SectionTitle subHeading="Check it out" heading="FROM OUR MENU" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center">
            <div>
              <img
                src="/assets/home/featured.jpg"
                alt="Featured Dish"
                className="rounded-lg shadow-2xl h-80 md:h-[420px] w-full object-cover border border-white/20"
              />
            </div>
            <div className="space-y-4">
              <p className="font-cinzel text-sm text-gold-400 font-bold uppercase tracking-wider">March 20, 2023</p>
              <h3 className="font-cinzel text-2xl md:text-3xl font-bold uppercase tracking-wider">
                WHERE CAN I GET SOME?
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed font-light">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Error voluptate facere, deserunt dolores maiores quod nobis quas quasi. Eaque repellat recusandae ad laudantium tempore consequatur consequuntur omnis ullam maxime tenetur.
              </p>
              <div className="pt-2">
                <Link to="/menu">
                  <button className="btn bg-transparent hover:bg-gold-500 text-white hover:text-black font-cinzel font-bold text-xs uppercase tracking-widest px-8 py-3 rounded-lg border-b-4 border-t-0 border-x-0 border-white hover:border-gold-500 transition-all shadow-md">
                    READ MORE
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
