import React, { useState, useEffect } from "react";
import "./style.css";
import axios from "axios";

const ViewPost = () => {
  const [posts, setPosts] = useState([]);
  const [userPosts, setUserPosts] = useState();
  const [filterUserName, setFilterUserName] = useState("");
  const [filterPostName, setFilterPostName] = useState("");
  const [grouping, setGrouping] = useState(false);
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

  const FetchUserPosts = async () => {
    try {
      const fetchUserposts = await axios.get("/userpost");
      const data = fetchUserposts.data;
      setUserPosts(data);
    } catch (error) { 
      console.log(error.message);
    }
  };

console.log(userPosts ? userPosts.map(data => data.posts.category === "Fun") : "under process")

  const onDeletePost = async (userId) => {
    await fetch("/delete-post", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        image: userId,
      }),
    });
    FetchPostData();
    FetchUserPosts();
  };

  const FilterUserName = (event) => {
    setFilterUserName(event.target.value);
  };

  const FilterPostName = (event) => {
    setFilterPostName(event.target.value);
  };

  const filterPostUserName = posts.sort((a, b) => {
    if (filterUserName === "asc") {
      if (a.user_name < b.user_name) {
        return -1;
      }
      return 1;
    }
    if (filterUserName === "desc") {
      if (a.user_name < b.user_name) {
        return 1;
      }
      return -1;
    }
  });

  const filterPostSummary = posts.sort((a, b) => {
    if (filterPostName === "asc") {
      if (a.summary < b.summary) {
        return -1;
      }
      return 1;
    }
    if (filterPostName === "desc") {
      if (a.summary < b.summary) {
        return 1;
      }
      return -1;
    }
  });

  const OnGroupHandle = (event) => {
    setGrouping(event.target.value);
  };

  useEffect(() => {
    FetchPostData();
    FetchUserPosts();
  }, []);

  return (
    <>
      <div className="headerBox">
        <h2 className="postHeader">Posts</h2>
        <div>
          <select name="userName" id="select" onChange={FilterUserName}>
            <option value="">Filter Name</option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
          <select name="postName" id="select" onChange={FilterPostName}>
            <option value="">Filter Post</option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
          <select name="GroupBy" id="select" onChange={OnGroupHandle}>
            <option value="">Group By</option>
            <option value={true}>Group by name</option>
          </select>
        </div>
      </div>
      <div className="heroContainer">
        {!grouping ? (
          posts.map((data) => (
            <div className="ViewContainer" key={data.id}>
              <img
                className="imageContainer"
                src={`http://localhost:5000/image/${data.image}`}
                alt=""
              />
              <h5>post by : {data.user_name}</h5>
              <p>{data.summary}</p>
              <h6>Posted on - {data.createdAt.slice(0, 10)} </h6>
              <div className="buttonContainer">
                <button
                  className="deletebtn"
                  onClick={() => onDeletePost(data.image)}
                >
                  delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <>
            {userPosts.map((data) => (
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 5,
                }}
                key={data.uuid}
              >
                <h3>{data.name}</h3>
                <div
                  style={{ flexDirection: "row", width: "100%" }}
                  className="ViewContainer"
                  key={data.id}
                >
                  {data.posts.map((data) => (
                    <div key={data.image}>
                      <img
                        className="imageContainer"
                        src={`http://localhost:5000/image/${data.image}`}
                        alt=""
                      />
                      <p
                        style={{
                          fontSize: 14,
                          textAlign: "center",
                          marginBottom: 5,
                        }}
                      >
                        {data.summary}
                      </p>
                      <div className="buttonContainer">
                        <button
                          className="deletebtn"
                          onClick={() => onDeletePost(data.image)}
                        >
                          delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default ViewPost;
