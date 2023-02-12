import websocket, json, pprint, talib, numpy
from binance.spot import Spot as Client
from binance.enums import *
import config

BASE_URL = 'https://testnet.binance.vision'
RSI_PERIOD = 14
RSI_OVERBOUGHT = 70
RSI_OVERSOLD = 30
TRADE_QUANTITY = 0.05
SOCKET = f"wss://stream.binance.com:9443/ws/"

class TradeBot:
    def __init__(self, client, symbol):
        self.closes = []
        self.in_position = False
        self.client = client
        self.symbol = symbol
        self.socket = f"{SOCKET}{symbol.lower()}@kline_1m"
        self.ws = websocket.WebSocketApp(self.socket, on_open=self.on_open, on_close=self.on_close, on_message=self.on_message)
        
    def run(self):
        ssself.ws.run_forever()
        
    def stop(self):
        self.shouldStop = True
        self.ws.close()
    
    def order(client, symbol, side, quantity, order_type = ORDER_TYPE_MARKET):
        try:
            print("sending order")
            order = client.new_order(symbol=symbol, side=side, type=order_type, quantity=quantity)
            print(order)
        except Exception as e:
            print("an exception occured - {}".format(e))
            return False

        return True
    
    def on_open(self, ws):
        print(f'opened connection')
       

    def on_close(self, ws):
        print('closed connection')

    def on_message(self, ws, message):
        # global closes, in_position
        
        print('received message')
        json_message = json.loads(message)
        pprint.pprint(json_message)

        candle = json_message['k']

        is_candle_closed = candle['x']
        close = candle['c']

        if is_candle_closed:
            print("candle closed at {}".format(close))
            self.closes.append(float(close))
            print("closes")
            print(self.closes)

            if len(self.closes) > RSI_PERIOD:
                np_closes = numpy.array(self.closes)
                rsi = talib.RSI(np_closes, RSI_PERIOD)
                print("all rsis calculated so far")
                print(rsi)
                last_rsi = rsi[-1]
                print("the current rsi is {}".format(last_rsi))

                if last_rsi > RSI_OVERBOUGHT:
                    if self.in_position:
                        print("Overbought! Sell! Sell! Sell!")
                        order_succeeded = self.order(self.client, self.symbol, SIDE_SELL, TRADE_QUANTITY)
                        if order_succeeded:
                            self.in_position = False
                    else:
                        print("It is overbought, but we don't own any. Nothing to do.")
                
                if last_rsi < RSI_OVERSOLD:
                    if self.in_position:
                        print("It is oversold, but you already own it, nothing to do.")
                    else:
                        print("Oversold! Buy! Buy! Buy!")
                        order_succeeded = self.order(self.client, self.symbol ,SIDE_BUY, TRADE_QUANTITY)
                        if order_succeeded:
                            self.in_position = True
                            
client = Client(base_url = BASE_URL, key = config.API_KEY, secret = config.API_SECRET)           
c = TradeBot(client, 'BNBUSDT')
print(client.account())