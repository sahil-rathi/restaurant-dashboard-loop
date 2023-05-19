
const loginHandler = async (
  username: string | undefined,
  password: string | undefined
) => {
  if (!username || !password) {
    return { message: "Something went wrong" };
  }
  const params = new URLSearchParams({
    view: "Grid view",
    filterByFormula: `AND(username="${username}",password="${password}")`,
  });
  
  const response = await fetch(
    `https://api.airtable.com/v0/${process.env.REACT_APP_LOGIN_ID}/credenitals?` +
      params,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_BEARER_TOKEN}`,
      },
    }
  );
  try {
    const data = await response.json();
    return data.records?.length > 0
      ? data.records[0]
      : { message: "Incorrect credentials" };
  } catch (error) {
    console.log(error);
  }
};

const logoutHandler = async () => {
  let cookie = JSON.parse(getCookie("cookie") || "{}");
  if (cookie) {
    cookie = { ...cookie, user: "" };
  }
  setCookie("cookie", JSON.stringify(cookie));
};

const setCookie = (key: string, value: string) => {
  document.cookie = `${key}=${value}`;
};

const getCookie = (key: string) => {
  const cookie = document.cookie.split(";").find((cookie) => {
    return cookie.includes(key);
  });
  return cookie?.split("=")[1];
};

const restrauntsList = async () => {
  const params = new URLSearchParams({
    view: "Grid view",
  });
  try {
    const response = await fetch(
      `https://api.airtable.com/v0/${process.env.REACT_APP_LOGIN_ID}/restaurants?` +
        params,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_BEARER_TOKEN}`,
        },
      }
    );
    const data = await response.json();
    return data.records;
  } catch (error) {
    console.log(error);
  }
};
export { loginHandler, logoutHandler, setCookie, getCookie, restrauntsList };
