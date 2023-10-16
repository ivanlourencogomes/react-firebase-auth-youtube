import { configureStore } from '@reduxjs/toolkit';
import booksReducer from './booksSlice.js';
import notesReducer from './notesSlice.js';

export default configureStore({
  reducer: {
    books: booksReducer,
    notes: notesReducer
  }
})