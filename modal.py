from binance.spot import Spot as Client
import uuid

BASE_URL = 'https://testnet.binance.vision'
class CustomClient:
    def __init__(self, key, secret):
        self.uuid = str(uuid.uuid4())
        self.client = Client(base_url = BASE_URL,  api_key = key, api_secret = secret)