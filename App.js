import React, { Profiler, useState } from "react";
import Api from "./src/ApiManager";
import Home from "./src/screens/Home";
import Restaurants from "./src/screens/Restaurants";
import Signin from "./src/screens/Signin";
import Signup from "./src/screens/Signup";
import Summary from "./src/screens/Summary";
import Profile from "./src/screens/Profile";
import ResHome from "./src/screens/ResHome";

const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  Api.onAuthChange = setIsSignedIn;
  return isSignedIn ? <Home /> : <Profile />;
};

export default App;
