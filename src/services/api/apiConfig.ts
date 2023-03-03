//  Dependencies
import axios from "axios"
//  Components
const API_BASE = process.env.API_BASE

export const Api = () => {
    return axios.create({
        baseURL: API_BASE
    })
}