import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import Show from "../components/Show";
export default (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/homepage/show" component={Show} />
    </Routes>
  </Router>
);