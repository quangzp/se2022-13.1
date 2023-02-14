import axios from 'axios';

export const login = async ({key, secret}) => {
    const url = 'http://127.0.0.1:5000/login'
    try {
        const res = await axios.post(url, { key, secret })
        return res.data;
    } catch {
        return;
    }

}