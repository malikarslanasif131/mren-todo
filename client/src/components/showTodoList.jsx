import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { UpdateTodo } from "./updateTodo";

export function ShowTodoList() {
  const [todo, setTodo] = useState([]);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");
  const [update, setUpdate] = useState(false);
  // -----------------------------Add Todo --------------------------

  const [data, setData] = useState({ title: "", description: "" });

  function handleChange(e) {
    setData((data) => ({ ...data, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    axios
      .post("http://localhost:8000/api/todo", data)
      .then((res) => {
        setData({ title: "", description: "" });
      })
      .catch((err) => {
        console.log("Error couldn't create TODO");
      });
  }
  // -----------------------------End Add Todo --------------------------

  function getAll() {
    axios
      .get("http://localhost:8000/api/todo")
      .then((res) => {
        setTodo(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
  useEffect(() => {
    getAll();
  }, [update, data]);

  function handleEdit(e) {
    setId(e.target.name);
    setOpen(true);
  }

  function handleUpdate() {
    setUpdate(!update);
  }

  function handleDelete(e) {
    axios.delete(`http://localhost:8000/api/todo/${e.target.name}`);

    setTodo((data) => {
      return data.filter((todo) => todo._id !== e.target.name);
    });
  }

  function handleClose() {
    setId("");
    setOpen(false);
  }

  async function handleSearch(e) {
    let key = e.target.value;

    if (key === " ") {
      getAll();
    } else {
      await axios
        .get(`http://localhost:8000/api/todo/search/${key}`)
        .then((res) => {
          if (res.data) {
            setTodo(res.data);
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }

  return (
    <div
      className="container  bg-dark text-light mt-5 rounded-3 shadow-sm"
      style={{ minHeight: "500px", minWidth: "500px" }}
    >
      <div className="row">
        <div className=" ">
          <div className=" m-3 d-flex  ">
            <h1 className="text-center m-5 ">Todo List App in MERN Stack</h1>
            <div className="w-25"> </div>
            <div className="w-25">
              <input
                type="text"
                placeholder="Search "
                className="form-control form-control-lg float-end my-5"
                onChange={handleSearch}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="row mx-auto">
        <div className="col-md-3">
          <form
            onSubmit={handleSubmit}
            className=" container mx-auto px-2 py-3 border  "
          >
            <h5 className="fs-3 text-light mx-3 ">Add Todo</h5>
            <div className="d-flex flex-column mx-auto">
              <input
                type="text"
                className="p-1 m-1"
                value={data.title}
                onChange={handleChange}
                placeholder="Title"
                name="title"
              />
              <input
                type="text"
                className="p-1 m-1"
                value={data.description}
                onChange={handleChange}
                name="description"
                placeholder="Description ..."
              />
              <button className="btn btn-primary p-1 m-1">Add New</button>
            </div>
          </form>
          {/* ---------------End Add Todo List---------------- */}

          {/* ---------------Update  Todo---------------- */}

          {open ? (
            <div className="">
              <UpdateTodo
                _id={id}
                handleClose={handleClose}
                handleUpdate={handleUpdate}
              />
            </div>
          ) : (
            ""
          )}

          {/* ----------------End of Update todo ------------------- */}
        </div>
        <div className="col-md-9">
          <div className="row  mx-auto">
            {todo.length > 0 ? (
              todo.map((data) => {
                return (
                  <div className="col-md-5 mx-4 my-2" key={data._id}>
                    <div className="card bg-light">
                      <div className="card-body m-0 p-0">
                        <h4 className="card-title card-header  text-dark">
                          <span className="text-muted me-2 fs-6">Title:</span>
                          {data.title}
                        </h4>
                        <p className="card-text text-dark m-3 mb-5 fs-4">
                          <span className="text-muted me-2 fs-6">
                            Description:
                          </span>
                          {data.description}
                        </p>

                        <div className="d-flex justify-content-around card-footer">
                          <Link
                            className="btn btn-outline-secondary fw-bold px-5"
                            name={data._id}
                            onClick={handleEdit}
                          >
                            Edit
                          </Link>
                          <Link
                            className="btn btn-outline-danger fw-bold px-5"
                            name={data._id}
                            onClick={handleDelete}
                          >
                            Delete
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <h1>No Todo Found</h1>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
