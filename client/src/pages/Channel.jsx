import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
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

const Channel = () => {
  const [videos, setVideos] = useState([]);
  const path = useLocation().pathname.split("/")[2];

  const fetchVideos = async () => {
    const res = await axiosInstance.get(`/videos/${path}`);
    setVideos(res.data);
  };
  useEffect(() => {
    fetchVideos();
    // eslint-disable-next-line
  }, []);

  return (
    <Container>
      {/* {loading && <Loading> Loading ... ! </Loading>} */}
      {videos.map((video) => (
        <Card key={video._id} video={video} />
      ))}
    </Container>
  );
};

export default Channel;
