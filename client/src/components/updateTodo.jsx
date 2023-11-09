import { useState, useEffect } from "react";
import axios from "axios";

export function UpdateTodo({ _id, handleClose, handleUpdate }) {
  const [data, setData] = useState({ title: "", description: "" });

  useEffect(
    function () {
      axios
        .get(`http://localhost:8000/api/todo/${_id}`)
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    },
    [_id]
  );

  function handleChange(e) {
    setData((data) => ({ ...data, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    console.log({ _id }, { data });

    axios
      .put(`http://localhost:8000/api/todo/${_id}`, data)
      .then((res) => {
        setData({ title: "", description: "" });
        console.log(res.data.message);
      })
      .catch((err) => {
        console.log("Failed to update todo");
        console.log(err.message);
      });
  }

  return (
    <>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
          handleUpdate();
          handleClose();
        }}
        className=" container mx-auto px-2 pb-3 border mt-5 "
      >
        <div className="fade show text-light">
          <div
            onClick={handleClose}
            className="float-end m-0 p-0"
            data-bs-dismiss="alert"
            aria-label="Close"
          >
            <span className="text-light fs-2 p-0 m-0 me-2 ">&times;</span>
          </div>
        </div>
        <h5 className="fs-3 text-light mx-3 pt-3 ">Edit Todo</h5>
        <div className="d-flex flex-column mx-auto">
          <input
            type="text"
            className="p-1 m-1"
            onChange={handleChange}
            value={data.title}
            name="title"
            placeholder="Title"
          />
          <input
            type="text"
            className="p-1 m-1"
            placeholder="Description ..."
            onChange={handleChange}
            value={data.description}
            name="description"
          />
          <button type="submit" className="btn btn-primary p-1 m-1">
            Update
          </button>
        </div>
      </form>
    </>
  );
}
