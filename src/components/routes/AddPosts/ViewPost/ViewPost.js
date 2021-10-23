import React, { useState, useEffect } from "react";
import "./style.css";

const ViewPost = () => {
  const [posts, setPosts] = useState();

  const FetchPostData = async () => {
    try {
      const fetchPosts = await fetch("/posts", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await fetchPosts.json();
      const collection = await data.data;

      setPosts(collection);
    } catch (error) {
      console.log(error.message);
    }
  };

  const onDeletePost = async (userId) => {
    await fetch("/delete-post", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: userId,
      }),
    });
    FetchPostData();
  };

  useEffect(() => {
    FetchPostData();
  }, []);

  console.log(posts);

  return (
    <div className="heroContainer">
      {posts
        ? posts.map((data) => (
            <div className="ViewContainer" key={data.id}>
              <img
                className="imageContainer"
                src={Buffer.from(data.image).toString("ascii")}
                alt=""
              />
              <p>{data.summary}</p>
              <h4>Post date - {data.createdAt.slice(0, 10)}</h4>
              <div className="buttonContainer">
                <button className="deletebtn" onClick={()=> {
                  onDeletePost(data.id)
                  }}>
                  delete
                </button>
              </div>
            </div>
          ))
        : ""}
    </div>
  );
};

export default ViewPost;
