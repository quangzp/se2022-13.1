from flask import Flask, render_template
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

@app.route("/buy", methods['POST'])
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
    return "sell"

@app.route("/settings")
def settings():
    return "settings"