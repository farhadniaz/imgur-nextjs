import axios from 'axios';
import getConfig from 'next/config'

const {  publicRuntimeConfig } = getConfig();
const $axios = axios.create({
    baseURL:publicRuntimeConfig.BASE_API_URL
});

export default $axios;