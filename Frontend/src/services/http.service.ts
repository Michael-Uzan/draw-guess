import Axios from 'axios'

const BASE_URL = process.env.NODE_ENV === 'production'
    ? '/api/'
    : '//localhost:3030/api/'


var axios = Axios.create({
    withCredentials: true
})

export const httpService = {
    get(endpoint: string, data: any) {
        return ajax(endpoint, 'GET', data)
    },
    post(endpoint: string, data: any) {
        return ajax(endpoint, 'POST', data)
    },
    put(endpoint: string, data: any) {
        return ajax(endpoint, 'PUT', data)
    },
    delete(endpoint: string, data: any) {
        return ajax(endpoint, 'DELETE', data)
    }
}

async function ajax(endpoint: string, method: any = 'GET', data: any | null = null): Promise<any> {
    try {
        const res = await axios({
            url: `${BASE_URL}${endpoint}`,
            method,
            data,
            params: (method === 'GET') ? data : null
        })
        return res.data
    } catch (err: any) {
        console.log(`Had Issues ${method}ing to the backend, endpoint: ${endpoint}, with data: ${data}`)
        console.dir(err)
        if (err.response && err.response.status === 401) {
            window.location.assign('/')
        }
        throw err
    }
}

