import React from "react";
import { Button, Col, Form } from "react-bootstrap";

const SearchForm = ({
  loading,
  searchInput,
  handleSearchChange,
  handleSubmit,
}) => {
  return (
    <Form onSubmit={handleSubmit} className="glass glass-search">
      <Form.Row className="align-items-center m-0">
        <Col>
          <Form.Control
            placeholder="Search title, author..."
            value={searchInput}
            onChange={handleSearchChange}
          />
        </Col>
        {loading ? (
          <Button disabled>
            <span
              className="spinner-border spinner-border-sm mr-2"
              role="status"
              aria-hidden="true"
            ></span>
            Searching..
          </Button>
        ) : (
          <Button type="submit">Search</Button>
        )}
      </Form.Row>
    </Form>
  );
};

export default SearchForm;
