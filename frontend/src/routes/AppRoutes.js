import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Loader from "../components/Loader";

import Browse from '../pages/Browse';
import Wishlist from "../pages/Wishlist"; // single import

// Lazy load heavy pages
const Home = lazy(() => import("../pages/Home"));
const Movies = lazy(() => import("../pages/Movies"));
const TvSeries = lazy(() => import("../pages/TvSeries"));
const Anime = lazy(() => import("../pages/Anime"));
const SignIn = lazy(() => import("../pages/SignIn"));
const SignUp = lazy(() => import("../pages/SignUp"));
const Watch = lazy(() => import("../pages/Watch"));
const NotFound = lazy(() => import("../pages/NotFound"));
const Search = lazy(() => import("../pages/Search"));

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
        <Route path="/watch/:id" element={<Watch />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/search" element={<Search />} />
        
        {/* 404 fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
