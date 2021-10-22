import React, { useEffect, useState } from "react";
import "./AddUser.css";
import { useHistory, useParams } from "react-router-dom";

const initialState = {
  name: "",
  email: "",
  phone: "",
  address: "",
};

const AddUser = () => {
  const history = useHistory();
  const { id } = useParams();
  const [edit, setEdit] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const { name, email, phone, address } = formData;

  // console.log(users);
  const onInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const formHandle = async (event) => {
    event.preventDefault();
    if (name && email && phone && address) {
      if (!edit) {
        const res = await fetch("/add-users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            email: email,
            phone: phone,
            address: address,
          }),
        });
      } else {
        const res = await fetch(
          "/update",
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id:id,
              name: name,
              email: email,
              phone: phone,
              address: address,
            }),
          }
        );
      }
      history.push("/");
    }
  };

  useEffect(() => {
    if (id) {
      setEdit(true);
    } else {
      setEdit(false);
    }
  }, [id]);

  return (
    <div className="container">
      <div className="heading">
        <h2>{edit ? "Edit User" : "Add User"}</h2>
      </div>
      <form className="formContainer" onSubmit={formHandle}>
        <label htmlFor="name">
          Name:
          <input
            type="text"
            name="name"
            id="name"
            value={name || ""}
            onChange={onInputChange}
            required
            placeholder="User Name"
          />
        </label>
        <label htmlFor="email">
          Email:
          <input
            type="email"
            name="email"
            id="email"
            value={email || ""}
            onChange={onInputChange}
            required
            placeholder="Email"
          />
        </label>
        <label htmlFor="phone">
          Phone no:
          <input
            type="number"
            name="phone"
            id="phone"
            value={phone || ""}
            onChange={onInputChange}
            required
            placeholder="Phone number"
          />
        </label>
        <label htmlFor="address">
          Address:
          <input
            type="text"
            name="address"
            id="address"
            value={address || ""}
            onChange={onInputChange}
            required
            placeholder="Address"
          />
        </label>
        <div className="buttonContainer">
          <button className="submit">{edit ? "Update" : "Submit"}</button>
          <button
            className="clear"
            onClick={() => {
              history.push("/");
            }}
          >
            BACK
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUser;
