import React, { useState } from "react";
import PropTypes from "prop-types";

const TodoForm = ({ onSubmit }) => {
  const [content, setContent] = useState("");

  const handleChange = event => {
    setContent(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (content === "") {
      return;
    }

    onSubmit({ content });
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="content"
        value={content}
        onChange={handleChange}
      />
      <input type="submit" value="Create Todo" />
    </form>
  );
};

TodoForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default TodoForm;
