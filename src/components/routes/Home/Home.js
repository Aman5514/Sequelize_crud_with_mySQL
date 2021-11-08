import React, { useEffect, useState } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
const Home = () => {
  const [users, setUsers] = useState();

  const FetchData = async () => {
    try {
      const fetchUsers = await fetch("/read", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await fetchUsers.json();
      const collection = await data.data;
      setUsers(collection)
    } catch (error) {
      console.log("Error : " + error.message);
    }
  };

  const onDelete = async (userId) => {
    await fetch("/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: userId,
      }),
    });
    FetchData();
  };

  useEffect(() => {
    FetchData();
  }, []);

  return (
    <div className="homeContainer">
      {users ? (
      <>
        <table className="tableContainer">
          <thead>
            <tr>
              <th className="heading">S.No</th>
              <th className="heading">Name</th>
              <th className="heading">Email</th>
              <th className="heading">Phone</th>
              <th className="heading">Address</th>
              <th className="heading">Edit/Delete</th>
            </tr>
          </thead>
          {users
            ? users.map((data, index) => (
                <tbody key={data.id}>
                  <tr>
                    <td className="tableData">{index + 1}</td>
                    <td className="tableData">{data.name}</td>
                    <td className="tableData">{data.email}</td>
                    <td className="tableData">{data.phone}</td>
                    <td className="tableData">{data.address}</td>
                    <td className="tableData">
                      <div className="buttonContainer">
                        <button className="edit">
                          <Link className="link" to={`/add-user/${data.uuid}`}>
                            Edit
                          </Link>
                        </button>
                        <button
                          className="delete"
                          onClick={() => onDelete(data.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              ))
            : ""}
        </table>
        </>
      ) : (
        "Loading Data . . . "
      )}
    </div>
  );
};

export default Home;
