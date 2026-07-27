import React from 'react';

interface SectionTitleProps {
  heading: string;
  subHeading: string;
  center?: boolean;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({ heading, subHeading, center = true }) => {
  return (
    <div className={`my-8 ${center ? 'text-center' : 'text-left'} max-w-md mx-auto`}>
      <p className="text-gold-500 italic text-sm md:text-base font-inter font-medium mb-2">--- {subHeading} ---</p>
      <h2 className="text-3xl md:text-4xl font-cinzel font-bold border-y-4 border-gray-200 dark:border-gray-700 py-3 uppercase tracking-wider text-base-content">
        {heading}
      </h2>
    </div>
  );
};
