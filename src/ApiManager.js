class ApiManager {
    onAuthChange;
    login(username, regnum, password) {
        const message = {
            username: username,
            regnum: regnum,
            password: password,
        };
        console.log("test api");
        /*try {
            const response = fetch("http://192.168.23.201:8080/signin", {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(message),
            });
            data = response.JSON();
            if (data.successful) {
                this.onAuthChange(true);
            }
        } catch (error) {
            console.error("Error:", error);
        }*/
        this.onAuthChange(true);

    }
}

Api = new ApiManager();
export default Api;