import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Filter } from "./features/filter/Filter";
import { Header } from "./components/Header";
import { HeroTitle } from "./components/HeroTitle";
import { Footer } from "./components/Footer";
import { QuizAns } from "./features/quiz/QuizAns";
import { QuizResult } from "./features/result/QuizResult";

import "./App.css";
// import { Quiz } from './features/quiz/Quiz';

function App() {
  return (
    <div className="App">
      <Router>
          <Header />
        <Switch>
          <Route exact path="/">
            <HeroTitle />
            <Filter />
            <QuizAns />
            <Footer />
          </Route>

          <Route path="/result">
            <QuizResult />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
