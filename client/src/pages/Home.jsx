import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import axiosInstance from "../config";
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
  const { loading } = useSelector((state) => state.video);

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axiosInstance.get(`/videos/${type}`);
      setVideos(res.data);
    };

    fetchVideos();

    // eslint-disable-next-line
    return setVideos([]);
  }, [type]);

  return (
    <>
      <h2 style={{ color: "white" }}>
        {" "}
        {type === "sub"
          ? "Subscriptions"
          : type === "history"
          ? "History"
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
