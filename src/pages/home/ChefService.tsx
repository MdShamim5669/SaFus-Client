import React from 'react';

export const ChefService: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-20 md:py-28">
      <div
        className="relative bg-cover bg-center py-24 md:py-36 px-6 md:px-20 shadow-2xl rounded-sm"
        style={{ backgroundImage: `url('/assets/home/chef-service.jpg')` }}
      >
        <div className="bg-white text-center max-w-4xl mx-auto p-10 md:p-16 shadow-2xl space-y-6 border border-gray-200">
          <h2 className="font-cinzel text-3xl md:text-5xl font-extrabold uppercase tracking-widest text-black">
            SAFUS
          </h2>
          <p className="text-gray-700 text-sm md:text-base leading-relaxed max-w-2xl mx-auto font-light">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, libero accusamus laborum
            deserunt ratione dolor officiis praesentium! Deserunt magni aperiam dolor eius dolore at, nihil iusto
            ducimus incident quibusdam nemo.
          </p>
        </div>
      </div>
    </section>
  );
};
