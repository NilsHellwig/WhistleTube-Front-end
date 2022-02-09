export async function checkAuth() {
  const auth = await fetch("http://127.0.0.1:4001/check_auth", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: localStorage.getItem("token") }),
  })
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result.token;
    })
    .catch((error) => {
      return false;
    });
  return auth;
}

export async function getAuthData() {
  const auth = await fetch("http://127.0.0.1:4001/check_auth", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: localStorage.getItem("token") }),
  })
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((error) => {
      return false;
    });
  return auth;
}
