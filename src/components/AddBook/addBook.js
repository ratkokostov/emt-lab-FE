import React, { useState,useEffect} from "react";
import Button from "react-bootstrap/Button";
import BookService from "../../repository/bookRepository";
import { useNavigate } from "react-router-dom";



const AddBook = (props) => {
  const navigate = useNavigate();

    const [bookData, setBookData] = useState({
      name: "",
      author: {
        name: "",
        surname: "",
        country: {
          name: "",
          continent: "",
        },
      },
      availableCopies: 0,
      bookCategory: "",
    });
    const [categories, setCategories] = useState([]);
    const loadCategories = () => {
        BookService.fetchCategories()
          .then(({ data }) => {
            setCategories(data);
          })
          .catch((error) => {
            console.error("Error fetching categories:", error);
          });
      };
      useEffect(() => {
        loadCategories();
      }, []);    
      const handleInputChange = (event, fieldPath) => {
        const fields = fieldPath.split(".");
        let newData = { ...bookData };
        let currentLevel = newData;
        
        fields.forEach((field, index) => {
          if (index === fields.length - 1) {
            currentLevel[field] = event.target.value;
          } else {
            currentLevel = currentLevel[field];
          }
        });
      
        setBookData(newData);
      };
  
      const handleSubmit = (event) => {
        event.preventDefault();
        BookService.addBook(bookData)
          .then((response) => {
            console.log("Book added successfully:", response);
            if (props.onBookAdded) {
              props.onBookAdded();
            }
            // Redirect to /books
            navigate("/books");
          })
          .catch((error) => {
            console.error("Error adding book:", error);
          });
      };
    
  
    return (
        <div className="form-container">
        <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={bookData.name}
          onChange={(event) => handleInputChange(event, "name")}
          placeholder="Book name"
        />
        <input
          type="text"
          value={bookData.author.name}
          onChange={(event) => handleInputChange(event, "author.name")}
          placeholder="Author first name"
        />
        <input
          type="text"
          value={bookData.author.surname}
          onChange={(event) => handleInputChange(event, "author.surname")}
          placeholder="Author last name"
        />
        <input
          type="text"
          value={bookData.author.country.name}
          onChange={(event) => handleInputChange(event, "author.country.name")}
          placeholder="Author's country name"
        />
        <input
          type="text"
          value={bookData.author.country.continent}
          onChange={(event) => handleInputChange(event, "author.country.continent")}
          placeholder="Author's country continent"
        />
        <input
          type="number"
          value={bookData.availableCopies}
          onChange={(event) => handleInputChange(event, "availableCopies")}
          placeholder="Available copies"
        />
         <select
          value={bookData.bookCategory}
          onChange={(event) => handleInputChange(event, "bookCategory")}
        >
          <option value="">Select book category</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <Button type="submit">Add Book</Button>
      </form>
      </div>
    );
  };
  
  export default AddBook;
