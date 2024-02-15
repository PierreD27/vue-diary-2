import axios from "axios";

const apiClient = axios.create({
    baseURL: 'http://api.weatherapi.com/v1',
    withCredentials:false,
    headers:{
        Accept: 'application/json',
        'Content-Type': 'application/json',
    }
})


export async function getDaysData(){
    const response = await apiClient.get('/forecast.json?key=2cacdf679ade4b979d471305241302&q=Bishkek&days=8')
    return response.data
}

