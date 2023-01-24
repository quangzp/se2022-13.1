import config, csv
from binance.client import Client

client = Client(config.API_KEY, config.API_SECRET)

candlesticks = client.get_klines(symbol='BNBBTC', interval=Client.KLINE_INTERVAL_15MINUTE)
csvfile = open('15minutes.csv', 'w', newline='')
candlestick_writer = csv.writer(csvfile, delimiter=',')

for candlestick in  candlesticks:
    candlestick[0] = candlestick[0] / 1000
    candlestick_writer.writerow(candlestick)

csvfile.close()