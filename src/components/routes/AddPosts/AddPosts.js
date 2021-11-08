import React, { useState, useEffect } from "react";
import "./AddPosts.css";
import { useHistory } from "react-router-dom";
import axios from "axios";

const AddPosts = () => {
  const state = {
    image: "",
    summary: "",
    userId: [],
    category: "",
  };
  const [postData, setPostData] = useState(state);
  const [users, setUsers] = useState([]);
  const onChangeHandle = (event) => {
    setPostData({ ...postData, [event.target.name]: event.target.value });
  };
  const imageUpload = (event) => {
    setPostData({ ...postData, image: event.target.files[0] });
  };

  console.log(postData)

  const history = useHistory();

  const onFormSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("image", postData.image, postData.image.name);
    formData.append("summary", postData.summary);
    formData.append("userId", postData.userId);
    formData.append("category", postData.category);
    const response = await axios.post("/add-posts", formData);
    if (response.status === 200) {
      history.push("/posts");
    }
  };

  const getUserData = async () => {
    const response = await axios.get("/read");
    setUsers(response.data.data);
  };

  console.log(postData);

  useEffect(() => {
    getUserData();
  }, []);
  return (
    <div className="container">
      <div className="heading">
        <h2>Add New Post</h2>
      </div>
      <form className="postContainer" onSubmit={onFormSubmit}>
        <label htmlFor="image">
          Image :
          <input
            type="file"
            name="image"
            id="image"
            accept="image/*"
            required
            onChange={imageUpload}
          />
        </label>
        <label htmlFor="select">
          Select User:
          <select
            name="userId"
            id="selectUser"
            onChange={onChangeHandle}
            required
          >
            <option value="">Select here..</option>
            {users
              ? users.map((data) => (
                  <option key={data.id} value={[data.id, data.name]}>
                    {data.name}
                  </option>
                ))
              : ""}
          </select>
        </label>
        <label htmlFor="category">
          Post Category:
          <select
            name="category"
            id="category"
            onChange={onChangeHandle}
            required
          >
            <option value="">Select here..</option>
            <option value="Nature">Nature</option>
            <option value="LifeStyle">LifeStyle</option>
            <option value="Sport">Sport</option>
            <option value="News">News</option>
            <option value="Advertisement">Advertisement</option>
            <option value="Fun Facts">Fun Facts</option>
          </select>
        </label>
        <label htmlFor="summary">
          Summary:
          <textarea
            type="text"
            name="summary"
            id="summary"
            required
            onChange={onChangeHandle}
            placeholder="About post..!"
          />
        </label>
        <div className="buttonContainer">
          <button>Upload</button>
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

export default AddPosts;
