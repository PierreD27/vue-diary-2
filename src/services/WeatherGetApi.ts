import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://api.weatherapi.com/v1',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export async function getDaysData(cityName = 'Bishkek') {
  try {
    const response = await apiClient.get(
      '/forecast.json?key=6889ae3cbf4149768bc51301240103&q=' + cityName + '&days=8'
    )
    return response.data
  } catch (error) {
    //alert('City is not found')
    const response = await apiClient.get(
      '/forecast.json?key=6889ae3cbf4149768bc51301240103&q=bishkek&days=8'
    )
    return response.data
  }
}
