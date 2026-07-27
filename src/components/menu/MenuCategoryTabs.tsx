import React from 'react';

interface MenuCategoryTabsProps {
  categories: { id: string; name: string }[];
  activeCategory: string;
  onSelectCategory: (id: string) => void;
}

export const MenuCategoryTabs: React.FC<MenuCategoryTabsProps> = ({
  categories,
  activeCategory,
  onSelectCategory,
}) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 my-8">
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onSelectCategory(cat.id)}
          className={`px-5 py-2.5 font-cinzel font-bold text-sm uppercase tracking-wider rounded-md transition-all duration-200 ${
            activeCategory === cat.id
              ? 'bg-gold-500 text-black shadow-lg scale-105'
              : 'bg-base-200 text-base-content hover:bg-gold-500/20 hover:text-gold-500 border border-gray-300 dark:border-gray-800'
          }`}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
};
