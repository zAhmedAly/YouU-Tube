import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import axiosInstance from "../config";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/userSlice";

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 30px;
`;

// const Loading = styled.div`
//   dispaly: flex;
//   align-items: center;
//   justify-content: center;
//   color: ${({ theme }) => theme.text};
//   font-size: 20px;
//   font-weight: bold;
// `;

const Home = ({ type }) => {
  const [videos, setVideos] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();

  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   let userInfo = null;
  //   userInfo = JSON.parse(localStorage.getItem("persist:root"));
  //   console.log("Home userInfo = ", userInfo);
  //   if (!userInfo && (type === "sub" || type === "history")) {
  //     dispatch(logout());
  //     navigate("/signin", { state: { from: location }, replace: true });
  //   }
  //   // eslint-disable-next-line
  // }, [type]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axiosInstance.get(`/videos/${type}`);
        setVideos(res.data);
      } catch (error) {
        dispatch(logout());
        console.log("Home location = ", location);

        navigate("/signin", { state: { from: location }, replace: true });
      }
    };

    let userInfo = null;
    userInfo = JSON.parse(localStorage.getItem("persist:root"));
    console.log("Home userInfo = ", userInfo);
    if (!userInfo && (type === "sub" || type === "history")) {
      dispatch(logout());
      console.log("Home location = ", location);
      navigate("/signin", { state: { from: location }, replace: true });
    } else {
      fetchVideos();
    }

    return setVideos([]);
    // eslint-disable-next-line
  }, [type]);

  return (
    <>
      <h2 style={{ color: "white" }}>
        {" "}
        {type === "sub"
          ? "Subscriptions"
          : type === "history"
          ? "Watch hlistory"
          : type === "trend"
          ? "Trending"
          : "Home"}{" "}
      </h2>
      <hr style={{ margin: "1rem 0" }} />
      {/* {<Loading> Loading ... ! </Loading>} */}

      <Container>
        {videos.map((video, index) => (
          <Card key={index} video={video} />
        ))}
      </Container>
    </>
  );
};

export default Home;
