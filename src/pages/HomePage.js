import React, { useState, useEffect } from "react";
import { Alert, Col, Container, Row } from "react-bootstrap";
import { ClipLoader } from "react-spinners";

import { useHistory } from "react-router-dom";
import PaginationBar from "../components/PaginationBar";
import SearchForm from "../components/SearchForm";
import api from "../apiService";

const BACKEND_API = process.env.REACT_APP_BACKEND_API;

const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const totalPage = 10;
  const limit = 10;

  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [query, setQuery] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const history = useHistory();

  const handleClickBook = (bookId) => {
    history.push(`/books/${bookId}`);
  };

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setQuery(searchInput);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let url = `/books?_page=${pageNum}&_limit=${limit}`;
        if (query) url += `&q=${query}`;
        const res = await api.get(url);
        console.log(res);
        setBooks(res.data);
        setErrorMessage("");
      } catch (error) {
        setErrorMessage(error.message);
      }
      setLoading(false);
    };
    fetchData();
  }, [pageNum, limit, query]);

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={6}>
          <h1 className="text-center page-title">Book Store</h1>
          <p className="text-center page-subtitle">
            Discover timeless classics and build your reading list.
          </p>
          {errorMessage && (
            <Alert variant="danger" className="glass-alert">
              {errorMessage}
            </Alert>
          )}
          <SearchForm
            loading={loading}
            searchInput={searchInput}
            handleSearchChange={handleSearchInputChange}
            handleSubmit={handleSubmit}
          />
          <hr className="glass-divider" />
          <PaginationBar
            pageNum={pageNum}
            setPageNum={setPageNum}
            totalPageNum={totalPage}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          {loading ? (
            <div className="text-center">
              <ClipLoader color="#f86c6b" size={150} loading={true} />
            </div>
          ) : books.length === 0 ? (
            <div className="glass empty-state">No books found.</div>
          ) : (
            <ul className="book-grid">
              {books.map((book) => (
                <li key={book.id} onClick={() => handleClickBook(book.id)}>
                  <div className="glass book-card">
                    <img
                      className="cover"
                      src={`${BACKEND_API}/${book.imageLink}`}
                      alt={book.title}
                    />
                    <div className="card-body">
                      <h5 className="book-title">{book.title}</h5>
                      <p className="book-author">@{book.author}</p>
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

export default HomePage;
