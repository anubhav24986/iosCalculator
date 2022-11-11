import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

axios.defaults.headers.common = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    // "Access-Control-Request-Headers": 'Content-Type'
}

axios.interceptors.request.use(handleRequestInterception)
axios.interceptors.response.use(
    handleResponseInterception,
    handleResponseErrorInterception
)
//only post method here we can create other also in this class
class ApiService {
    public baseURL: string;

    constructor(baseURL: string) {
        this.baseURL = baseURL;
    }

    post(resource: string, body: object = {}): any {
        //console.log("api service ::",resource,body);
        return axios.post(resource, body);
    }
}

function handleRequestInterception(config: any): Promise<AxiosRequestConfig> {
    return config
}

function handleResponseInterception(response: any): AxiosResponse<any> {
    return response && response.data;
}

function handleResponseErrorInterception({ response }: any): any {
   
    throw { error: response };
}

export default ApiService
