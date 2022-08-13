import { Link } from "react-router-dom";
import styled from "styled-components";
import { format } from "timeago.js";

const Container = styled.div`
  width: ${(props) => props.type !== "sm" && "280px"};
  margin-bottom: ${(props) => (props.type === "sm" ? "10px" : "15px")};
  cursor: pointer;
  display: ${(props) => props.type === "sm" && "flex"};
  gap: 15px;
  // border: 2px solid white;
`;

const Image = styled.img`
  width: ${(props) => (props.type === "sm" ? "80px" : "100%")};
  height: ${(props) => (props.type === "sm" ? "120px" : "140px")};
  background-color: #999;
  flex: 1;
`;

const Details = styled.div`
  display: flex;
  margin-top: ${(props) => props.type !== "sm" && "16px"};
  gap: 12px;
  flex: 1;
`;

const ChannelImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #999;
  display: ${(props) => props.type === "sm" && "none"};
`;

const Texts = styled.div``;

const Title = styled.h1`
  font-size: 14px;
  font-weight: 400;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.h2`
  font-size: 12px;
  color: ${({ theme }) => theme.textSoft};
  margin: 5px 0px;
`;

const Info = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.textSoft};
`;

const Card = ({ type, video }) => {
  // const [channel, setChannel] = useState({});

  // useEffect(() => {
  //   const fetchChannel = async () => {
  //     const res = await axiosInstance.get(`/users/find/${video.userId}`);
  //     setChannel(res.data);
  //   };
  //   fetchChannel();
  //   // eslint-disable-next-line
  // }, [video.userId]);

  return (
    <Container type={type}>
      <Link to={`/video/${video._id}`} style={{ textDecoration: "none" }}>
        <Image type={type} src={video.imgUrl} />
      </Link>
      <Details type={type}>
        <Link
          to={`/channel/${video.user._id}`}
          style={{ textDecoration: "none" }}
        >
          <ChannelImage type={type} src={video.user.img} />
        </Link>
        <Link to={`/video/${video._id}`} style={{ textDecoration: "none" }}>
          <Texts>
            <Title>{video.title}</Title>
            <ChannelName>{video.user.name}</ChannelName>
            <Info>
              {video.views} views • {format(video.createdAt)}
            </Info>
          </Texts>
        </Link>
      </Details>
    </Container>
  );
};

export default Card;
