import { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import Menu from "./components/Menu";
import Navbar from "./components/Navbar";
import { darkTheme, lightTheme } from "./utils/Theme";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Video from "./pages/Video";
import SignIn from "./pages/SignIn";
import Search from "./pages/Search";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import Channel from "./pages/Channel";
import WatchHistory from "./pages/WatchHistory";

const Container = styled.div`
  display: flex;
`;

const Main = styled.div`
  flex: 7;
  background-color: ${({ theme }) => theme.bg};
`;
const Wrapper = styled.div`
  padding: 22px 32px;
`;

const Loading = styled.h2`
  dispaly: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.text};
`;

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const { currentUser, loading, cookie } = useSelector((state) => state.user);

  console.log("document.cookie =", Cookies.get("access_toekn"));
  console.log("Cookie = ", cookie);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      {/* <h1>React cookies</h1>
      <hr />
      COOKIE {cookie && <p> {cookie}</p>} */}
      <Container>
        <BrowserRouter>
          <Menu darkMode={darkMode} setDarkMode={setDarkMode} />
          <Main>
            <Navbar />
            {loading && <Loading> Loading ... </Loading>}
            <Wrapper>
              <Routes>
                <Route path="/">
                  <Route index element={<Home type="random" />} />
                  <Route path="trends" element={<Home type="trend" />} />
                  <Route path="subscriptions" element={<Home type="sub" />} />
                  <Route path="history" element={<WatchHistory />} />

                  <Route path="search" element={<Search />} />
                  <Route
                    path="signin"
                    element={cookie ? <Home /> : <SignIn />}
                  />
                  <Route path="video">
                    <Route path=":id" element={<Video />} />
                  </Route>
                  <Route path="channel/:id" element={<Channel />}></Route>
                </Route>
              </Routes>
            </Wrapper>
          </Main>
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  );
}

export default App;
