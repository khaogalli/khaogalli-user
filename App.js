import React, { useState } from "react";
import Api from "./src/ApiManager";
import Home from "./src/screens/Home";
import Restaurants from "./src/screens/Restaurant";
import Signin from "./src/screens/Signin";
import Signup from "./src/screens/Signup";

const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  Api.onAuthChange = setIsSignedIn;
  return isSignedIn ? <Home /> : <Restaurant />;
};

export default App;
