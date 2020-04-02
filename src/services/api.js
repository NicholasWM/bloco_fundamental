import axios from 'axios'
export const baseURL = 'https://raw.githubusercontent.com/NicholasWM/cc2020/master'
export default axios.create({
    baseURL
})
