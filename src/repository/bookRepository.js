import axios from '../custom-axios/axios';

const fetchBooks = () => {
  return axios.get("/books");
};
const fetchBookById = (id) => {
  return axios.get(`/book/${id}`);
};
const fetchCategories = () => {
  return axios.get("/categories");
};

const deleteBook = (id) => {
  return axios.delete(`/delete/${id}`);
};

const takeBook = (id) => {
  return axios.put(`/take/${id}`);
};
const addBook = (bookData) => {
  return axios.post("/add", bookData);
};
const updateBook = (id, bookData) => {
  return axios.put(`/edit/${id}`, bookData);
};

const BookService = {
  fetchBooks,
  fetchCategories,
  deleteBook,
  takeBook,
  addBook,
  updateBook,
  fetchBookById
};

export default BookService;