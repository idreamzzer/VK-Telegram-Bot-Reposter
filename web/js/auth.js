window.auth = (() => {
  async function login({ username, password }) {
    try {
      const rawResponse = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      });
      const data = await rawResponse.json();
      console.log(data);
      if (data.success && data.token) {
        localStorage.setItem("token", JSON.stringify(data.token));
        location.replace("/settings");
      }
    } catch (err) {
      console.log(err);
    }
  }
  async function handleAuth() {
    const content = document.body.innerHTML;
    document.body.innerHTML = "Not logged";
    let logged = await isLogged();
    if (logged) {
      document.body.innerHTML = content;
      return true;
    }
    location.replace("/");
    return false;

    async function isLogged() {
      const token = JSON.parse(localStorage.getItem("token"));
      const bearerToken = `Bearer ${token}`;
      if (token) {
        const rawResp = await fetch("/is-logged", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: bearerToken
          }
        });
        const data = await rawResp.json();
        if (data.status === "success") {
          return true;
        }
      }
      return false;
    }
  }

  function getToken() {
    return JSON.parse(localStorage.getItem("token"));
  }

  return {
    login,
    handleAuth,
    getToken
  };
})();
