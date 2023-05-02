import React, { useEffect } from "react";
import { Helmet } from "react-helmet";

import NavBar from "./components/NavBar/NavBar";
import "./App.scss";

function App() {
  useEffect(() => {
    <Helmet>
      <meta charSet="utf-8" />
      <title>Jaime Villanua De Juan Portfolio</title>
    </Helmet>;
  }, []);
  return (
    <>
      <NavBar />
    </>
  );
}

export default App;
