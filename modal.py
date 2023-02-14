import uuid
class ClientCustom:
    def __init__(self, client):
        self.uuid = str(uuid.uuid4())
        self.client = client