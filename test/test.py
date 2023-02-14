from binance import Client, ThreadedWebsocketManager, ThreadedDepthCacheManager
import config

client = Client(config.API_KEY, config.API_SECRET, tld ="vision", testnet = True)
client.create_order(
    symbol='BNBUSDT',
    side= Client.SIDE_BUY,
    type= Client.ORDER_TYPE_MARKET,
    quantity=1)
print(client.get_account())