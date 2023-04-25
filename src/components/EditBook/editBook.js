import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BookService from "../../repository/bookRepository";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";



const EditBook = ({ categories }) => {
  const navigate = useNavigate();

  const { id } = useParams();
  const [bookData, setBookData] = useState(null);

  useEffect(() => {
    BookService.fetchBookById(id).then(({ data }) => {
      setBookData((prevData) => ({
        ...prevData,
        ...data,
      }));
    });
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    BookService.updateBook(bookData.id, bookData)
      .then(() => {
        navigate('/books'); // Change this line
      })
      .catch((error) => {
        // Handle the error
        console.error("Error updating book:", error);
      });
  };

  const handleInputChange = (event, field) => {
    const value = event.target.value;
    setBookData((prevData) => {
      const fieldParts = field.split('.');
      if (fieldParts.length === 1) {
        return {
          ...prevData,
          [field]: value,
        };
      } else if (fieldParts.length === 2) {
        const [parentField, childField] = fieldParts;
        return {
          ...prevData,
          [parentField]: {
            ...prevData[parentField],
            [childField]: value,
          },
        };
      } else {
        console.error('Unsupported field:', field);
        return prevData;
      }
    });
  };
  if (!bookData) {
    return <div>Loading...</div>;
  }

  return (
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
      <Button type="submit">Save Book</Button>
    </form>
  );
};

export default EditBook;