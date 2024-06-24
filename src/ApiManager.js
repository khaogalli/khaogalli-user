import Signup from "./screens/Signup";

class ApiManager {
  onAuthChange;
  Info = {
    username: "",
    regnum: "",
    tocken: "",
    profilePic: "",
  };
  restaurantList = [];

  login(username, regnum, password) {
    const message = {
      username: username,
      regnum: regnum,
      password: password,
    };
    try {
      const response = fetch("http://192.168.23.201:8080/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      });
      data = response.JSON();
      this.Info.username = data.username;
      this.Info.regnum = data.regnum; // regnum is userID
      this.Info.tocken = data.tocken;
      this.Info.profilePic = data.profilePic;
      if (data.successful) {
        this.onAuthChange(true);
      } else {
        this.onAuthChange(false);
      }
    } catch (error) {
      console.error("Error:", error);
    }
    this.onAuthChange(true);
  }

  Signup(username, regnum, password) {
    const message = {
      username: username,
      regnum: regnum,
      password: password,
    };
    try {
      const response = fetch("http://192.168.23.201:8080/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      });
      data = response.JSON();
      this.Info.username = data.username;
      this.Info.regnum = data.regnum; // regnum is userID
      this.Info.tocken = data.tocken;
      if (data.successful) {
        this.onAuthChange(true);
      } else {
        this.onAuthChange(false);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  Home(username, regnum, tocken) {
    const message = {
      username: username,
      regnum: regnum,
      tocken: tocken,
    };
    try {
      const response = fetch("http://http://192.168.23.201:8080/signup", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      });
      data = response.JSON();
      this.restaurantList = data.restaurants;
    } catch (error) {
      console.error("Error:", error);
    }
  }



}

Api = new ApiManager();
export default Api;
