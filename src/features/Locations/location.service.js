import myApi from "../../network/axios";

export const getCompany = () => {
    return new Promise((resolve, reject) => {
        myApi
            .get("/api/company/")
            .then((response) => resolve(response))
            .catch((err) => reject(err));
    });
};
