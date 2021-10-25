import React, { useState } from "react";
import "./AddPosts.css";
import { useHistory } from "react-router-dom";
import axios from 'axios';


const AddPosts = () => {
  const state = {
    image:'',
    summary:''
  }
  const [postData , setPostData] = useState(state)

  const onChangeHandle = (event) =>
  {
    setPostData({...postData,[event.target.name]:event.target.value});
  }
  const imageUpload= (event)=>
  {
    setPostData({...postData,image:event.target.files[0]});
  }

  const history = useHistory();


  const onFormSubmit = async (event) => {

    event.preventDefault();
    const formData = new FormData();
    formData.append("image", postData.image,postData.image.name);
    formData.append("summary",postData.summary )
    const response = await axios.post("/add-posts",formData);
    if(response.status === 200){
      history.push("/")
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
            accept="image/*"
            required
            onChange={imageUpload}
          />
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
