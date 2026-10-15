import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { ClipLoader } from "react-spinners";

import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../apiService";

const BACKEND_API = process.env.REACT_APP_BACKEND_API;

const ReadingPage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [removedBookId, setRemovedBookId] = useState("");
  const history = useHistory();

  const handleClickBook = (bookId) => {
    history.push(`/books/${bookId}`);
  };

  const removeBook = (bookId) => {
    setRemovedBookId(bookId);
  };

  useEffect(() => {
    if (removedBookId) return;
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/favorites`);
        setBooks(res.data);
      } catch (error) {
        toast(error.message);
      }
      setLoading(false);
    };
    fetchData();
  }, [removedBookId]);

  useEffect(() => {
    if (!removedBookId) return;
    const fetchData = async () => {
      setLoading(true);
      try {
        await api.delete(`/favorites/${removedBookId}`);
        toast.success("The book has been removed");
        setRemovedBookId("");
      } catch (error) {
        toast(error.message);
      }
      setLoading(false);
    };
    fetchData();
  }, [removedBookId]);

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={6}>
          <h1 className="text-center page-title">Reading List</h1>
          <hr className="glass-divider" />
        </Col>
      </Row>
      <Row>
        <Col>
          {loading ? (
            <div className="text-center">
              <ClipLoader color="#f86c6b" size={150} loading={true} />
            </div>
          ) : books.length === 0 ? (
            <div className="glass empty-state">
              Your reading list is empty. Add some books from the home page!
            </div>
          ) : (
            <ul className="book-grid">
              {books.map((book) => (
                <li key={book.id}>
                  <div className="glass book-card">
                    <img
                      className="cover"
                      src={`${BACKEND_API}/${book.imageLink}`}
                      alt={book.title}
                      onClick={() => handleClickBook(book.id)}
                    />
                    <div className="card-body">
                      <h5 className="book-title">{book.title}</h5>
                      <p className="book-author">@{book.author}</p>
                      <Button
                        className="remove-btn"
                        aria-label={`Remove ${book.title}`}
                        onClick={() => removeBook(book.id)}
                      >
                        &times;
                      </Button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ReadingPage;
