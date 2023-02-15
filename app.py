from flask import Flask, render_template, request, redirect, flash, jsonify, make_response
from flask_cors import CORS
from flask_socketio import SocketIO
import bot, threading, modal
from threading import Lock


# print(client.klines("BTCUSDT", "1m"))
# # Get last 10 klines of BNBUSDT at 1h interval
# print(client.klines("BNBUSDT", "1h", limit=10))
# print(float(client.account()['balances'][6]['free']) - 1.0)

clients = {}
bots = {}
app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")
app.secret_key = "2023@@2023"

# thread = None
thread_lock = Lock()

def background_thread(client):
    print("Generating random sensor values")
    while True:
        socketio.emit(f'update_profit-{client.listen_key}', client.get_profit())
        socketio.sleep(2)
# @socketio.on('join')
# def connect(uuid):

@socketio.on('join')
def join(uuid):
    global thread
    global thread
    client = clients.get(uuid)
    
    if client is None:
        return
    
    with thread_lock:
        # if thread is None:
            socketio.start_background_task(background_thread, client)

@app.route("/login", methods=['POST'])
def login():
    data = request.get_json()
    custom_client = modal.CustomClient(data['key'], data['secret'])
    try:
        custom_client.my_client.account()
    except:
        return make_response("un_authentication", 401)
    
    clients[custom_client.uuid] = custom_client
    
    message = {"uuid" : custom_client.uuid, "listen_key" : custom_client.listen_key}
    return jsonify(message)

@app.route("/buy", methods=['POST'])
def buy():
    try:
        data = request.get_json()
        custom_client = clients.get(data['uuid'])
        order = custom_client.buy(data['symbol'], data['quantity'])
    except Exception as e:
        return make_response("error", 500)

    return make_response(order, 200)

@app.route("/sell", methods=["GET", "POST"])
def sell():
    try:
        data = request.get_json()
        custom_client = clients.get(data['uuid'])
        order = order = custom_client.sell(data['symbol'], data['quantity'])
    except Exception as e:
        flash(e.message, "error")

    return make_response(order,200)

# @app.route("/history")
# def history():
#     data = request.get_json()
#     candlesticks = clients.get(data['uuid']).klines("BTCUSDT", "1m")

#     processed_candlesticks = []

#     for data in candlesticks:
#         candlestick = { 
#             "time": data[0] / 1000, 
#             "open": data[1],
#             "high": data[2], 
#             "low": data[3], 
#             "close": data[4]
#         }
#         processed_candlesticks.append(candlestick)

#     return jsonify(processed_candlesticks)

@app.route("/start-bot", methods=["POST"])
def start_bot():
    data = request.get_json()
    custom_client  = clients.get(data['uuid'])
    if custom_client is None:
        return make_response("unauthen",401)
    
    b = bot.TradeBot(custom_client.my_client, data['symbol'])
    bots[data['uuid']] = b
    t = threading.Thread(target=b.run)
    t.start()
    return make_response("run",200)

@app.route("/kill-bot", methods=["POST"])
def kill_bot():
    data = request.get_json()
    bot = bots.get(data['uuid'])
    if bot is None:
        return make_response("unauthen",401)
    bot.canceled = True
    return make_response("stop",200)
    

if __name__ == '__main__':
    socketio.run(app)