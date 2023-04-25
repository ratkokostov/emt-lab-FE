import React from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";


const Books = (props) => {
    const navigate = useNavigate();

    return (
        <div className={"container mm-4 mt-5"}>
            <div className={"row"}>
                <div className={"row"}>
                    <table className={"table table-striped"}>
                        <thead>
                            <tr>
                            <th>Book Name</th>
                            <th>Author</th>
                            <th >Country</th>
                            <th >Book Category</th>
                            <th >Available Copies</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.books.map((term) => {
                                return (
                                    <tr>
                                        <td >{term.name}</td>
                                        <td >{term.author.name} {term.author.surname}</td>
                                        <td >{term.author.country.name}</td>
                                        <td >{term.bookCategory}</td>
                                        <td >{term.availableCopies}</td>
                                        <td >
                                            <Button className="btn btn-success"onClick={() => props.onTake(term.id)} >Add</Button>
                                        </td>
                            
                                        <td >
                                        <Button className="btn btn-primary" onClick={() => navigate(`/edit/${term.id}`)}>Edit</Button>
                                        </td>
                                        <td cope={"col"}>
                                            <Button className="btn btn-danger" onClick={() => props.onDelete(term.id)}>Delete</Button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    <Button href="/add">Add book</Button>
                </div>
            </div>
        </div>
    );
}

export default Books;