import { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import './index.css'
import { buy, login, sell, startBot, stopBot } from './Service/BinanceService';

const Home = () => {
    const [btcBot, setBtcBot] = useState(false);
    const [ethBot, setEthBot] = useState(false);
    const [bnbBot, setBnbBot] = useState(false);

    const [btcQuantity, setBtcQuantity] = useState();
    const [ethQuantity, setEthQuantity] = useState();
    const [bnbQuantity, setBnbQuantity] = useState();

    const [apiKey, setApiKey] = useState();
    const [secretKey, setSecretKey] = useState();
    const [uuid, setUuid] = useState();

    const submitHandle = async (apiKey, secretKey) => {
        if (!apiKey || !secretKey) {
            toast.error("Please enter key!")
            return;
        }
        const data = await login({ key: apiKey, secret: secretKey })
        if (!data.uuid) {
            toast.error("Error!")
        } else {
            setUuid(data.uuid);
            toast.success("Success!")
        }
        console.log(data)
        return;
    }
    const buyHandle = async (coin, quantity, uuid) => {
        if (!quantity || !uuid) {
            toast.error("Please fully fill!")
        }
        else if (!quantity) {
            toast.error("Please enter quantity!")
        }
        else {
            const number = Number(quantity)
            const data = await buy({ uuid: uuid, symbol: coin, quantity: number })
            if (data === 200) {
                toast.success("Successfully purchase!")
            } else {
                toast.error("Purchase failed!")
            }
            console.log(data)
        }

    }

    const sellHandle = async (coin, quantity, uuid) => {
        if (!quantity || !uuid) {
            toast.error("Please fully fill!")
        }
        else if (!quantity) {
            toast.error("Please enter quantity!")
        }
        else {
            const number = Number(quantity)
            const data = await sell({ uuid: uuid, symbol: coin, quantity: number })
            if (data === 200) {
                toast.success("Successfully sell!")
            } else {
                toast.error("Sell failed!")
            }
            console.log(data)
        }

    }

    const runBotHandle = async (coin, quantity, uuid) => {
        if (!quantity || !uuid) {
            toast.error("Please fully fill!")
        }
        if (!quantity) {
            toast.error("Please enter quantity!")
        }
        else {
            const number = Number(quantity)
            console.log(uuid)
            const data = await startBot({ uuid: uuid, symbol: coin, quantity: number })
            if (data === 200) {
                if(coin === "BTCUSDT") {
                    setBtcBot(true)
                }
                if(coin === "BNBUDSDT") {
                    setBnbBot(true)
                }
                if(coin === "ETHUSDT") {
                    setEthBot(true)
                }
                toast.success("Bot is started!")
                
            } else {
                toast.error("Error!")
            }
        }
    }

    const stopBotHandle = async (uuid) => {
        const data = await stopBot({ uuid: uuid })
        if (data === 200) {
            setBtcBot(false);
            setBnbBot(false);
            setEthBot(false);
            toast.success("Bot is stop!")
        } else {
            toast.error("Error!")
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
                    <button className='btn btn-warning' onClick={() => submitHandle(apiKey, secretKey)}>Confirm</button>
                </div>
            </div>
            <div className='table-container'>
                <table class="table table-hover">
                    <thead>
                        <tr style={{ backgroundColor: "#EDEDED" }}>
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
                            <th>
                                <div>Balance</div>
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
                                <input className='quantity-input' type="number" min="0" placeholder='buy/sell' onChange={(e) => setBtcQuantity(e.target.value)} />
                            </td>
                            <td>
                                <div className='action-col'>
                                    <button class="btn btn-warning btn-action" onClick={() => buyHandle("BTCUSDT", btcQuantity, uuid)}>Buy</button>
                                    <button class="btn btn-warning btn-action" onClick={() => sellHandle("BTCUSDT", btcQuantity, uuid)}>Sell</button>
                                    {!btcBot ? <button class="btn btn-warning btn-action btn-bot" onClick={() => runBotHandle("BTCUSDT", btcQuantity, uuid)}>Run Bot</button> :<button class="btn btn-danger btn-action" onClick={() => stopBotHandle(uuid)}>Stop Bot</button>}
                                </div>
                            </td>
                            <td>
                                <div>0</div>
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
                                <input className='quantity-input' type="number" placeholder='buy/sell' onChange={(e) => setEthQuantity(e.target.value)} />
                            </td>
                            <td>
                                <div className='action-col'>
                                    <button class="btn btn-warning btn-action" onClick={() => buyHandle("ETHUSDT", ethQuantity, uuid)}>Buy</button>
                                    <button class="btn btn-warning btn-action" onClick={() => sellHandle("ETHUSDT", ethQuantity, uuid)}>Sell</button>
                                    {!ethBot ? <button class="btn btn-warning btn-action btn-bot" onClick={() => runBotHandle("ETHUSDT", ethQuantity, uuid)}>Run Bot</button> :<button class="btn btn-danger btn-action" onClick={() => stopBotHandle(uuid)}>Stop Bot</button>}
                                </div>
                            </td>
                            <td>
                                <div>0</div>
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
                                <input className='quantity-input' type="number" placeholder='buy/sell' onChange={(e) => setBnbQuantity(e.target.value)} />
                            </td>
                            <td>
                                <div className='action-col'>
                                    <button class="btn btn-warning btn-action" onClick={() => buyHandle("BNBUSDT", bnbQuantity, uuid)}>Buy</button>
                                    <button class="btn btn-warning btn-action" onClick={() => sellHandle("BNBUSDT", bnbQuantity, uuid)}>Sell</button>
                                    {!bnbBot ? <button class="btn btn-warning btn-action btn-bot" onClick={() => runBotHandle("BNBUSDT", bnbQuantity, uuid)}>Run Bot</button> :<button class="btn btn-danger btn-action" onClick={() => stopBotHandle(uuid)}>Stop Bot</button>}
                                </div>
                            </td>
                            <td>
                                <div>0</div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

    )
}

export default Home;