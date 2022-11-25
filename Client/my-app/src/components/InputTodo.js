import React, { Fragment, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const InputTodo = () => {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState("");
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("");
  const [duedate, setDuedate] = useState("");
  const [validated, setValidated] = useState(false);

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { name, content, tag, priority, status, duedate };
      const response = await fetch("http://localhost:8000/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      console.log(response);
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <Fragment>
      <div id="homeButton">
        <Link to="/dashboard">
          <h6>Back to Dashboard</h6>
        </Link>
      </div>
      <h1 className="text-center mt-5">Add Tasks</h1>
      <Form noValidate validated={validated} className="mb-3" onSubmit={onSubmitForm}>
        <div>
          <Form.Label>Name</Form.Label>
          <input type="text" className="form-control" placeholder="Name the task" value={name} onChange={(e) => setName(e.target.value)} />
          <Form.Label>Content</Form.Label>
          <input type="text" className="form-control" placeholder="Add some content" value={content} onChange={(e) => setContent(e.target.value)} />
          <Form.Select aria-label="Default select example" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option>Status</option>
            <option value="todo">Todo</option>
            <option value="progress">In Progress</option>
            <option value="review">In Review</option>
            <option value="completed">Completed</option>
          </Form.Select>
          <Form.Select aria-label="Default select example" value={tag} onChange={(e) => setTag(e.target.value)}>
            <option>Tag</option>
            <option value="1">Work</option>
            <option value="2">School</option>
            <option value="3">Home</option>
            <option value="4">Appointments</option>
            <option value="5">Family</option>
            <option value="6">Other</option>
          </Form.Select>
          <Form.Select aria-label="Default select example" value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option>Priority</option>
            <option value="7">Low</option>
            <option value="8">Medium</option>
            <option value="9">High</option>
          </Form.Select>
        </div>
        <Form.Label>due date</Form.Label>
        <input type="text" className="form-control" placeholder="YYYY-MM-DD" value={duedate} onChange={(e) => setDuedate(e.target.value)} />

        <button
          className="btn btn-success"
          onClick={() => {
            alert("Saved");
          }}
        >
          Add
        </button>
      </Form>
    </Fragment>
  );
};
export default InputTodo;
