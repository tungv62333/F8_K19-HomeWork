const getCurrentAuthUser = async (accessToken) => {
    try {
        const response = await fetch("https://dummyjson.com/auth/me", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return await response.json();
    } catch (error) {
        console.log(error);
    }
};

export { getCurrentAuthUser };
