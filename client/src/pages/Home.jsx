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

// const Loading = styled.h2`
//   dispaly: flex;
//   align-items: center;
//   justify-content: center;
//   color: ${({ theme }) => theme.text};
// `;

const Home = ({ type }) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axiosInstance.get(`/videos/${type}`);
      setVideos(res.data);
    };
    fetchVideos();
    // eslint-disable-next-line
  }, [type]);

  return (
    <Container>
      {/* {loading && <Loading> Loading ... ! </Loading>} */}
      {videos.map((video, index) => (
        <Card key={index} video={video} />
      ))}
    </Container>
  );
};

export default Home;
