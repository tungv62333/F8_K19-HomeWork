const postLogin = async (username, password) => {
    try {
        const response = await fetch(`https://dummyjson.com/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: username,
                password: password,
                expiresInMins: 1,
            }),
        });
        return await response.json();
    } catch (error) {
        console.log(error);
    }
};

export { postLogin };
