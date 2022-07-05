import myApi from "../../network/axios";

export const login = (username, password) => async () => {
    const { data } = await myApi.post("api/auth/login/", {
        username,
        password,
    });
    localStorage.setItem("userInfo", JSON.stringify(data.data));
    // dispatch(slice.actions.login(data.data));
};

export const loginUser = (username, password) => {
    return new Promise((resolve, reject) => {
        myApi
            .post("api/auth/login/", {
                username,
                password,
            })
            .then((response) => resolve(response))
            .catch((err) => reject(err));
    });
};
