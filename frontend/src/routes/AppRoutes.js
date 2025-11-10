// src/routes/AppRoutes.js
import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Loader from "../components/Loader";
import Browse from '../pages/Browse';
import Watchlist from '../pages/Watchlist';

// Lazy loading other pages
const Home = lazy(() => import("../pages/Home"));
const Movies = lazy(() => import("../pages/Movies"));
const TvSeries = lazy(() => import("../pages/TvSeries"));
const Anime = lazy(() => import("../pages/Anime"));
const SignIn = lazy(() => import("../pages/SignIn"));
const SignUp = lazy(() => import("../pages/SignUp"));
// Add Watch and NotFound routes
const Watch = lazy(() => import("../pages/Watch"));
const NotFound = lazy(() => import("../pages/NotFound"));

const AppRoutes = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/tvshows" element={<TvSeries />} />
        <Route path="/anime" element={<Anime />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/browse" element={<Browse />} />

        {/* Watch detail route used by MovieCarousal (navigate('/watch/:id')) */}
        <Route path="/watch/:id" element={<Watch />} />
        <Route path="/watchlist" element={<Watchlist />} />

        {/* 404 fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
