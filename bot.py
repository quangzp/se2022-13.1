import websocket, json, pprint, talib, numpy, asyncio
from binance.spot import Spot as Client
# websocket.enableTrace(True)
BASE_URL = 'https://testnet.binance.vision'
RSI_PERIOD = 14
RSI_OVERBOUGHT = 70
RSI_OVERSOLD = 30
TRADE_QUANTITY = 0.05
SIDE_BUY = 'BUY'
SIDE_SELL = 'SELL'
ORDER_TYPE_MARKET = 'MARKET'
SOCKET = f"wss://stream.binance.com:9443/ws/"

class TradeBot:
    def __init__(self, client, symbol, quantity):
        self.canceled = False
        self.closes = []
        self.in_position = False
        self.client = client
        self.symbol = symbol
        self.quantity = quantity
        self.socket = f"{SOCKET}{symbol.lower()}@kline_1s"
        self.ws = websocket.WebSocketApp(self.socket, on_open=self.on_open, on_close=self.on_close, on_message=self.on_message)
        
    def run(self):
        self.ws.run_forever()
        
        
    def stop(self):
        self.ws.keep_running = False
        self.running = False
        self.ws.close()
        
    
    def order(self, side):
        try:
            order = self.client.new_order( symbol = self.symbol, 
                                          side = side, 
                                          type = ORDER_TYPE_MARKET, 
                                          quantity=self.quantity)
            print(order)
        except Exception as e:
            print("an exception occured - {}".format(e))
            return False
        return True
    
    def on_open(self, ws):
        print('opened connection')
       

    def on_close(self, ws):
        print('closed connection')

    def on_message(self, ws, message):
        # global closes, in_position
        if self.canceled:
            self.stop()
            return
        json_message = json.loads(message)
        # pprint.pprint(json_message)

        candle = json_message['k']

        is_candle_closed = candle['x']
        close = candle['c']

        if is_candle_closed:
            self.closes.append(float(close))
            print(self.closes)

            if len(self.closes) > RSI_PERIOD:
                np_closes = numpy.array(self.closes)
                rsi = talib.RSI(np_closes, RSI_PERIOD)
                print(rsi)
                last_rsi = rsi[-1]
                print("the current rsi is {}".format(last_rsi))

                if last_rsi > RSI_OVERBOUGHT:
                    if self.in_position:
                        print(f"Overbought! {SIDE_SELL}!")
                        order_succeeded = self.order(SIDE_SELL)
                        if order_succeeded:
                            self.in_position = False
                    else:
                        print("It is overbought.do not thing")
                
                if last_rsi < RSI_OVERSOLD:
                    if self.in_position:
                        print("It is oversold, nothing to do.")
                    else:
                        print(f"Oversold! {SIDE_BUY}!")
                        order_succeeded = self.order(SIDE_BUY)
                        if order_succeeded:
                            self.in_position = True
        print(self.client.account())
# API_KEY = 'J9voeoPodq52IYt1yrEmPH61RX5tc2jaleRVV6JHTiYZ0mHNe6Nxks6K5DhgtNUr'
# API_SECRET = '1gH7FNY4NV3Gcb1RQh53nken60JnHeSCZLfhlwWHHKYRXQOuHp0otgj9VSWFl0rY' 
# client = Client(base_url = BASE_URL, api_key = API_KEY, api_secret = API_SECRET)           
# c = TradeBot(client, 'ETHUSDT', 1)

# async def main():
#     task = asyncio.create_task(c.run())
#     # c.canceled = True
#     await task

# asyncio.run(main())
