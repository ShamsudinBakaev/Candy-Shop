import React from 'react';
import axios from 'axios';
import { RootState, useAppDispatch, useAppSelector } from '../redux/store';
import { setCategoryId, setSortType, setCurrentPage, TSort } from '../redux/slices/filterSlice';

import Categories from '../Components/Categories';
import Sort from '../Components/Sort';
import CandyBlock from '../Components/CandyBlock';
import Skeleton from '../Components/CandyBlock/Skeleton';
import { SearchContext } from '../App';
import Pagination from '../Components/Pagination';

type TData = {
  id: string;
  imageURL: string;
  name: string;
  sizes: number[];
  price: number;
  category: number;
  rating: number;
  description: string;
};

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const { searchValue } = React.useContext(SearchContext);

  const { categoryId, sortType, currentPage } = useAppSelector((state: RootState) => state.filter);
  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  // slices:
  const onChangeCategory = React.useCallback(
    (id: number) => {
      dispatch(setCategoryId(id));
    },
    [dispatch],
  );
  const onChangeSort = React.useCallback(
    (id: TSort) => {
      dispatch(setSortType(id));
    },
    [dispatch],
  );
  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  React.useEffect(() => {
    setIsLoading(true);

    const sortBy = sortType.sortProperty.replace('-', '');
    const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    try {
      axios
        .get(
          `https://633fe84ee44b83bc73c3ee5c.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
        )
        .then((response) => {
          setData(response.data);
          setIsLoading(false);
        });
    } catch (error) {
      console.log('ERROR:', error);
    }
  }, [categoryId, sortType, currentPage, searchValue]);

  const candies = data
    .filter((obj: TData) => {
      if (obj.name.toLowerCase().includes(searchValue.toLowerCase())) {
        return true;
      }

      return false;
    })
    .map((obj: TData) => <CandyBlock key={obj.id} {...obj} />);
  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort value={sortType} onChangeSort={onChangeSort} />
      </div>
      <h2 className="content__title">Весь товар</h2>
      <div className="content__items">{isLoading ? skeletons : candies}</div>
      <Pagination onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
