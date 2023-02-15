from binance.spot import Spot
from binance.websocket.spot.websocket_stream import SpotWebsocketStreamClient
from binance.spot import Spot as SpotAPIClient
import uuid

SIDE_BUY = 'BUY'
SIDE_SELL = 'SELL'
ORDER_TYPE_MARKET = 'MARKET'
BASE_URL = 'https://testnet.binance.vision'
WSS = '"wss://testnet.binance.vision/ws-api/v3"'

class CustomClient:
    def __init__(self, key, secret):
        self.uuid = str(1)
        self.my_client = Spot(base_url = BASE_URL,  api_key = key, api_secret = secret)
        self.my_sws = SpotAPIClient(key , base_url="https://testnet.binance.vision")
        self.listen_key = self.my_sws.new_listen_key()['listenKey']
        # self.SpotWebsocketStreamClient
        
    def buy(self, symbol, quantity):
        order = self.my_client.new_order(
            symbol = symbol, 
            side = SIDE_BUY,
            type=  ORDER_TYPE_MARKET,
            quantity = quantity)
        return order
    
    def sell(self, symbol, quantity):
        order = self.my_client.new_order(
            symbol = symbol, 
            side = SIDE_SELL,
            type=  ORDER_TYPE_MARKET,
            quantity = quantity)
        return order
    
    def calculate_profit(self, trades):
        holding_avg_price = 0 
        holding_amount = 0 
        for idx, item in enumerate(trades):
            if item['isBuyer']:
                holding_avg_price = (holding_avg_price*holding_amount+float(item['price'])*float(item['qty']))/(holding_amount+float(item['qty']))
                holding_amount += float(item['qty'])
            else:
                holding_amount -= float(item['qty'])
                holding_avg_price = holding_avg_price 
        
        holding_total = holding_amount*holding_avg_price
        current_price = float(self.my_client.avg_price(symbol=trades[0]['symbol'])['price']) 
        holding_profit = current_price*holding_amount - holding_total
        holding_profit_percent = (current_price-holding_avg_price)/holding_avg_price*100
        result = {'name': trades[0]['symbol'], 
                'holding_avg_price': holding_avg_price,
                'current_price': current_price,  
                'holding_amount': holding_amount,
                'holding_value': holding_avg_price*holding_amount, 
                'current_value': current_price*holding_amount, 
                'holding_profit':holding_profit,   
                'holding_profit_percent':holding_profit_percent
                }
        return result
    
    def get_profit(self):
        symbols = ['BTCUSDT','BNBUSDT','ETHUSDT']
        rs = []
        for symbol in symbols:
            trades = self.my_client.my_trades(symbol=symbol)
            if trades:
                roi_symbol = self.calculate_profit(trades)
                rs.append(roi_symbol)
        return rs