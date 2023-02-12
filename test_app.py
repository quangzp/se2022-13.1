from binance.spot import Spot as Client
from binance.enums import *
from flask import Flask, render_template, request, redirect, flash, jsonify, make_response
import config

# Get server timestamp
# print(client.time())
# Get klines of BTCUSDT at 1m interval
# print(client.klines("BTCUSDT", "1m"))
# # Get last 10 klines of BNBUSDT at 1h interval
# print(client.klines("BNBUSDT", "1h", limit=10))
# print(float(client.account()['balances'][6]['free']) - 1.0)
BASE_URL = 'https://testnet.binance.vision'
app = Flask(__name__)
app.secret_key = "2023@@2023"

@app.route("/")
def index():
    client = Client(base_url = BASE_URL, key = config.API_KEY, secret = config.API_SECRET)
    info = client.account()
    
    balances = info['balances']
    return render_template('index.html', balances = balances)

@app.route("/buy", methods=['POST'])
def buy():
    try:
        data = request.get_json()
        client = Client(base_url = BASE_URL, key = config.API_KEY, secret = config.API_SECRET)
        
        order = client.new_order(
            symbol=data['symbol'], 
            side = SIDE_BUY,
            type=  ORDER_TYPE_MARKET,
            quantity=data['quantity'])
        
    except Exception as e:
        return make_response("error", 500)

    return make_response(order, 200)

@app.route("/sell", methods=["GET", "POST"])
def sell():
    try:
        req = request.get_json()
        
        client = Client(base_url = BASE_URL, key = config.API_KEY, secret = config.API_SECRET)
        order = client.create_test_order(
            symbol = req['symbol'], 
            side= SIDE_SELL,
            type= ORDER_TYPE_MARKET,
            quantity = req['quantity'])
        
    except Exception as e:
        flash(e.message, "error")

    return make_response("",200)

@app.route("/settings")
def settings():
    return "settings"

@app.route("/history")
def history():
    candlesticks = client.get_historical_klines("BTCUSDT", Client.KLINE_INTERVAL_1MINUTE)

    processed_candlesticks = []

    for data in candlesticks:
        candlestick = { 
            "time": data[0] / 1000, 
            "open": data[1],
            "high": data[2], 
            "low": data[3], 
            "close": data[4]
        }

        processed_candlesticks.append(candlestick)

    return jsonify(processed_candlesticks)
