import axios from "axios";

const apiClient = axios.create({
    baseURL: 'http://api.weatherapi.com/v1',
    withCredentials:false,
    headers:{
        Accept: 'application/json',
        'Content-Type': 'application/json',
    }
})

export default{
    getCurentDayData(){
        return apiClient.get('/current.json?key=2cacdf679ade4b979d471305241302&q=Bishkek')
    },
}
