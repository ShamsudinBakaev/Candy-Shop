import React from 'react';

import { addItems } from '../../redux/slices/cartSlice';

import type { TCartItem } from '../../redux/slices/cartSlice';

import { Link } from 'react-router-dom';
import { RootState, useAppDispatch, useAppSelector } from '../../redux/store';

type TCandyBlockProps = {
  id: string;
  name: string;
  price: number;
  imageURL: string;
  sizes: number[];
};

const CandyBlock: React.FC<TCandyBlockProps> = ({ id, name, price, imageURL, sizes }) => {
  const dispatch = useAppDispatch();
  const cartItem = useAppSelector((state: RootState) =>
    state.cart.items.find((obj) => obj.id === id),
  );

  const [activeSize, setActiveSize] = React.useState(0);

  const addedCount = cartItem ? cartItem.count : 0;

  const onClickAdd = () => {
    const item: TCartItem = {
      id,
      name,
      price,
      imageURL,
      size: sizes[activeSize],
      count: 0,
    };
    dispatch(addItems(item));
  };

  return (
    <div className="candy-block-wrapper">
      <div className="candy-block">
        <Link key={id} to={`/candy/${id}`}>
          <img className="candy-block__image" src={imageURL} alt="Pizza" />
          <h4 className="candy-block__title">{name}</h4>
        </Link>
        <div className="candy-block__selector">
          <p className="candy-block__title2">В упаковке:</p>
          <ul>
            {sizes.map((size, i) => (
              <li
                key={i}
                onClick={() => setActiveSize(i)}
                className={activeSize === i ? 'active' : ''}>
                {size} шт.
              </li>
            ))}
          </ul>
        </div>
        <div className="candy-block__bottom">
          <div className="candy-block__price">от {price} ₽</div>
          <button onClick={onClickAdd} className="button button--outline button--add">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Добавить</span>
            {addedCount > 0 && <i>{addedCount}</i>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CandyBlock;
