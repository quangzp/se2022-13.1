from flask import Flask, render_template, request, flash, jsonify
from binance.client import Client
import config, csv

app = Flask(__name__)

client = Client(config.API_KEY, config.API_SECRET)

@app.route("/")
def index():
    info = client.get_account()
    
    balances = info['balances']
    
    exchange_info = client.get_exchange_info()
    symbols = exchange_info['symbols']
    return render_template('index.html', balances = balances, symbols=symbols)

@app.route("/buy", methods=['POST'])
def buy():
    try:
        order = client.create_order(symbol=request.form['symbol'], 
            side=SIDE_BUY,
            type=ORDER_TYPE_MARKET,
            quantity=request.form['quantity'])
    except Exception as e:
        flash(e.message, "error")

    return redirect('/')

@app.route("/sell")
def sell():
    try:
        order = client.create_order(symbol=request.form['symbol'], 
            side=SIDE_SELL,
            type=ORDER_TYPE_MARKET,
            quantity=request.form['quantity'])
    except Exception as e:
        flash(e.message, "error")

    return redirect('/')

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