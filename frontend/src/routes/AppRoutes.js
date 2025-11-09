// src/routes/AppRoutes.js
import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Loader from "../components/Loader";

// Lazy loading
const Home = lazy(() => import("../pages/Home"));
const Movies = lazy(() => import("../pages/Movies"));
const TvSeries = lazy(() => import("../pages/TvSeries"));
const Anime = lazy(() => import("../pages/Anime"));
const SignIn = lazy(() => import("../pages/SignIn"));
const SignUp = lazy(() => import("../pages/SignUp"));

const AppRoutes = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/tv" element={<TvSeries />} />
        <Route path="/anime" element={<Anime />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
