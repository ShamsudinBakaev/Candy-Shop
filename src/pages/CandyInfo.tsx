import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const CandyInfo: React.FC = () => {
  const [candy, setCandy] = React.useState<{
    imageURL: string;
    name: string;
    price: number;
    description: string;
  }>();
  const { id } = useParams();

  React.useEffect(() => {
    async function fetchCandy() {
      try {
        const { data } = await axios.get('https://633fe84ee44b83bc73c3ee5c.mockapi.io/items/' + id);
        setCandy(data);
      } catch (error) {
        alert('Ошибка при получении товара');
      }
    }

    fetchCandy();
  }, [id]);

  if (!candy) {
    return <h3 className="download">Загрузка...</h3>;
  }

  return (
    <div className="info__container">
      <div className="info-block1">
        <img className="info-block1__image" src={candy.imageURL} alt="Candy" />
      </div>
      <div className="info-block2">
        <h2 className="info-block2__name">{candy.name}</h2>
        <p className="info-block2__description">{candy.description}</p>
        <h4 className="info-block2__price">Цена: от {candy.price} ₽</h4>
      </div>
    </div>
  );
};

export default CandyInfo;
