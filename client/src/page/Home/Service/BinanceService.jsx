import axios from 'axios';

export const login = async ({ key, secret }) => {
    const url = 'http://127.0.0.1:5000/login'
    try {
        const res = await axios.post(url, { key, secret })
        return res.data;
    } catch (error) {
        return error.response.data.massage;
    }

}

export const buy = async ({ uuid, symbol, quantity }) => {
    const url = 'http://127.0.0.1:5000/buy'
    try {
        const res = await axios.post(url, { uuid, symbol, quantity })
        return res.status;
    } catch (error) {
        return error.response.data.massage;
    }
}

export const sell = async ({ uuid, symbol, quantity }) => {
    const url = 'http://127.0.0.1:5000/sell'
    try {
        const res = await axios.post(url, { uuid, symbol, quantity })
        return res.status
    } catch (error) {
        return error.response.data.massage;
    }
}

export const startBot = async ({ uuid, symbol, quantity }) => {
    const url = 'http://127.0.0.1:5000/start-bot'
    try {
        const res = await axios.post(url, { uuid, symbol, quantity })
        console.log(res.data);
        return res.status;
    } catch (error) {
        return error.response.data.massage;
    }
}

export const stopBot = async ({ uuid }) => {
    const url = 'http://127.0.0.1:5000/kill-bot'
    try {
        const res = await axios.post(url, { uuid })
        console.log(res.data);
        return res.status;
    } catch (error) {
        return error.response.data.massage;
    }
}
