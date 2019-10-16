import axios from "axios";

export default function axiosAuthAccess() {

    return axios.create({
        baseURL: "http://localhost:5000",
        headers: {
            Authorization: localStorage.getItem("token")
        }
    })
} 