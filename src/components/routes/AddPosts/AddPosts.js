import React, { useState } from "react";
import "./AddPosts.css";
import { useHistory } from "react-router-dom";

const AddPosts = () => {
  const [image, setImage] = useState("");
  const [summary, setSummary] = useState("");
  const history = useHistory();

  const onFormSubmit = async (event) => {
    event.preventDefault();
    if(image && summary){
      const response = await fetch("/add-posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image:image,
          summary:summary
        }),
      });
      history.push('/')
    }
  };


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
            required
            onChange={(e) => {
              const files = e.target.files;
              let reader = new FileReader();
              reader.readAsDataURL(files[0]);

              reader.onload = (e) => {
                setImage(e.target.result);
              };
            }}
          />
        </label>
        <label htmlFor="summary">
          Summary:
          <textarea
            type="text"
            name="summary"
            id="summary"
            required
            onChange={(e) => setSummary(e.target.value)}
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
