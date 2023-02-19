import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type TSort = {
  name: string;
  sortProperty: 'rating' | '-rating' | 'price' | '-price';
};

interface IFilterSliceState {
  categoryId: number;
  currentPage: number;
  sortType: TSort;
}

const initialState: IFilterSliceState = {
  categoryId: 0,
  currentPage: 1,
  sortType: {
    name: 'рейтингу',
    sortProperty: 'rating',
  },
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSortType(state, action: PayloadAction<TSort>) {
      state.sortType = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
  },
});

export const { setCategoryId, setSortType, setCurrentPage } = filterSlice.actions;

export default filterSlice.reducer;
