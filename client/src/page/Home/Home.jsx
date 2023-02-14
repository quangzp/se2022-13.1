import { useState } from 'react';
import { toast } from 'react-toastify';
import './index.css'
import { login } from './Service/BinanceService';
const Home = () => {

    const [btcQuantity, setBtcQuantity] = useState();
    const [ethQuantity, setEthQuantity] = useState();
    const [bnbQuantity, setBnbQuantity] = useState();

    const [apiKey, setApiKey] = useState();
    const [secretKey, setSecretKey] = useState();

    const submitHandle = async (apiKey, secretKey) => {
        if (!apiKey || !secretKey) {
            toast.error("Please enter key!")
            return;
        }
        const data = await login({ key: apiKey, secret: secretKey });
        console.log(data);
        return data;

    }
    const buyHandle = (coin, quantity, apiKey, secretKey) => {
        if (!quantity || !apiKey || !secretKey) {
            toast.error("Please fully fill!")
        }
        if (!quantity){
            toast.error("Please enter quantity!")
        }
        else {
            const data = {
                key: apiKey,
                secret: secretKey,
                symbol: coin,
                quantity: quantity,
            }
            console.log(data)
        }

    }

    const sellHandle = (coin, quantity, apiKey, secretKey) => {
        if (!quantity || !apiKey || !secretKey) {
            toast.error("Please fully fill!")
        }
        if (!quantity){
            toast.error("Please enter quantity!")
        }
        else {
            const data = {
                key: apiKey,
                secret: secretKey,
                symbol: coin,
                quantity: quantity,
            }
        }
    }

    const autoInvestHandle = (coin, quantity, apiKey, secretKey) => {
        if (!quantity || !apiKey || !secretKey) {
            toast.error("Please fully fill!")
        }
        if (!quantity){
            toast.error("Please enter quantity!")
        }
        else {
            const data = {
                key: apiKey,
                secret: secretKey,
                symbol: coin,
                quantity: quantity,
            }
        }
    }

    return (
        <div>
            <div className='key-form'>
                <div className='key-input'>
                    <span>API key</span>
                    <input className='input-key' type="text" placeholder='Enter API Key' onChange={(e) => setApiKey(e.target.value)} />
                </div>
                <div className='key-input'>
                    <span>Secret key</span>
                    <input className='input-key' type="text" placeholder='Enter Secret Key' onChange={(e) => setSecretKey(e.target.value)} />
                </div>
                <div className='key-button'>
                    <button className='btn btn-warning' onClick={() => submitHandle(apiKey,secretKey)}>Confirm</button>
                </div>
            </div>
            <div className='table-container'>
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th>
                                <div className='product-col'>Product</div>
                            </th>
                            <th>
                                <div className='history-col'>History</div>
                            </th>
                            <th>
                                <div className='quantity-col'>Quantity</div>
                            </th>
                            <th>
                                <div className='action-col'>Action</div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <div>BTC</div>
                            </td>
                            <td>
                                <button class="btn btn-warning">Chart</button>
                            </td>
                            <td>
                                <input className='quantity-input' type="number" min="0" placeholder='buy, sell/auto invest per time' onChange={(e) => setBtcQuantity(e.target.value)} />
                            </td>
                            <td>
                                <div className='action-col'>
                                    <button class="btn btn-warning btn-action" onClick={() => buyHandle("BTC", btcQuantity, apiKey, secretKey)}>Buy</button>
                                    <button class="btn btn-warning btn-action" onClick={() => sellHandle("BTC", btcQuantity, apiKey, secretKey)}>Sell</button>
                                    <button class="btn btn-warning btn-action" onClick={() => autoInvestHandle("BTC", btcQuantity, apiKey, secretKey)}>Auto Invest</button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div>ETH</div>
                            </td>
                            <td>
                                <button class="btn btn-warning">Chart</button>
                            </td>
                            <td>
                                <input className='quantity-input' type="number" placeholder='buy, sell/auto invest per time' onChange={(e) => setEthQuantity(e.target.value)} />
                            </td>
                            <td>
                                <div className='action-col'>
                                    <button class="btn btn-warning btn-action" onClick={() => buyHandle("ETH", ethQuantity, apiKey, secretKey)}>Buy</button>
                                    <button class="btn btn-warning btn-action" onClick={() => sellHandle("ETH", ethQuantity, apiKey, secretKey)}>Sell</button>
                                    <button class="btn btn-warning btn-action" onClick={() => autoInvestHandle("ETH", ethQuantity, apiKey, secretKey)}>Auto Invest</button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div>BNB</div>
                            </td>
                            <td>
                                <button class="btn btn-warning">Chart</button>
                            </td>

                            <td>
                                <input className='quantity-input' type="number" placeholder='buy, sell/auto invest per time' onChange={(e) => setBnbQuantity(e.target.value)} />
                            </td>
                            <td>
                                <div className='action-col'>
                                    <button class="btn btn-warning btn-action" onClick={() => buyHandle("BNB", bnbQuantity, apiKey, secretKey)}>Buy</button>
                                    <button class="btn btn-warning btn-action" onClick={() => sellHandle("BNB", bnbQuantity, apiKey, secretKey)}>Sell</button>
                                    <button class="btn btn-warning btn-action" onClick={() => autoInvestHandle("BNB", bnbQuantity, apiKey, secretKey)}>Auto Invest</button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

    )
}

export default Home;