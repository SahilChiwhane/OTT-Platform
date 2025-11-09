import React from "react";
import { Route, Routes } from "react-router-dom";
import Movies from "./pages/Movies";
import TvSeries from "./pages/TvSeries";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import Anime from "./pages/Anime";
import VideoPlayer from "./components/VideoPlayer";
import MovieDetail from "./components/MovieDetail";
import TvShowDetail from "./components/TvShowDetail";
import AnimeDetail from "./components/AnimeDetail";
// import { AuthContextProvider } from "./context/AuthContext";

const App = () => {
  return (
    // <AuthContextProvider>
      <Routes>
        {/* SIGN UP */}
        <Route path="/signup" element={<SignUp />} />

        {/* SIGN IN */}
        <Route path="/signin" element={<SignIn />} />

        {/* HOME */}
        <Route path="/" element={<Home />} />

        {/* MOVIES */}
        <Route path="/movies" element={<Movies />} />
        <Route path="/video/:id" element={<VideoPlayer />} />
        <Route path="/movie/:id" element={<MovieDetail />} />

        {/* TV SHOWS */}
        <Route path="/tvShows" element={<TvSeries />} />
        <Route path="/tv/:id" element={<TvShowDetail />} />

        {/* ANIME */}
        <Route path="/anime" element={<Anime />} />
        <Route path="/anime/:id" element={<AnimeDetail />} />
      </Routes>
    // </AuthContextProvider>
  );
};

export default App;
