import * as React from "react";
import {Routes, Route} from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import ArticlePage from "./pages/ArticlePage";
import './assets/styles/main.scss';

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="specifiedArticles/:id" element={<ArticlePage/>}/>
      </Routes>
    </div>
  );
};

export default App;
