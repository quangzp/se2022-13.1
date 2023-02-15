import { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import './index.css'
import { buy, getBalance, login, sell, startBot, stopBot } from './Service/BinanceService';

const Home = () => {
    const [btcBot, setBtcBot] = useState(false);
    const [ethBot, setEthBot] = useState(false);
    const [bnbBot, setBnbBot] = useState(false);

    const [btcQuantity, setBtcQuantity] = useState();
    const [ethQuantity, setEthQuantity] = useState();
    const [bnbQuantity, setBnbQuantity] = useState();

    const [btcBalance, setBtcBalance] = useState(0);
    const [ethBalance, setEthBalance] = useState(0);
    const [bnbBalance, setBnbBalance] = useState(0);

    const [apiKey, setApiKey] = useState();
    const [secretKey, setSecretKey] = useState();
    const [uuid, setUuid] = useState();

    const [isConfimed, setIsConfermed] = useState(false);

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
            setIsConfermed(true);
            setBtcBalance(data.balances[1].free);
            setEthBalance(data.balances[2].free);
            setBnbBalance(data.balances[0].free);
            toast.success("Success!")
        }
        console.log(data)
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
            const balance = await getBalance({ uuid: uuid })
            console.log(balance)
            setBtcBalance(balance[1].free);
            setEthBalance(balance[2].free);
            setBnbBalance(balance[0].free);
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
                const balance = await getBalance({ uuid: uuid })
                console.log(balance)
                setBtcBalance(balance[1].free);
                setEthBalance(balance[2].free);
                setBnbBalance(balance[0].free);
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
            console.log(data)
            if (data === 200) {
                if (coin === 'BTCUSDT') {
                    setBtcBot(true)
                }
                if (coin === 'BNBUSDT') {
                    setBnbBot(true)
                }
                if (coin === 'ETHUSDT') {
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
            toast.success("Bot is stoped!")
        } else {
            toast.error("Error!")
        }
    }

    const handleGetBalances = async (uuid) => {
        const balances = await getBalance({ uuid: uuid })
        setBtcBalance(balances[1].free);
        setEthBalance(balances[2].free);
        setBnbBalance(balances[0].free);
        toast.success("Succesfully get balances!")
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
                    {isConfimed ? <button className='btn btn-warning btn-submitform' onClick={() => handleGetBalances(uuid)}>Get Balances</button> : <button className='btn btn-warning btn-submitform' onClick={() => submitHandle(apiKey, secretKey)}>Confirm</button>}
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
                                <input className='quantity-input' type="number" min="0" placeholder='buy/sell' onChange={(e) => setBtcQuantity(e.target.value)} />
                            </td>
                            <td>
                                <div className='action-col'>
                                    <button class="btn btn-warning btn-action" onClick={() => buyHandle("BTCUSDT", btcQuantity, uuid)}>Buy</button>
                                    <button class="btn btn-warning btn-action" onClick={() => sellHandle("BTCUSDT", btcQuantity, uuid)}>Sell</button>
                                    {!btcBot ? <button class="btn btn-warning btn-action btn-bot" onClick={() => runBotHandle("BTCUSDT", btcQuantity, uuid)}>Run Bot</button> : <button class="btn btn-danger btn-action btn-bot" onClick={() => stopBotHandle(uuid)}>Stop Bot</button>}
                                </div>
                            </td>
                            <td>
                                <div>{btcBalance}</div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div>ETH</div>
                            </td>
                            <td>
                                <input className='quantity-input' type="number" placeholder='buy/sell' onChange={(e) => setEthQuantity(e.target.value)} />
                            </td>
                            <td>
                                <div className='action-col'>
                                    <button class="btn btn-warning btn-action" onClick={() => buyHandle("ETHUSDT", ethQuantity, uuid)}>Buy</button>
                                    <button class="btn btn-warning btn-action" onClick={() => sellHandle("ETHUSDT", ethQuantity, uuid)}>Sell</button>
                                    {!ethBot ? <button class="btn btn-warning btn-action btn-bot" onClick={() => runBotHandle("ETHUSDT", ethQuantity, uuid)}>Run Bot</button> : <button class="btn btn-danger btn-action btn-bot" onClick={() => stopBotHandle(uuid)}>Stop Bot</button>}
                                </div>
                            </td>
                            <td>
                                <div>{ethBalance}</div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div>BNB</div>
                            </td>
                            <td>
                                <input className='quantity-input' type="number" placeholder='buy/sell' onChange={(e) => setBnbQuantity(e.target.value)} />
                            </td>
                            <td>
                                <div className='action-col'>
                                    <button class="btn btn-warning btn-action" onClick={() => buyHandle("BNBUSDT", bnbQuantity, uuid)}>Buy</button>
                                    <button class="btn btn-warning btn-action" onClick={() => sellHandle("BNBUSDT", bnbQuantity, uuid)}>Sell</button>
                                    {!bnbBot ? <button class="btn btn-warning btn-action btn-bot" onClick={() => runBotHandle("BNBUSDT", bnbQuantity, uuid)}>Run Bot</button> : <button class="btn btn-danger btn-action btn-bot" onClick={() => stopBotHandle(uuid)}>Stop Bot</button>}
                                </div>
                            </td>
                            <td>
                                <div>{bnbBalance}</div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

    )
}

export default Home;