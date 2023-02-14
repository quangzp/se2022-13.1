from binance.spot import Spot as Client
from binance.enums import *
from flask import Flask, render_template, request, redirect, flash, jsonify, make_response
from flask_cors import CORS
from flask_socketio import SocketIO, emit
import bot, threading, modal


# print(client.klines("BTCUSDT", "1m"))
# # Get last 10 klines of BNBUSDT at 1h interval
# print(client.klines("BNBUSDT", "1h", limit=10))
# print(float(client.account()['balances'][6]['free']) - 1.0)
BASE_URL = 'https://testnet.binance.vision'
clients = {}
bots = {}
app = Flask(__name__)
CORS(app)
# socketio = SocketIO(app, cors_allowed_origins="*")
app.secret_key = "2023@@2023"

@app.route('/')
def index():
    render_template('index.html')

@app.route("/login", methods=['POST'])
def login():
    data = request.get_json()
    client = Client(base_url = BASE_URL, key = data['key'], secret = data['secret'])
    try:
        client.account()
    except:
        return make_response("un_authentication", 401)
    
    custom_client = modal.ClientCustom(client)
    clients[custom_client.uuid] = client
    
    message = {"uuid" : custom_client.uuid}
    return jsonify(message)

@app.route("/buy", methods=['POST'])
def buy():
    try:
        data = request.get_json()
        client = clients.get(data['uuid'])
        
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
        data = request.get_json()
        
        client = clients.get(data['uuid'])
        order = client.create_test_order(
            symbol = req['symbol'], 
            side= SIDE_SELL,
            type= ORDER_TYPE_MARKET,
            quantity = req['quantity'])
        
    except Exception as e:
        flash(e.message, "error")

    return make_response("",200)

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

@app.route("/start-bot", methods=["POST"])
def start_bot():
    data = request.get_json()
    client  = clients.get(data['uuid'])
    if client is not None:
        print ("No client")
    b = bot.TradeBot(client, 'BNBUSDT')
    bots[data['uuid']] = b
    thread = threading.Thread(target=b.run)
    thread.start()
    return make_response("run",200)

@app.route("/kill-bot", methods=["POST"])
def kill_bot():
    data = request.get_json()
    bot = bots.get(data['uuid'])
    bot.canceled = True
    return make_response("stop",200)
    

# if __name__ == '__main__':
#     socketio.run(app)