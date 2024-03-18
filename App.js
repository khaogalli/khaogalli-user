import React, { useState } from "react";
import Api from "./src/ApiManager";
import Home from "./src/screens/Home";
import Signin from "./src/screens/Signin";
import Signup from "./src/screens/Signup";

const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  Api.onAuthChange = setIsSignedIn;
  return (
    isSignedIn ?
      (<Home />) : (<Signin />)
  )
}

export default App;