const getNewAccessToken = async (refreshToken) => {
    try {
        const response = await fetch("https://dummyjson.com/auth/refresh", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                refreshToken: refreshToken,
                expiresInMins: 1,
            }),
        });
        return await response.json();
    } catch (error) {
        console.log(error);
    }
};

export { getNewAccessToken };
