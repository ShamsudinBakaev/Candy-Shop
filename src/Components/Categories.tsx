import React from 'react';

type TCategoriesProps = {
  value: number;
  onChangeCategory: (i: number) => void;
};

const Categories: React.FC<TCategoriesProps> = React.memo(({ value, onChangeCategory }) => {
  const categories = ['Все', 'Snickers', 'Picnic', 'Twix', 'Bounty', 'Mars'];

  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, i) => (
          <li key={i} onClick={() => onChangeCategory(i)} className={value === i ? 'active' : ''}>
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
});

export default Categories;
