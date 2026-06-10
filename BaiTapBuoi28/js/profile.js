import { getCurrentAuthUser } from "../api/getCurrentAuthUser.js";
import { renderProfile } from "../utils/renderProfile.js";
import { getNewAccessToken } from "../api/getNewAccessToken.js";

const getProfile = async () => {
    try {
        let accessToken = localStorage.getItem("accessToken");
        let refreshToken = localStorage.getItem("refreshToken");

        if (!accessToken || !refreshToken) {
            window.location.href = "../index.html";
            return;
        }

        let user = await getCurrentAuthUser(accessToken);

        if (user.message === "Token Expired!") {
            const response = await getNewAccessToken(refreshToken);
            console.log(response);

            accessToken = response.accessToken;
            refreshToken = response.refreshToken;

            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);

            user = await getCurrentAuthUser(accessToken);
        }
        renderProfile(user);
    } catch (error) {
        console.log(error);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "../index.html";
    }
};

getProfile();
