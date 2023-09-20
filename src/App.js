import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Badge, Spinner } from "react-bootstrap";
import List from "./List";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import "./App.css";


function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getData = async () => {

    try {
      setLoading(true);
      const { data } = await axios.get(
        "https://jsonplaceholder.typicode.com/todos"
      );
      setData(data);
      setError("");
      setLoading(false);

    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  }

  const removeTask = (x) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setData((last) => {
          const help = [...last];
          help.splice(x, 1);
          return [...help];
        });
        Swal.fire("Deleted!", "Your task has been deleted.", "success");
      }
    });
  };

  const changeStatus = (index) => {
    setData((last) => {
      const help = JSON.parse(JSON.stringify(last));
      help[index].status = !help[index].status;
      return [...help];
    });
  };

  return (
    <div className="p-4" style={{ textAlign: "center", height: "100vh" }}>
      {loading ? (
        <div style={{
          height: "100vh",
          display: "grid",
          placeItems: "center",
        }}>
          <Spinner className="spinner text-warning" animation="border" />
        </div>
      ) : data.length ? (
        <List data={data} removeTask={removeTask} changeStatus={changeStatus} />) : (
        <div className="container">
          <button className="get-data-button" onClick={() => {
            getData();
          }}>Get Data</button>
          {error ? <Badge bg="danger">{error}</Badge> : ""}
        </div>
      )}
    </div>
  );
}

export default App;
