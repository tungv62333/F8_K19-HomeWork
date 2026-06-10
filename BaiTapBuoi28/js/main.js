import { postLogin } from "../api/postLogin.js";

const loginForm = document.getElementById("login-form");

const login = async (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    username.replaceAll("<", "&lt;").replaceAll(">", "&gt;");
    password.replaceAll("<", "&lt;").replaceAll(">", "&gt;");

    const response = await postLogin(username, password);

    const { accessToken, refreshToken } = response;

    if (accessToken && refreshToken) {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        window.location.href = "pages/profile.html";
    } else alert("Invalid password");
};

loginForm.addEventListener("submit", login);
