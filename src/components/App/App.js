import './App.css';
import React,{Component} from "react";
import {BrowserRouter as Router, Redirect, Route,Routes} from 'react-router-dom';
import Books from '../Books/books';
import Categories from '../Categories/categories';
import BookService from '../../repository/bookRepository';
import AddBook from "../AddBook/addBook";
import EditBook from "../EditBook/editBook";





class App extends Component {
  constructor(){
    super();
    this.state = {
      books: [],
      categories: []
    }
  }
  render() {
    return (
      <Router>
        <main>
          <div className="container">
            <Routes>
              <Route
                path="/books"
                element={React.cloneElement(<Books />, { books: this.state.books, onDelete: this.deleteBook, onTake: this.takeBook,onBookEdited: this.editBook })}
                />
              <Route
                path="/categories"
                element={React.cloneElement(<Categories />, { categories: this.state.categories })}
              />
              <Route path="/add"
                element={React.cloneElement(<AddBook />, { onBookAdded: this.loadBooks })} />
                  <Route
                path="/"
                element={React.cloneElement(<Books />, { books: this.state.books, onDelete: this.deleteBook, onTake: this.takeBook, onBookEdited: this.editBook})}
                />
         <Route path="/edit/:id" element={<EditBook categories={this.state.categories} onBookEdited={this.editBook} />} />

            </Routes>
            
          </div>
        </main>
      </Router>
    );
  }

  loadBooks = () => {
    BookService.fetchBooks()
      .then(({ data }) => {
        this.setState({
          books: data,
        });
        console.log(data.data)
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
      });
  };


  loadCategories = () => {
    BookService.fetchCategories()
      .then(({ data }) => {
        this.setState({
          categories: data,
        });
        console.log(data.data)
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });

}
deleteBook = (id) =>{
  BookService.deleteBook(id)
  .then(() =>{
    this.loadBooks()
  })
}
takeBook = (id) =>{
  BookService.takeBook(id)
  .then(() =>{
    this.loadBooks()
  })
}
editBook = (id) =>{
  BookService.editBook(id)
  .then(() =>{
    this.loadBooks()
  })
}

componentDidMount(){
    this.loadBooks();
    this.loadCategories();
  }
}

export default App;
