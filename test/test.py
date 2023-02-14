import asyncio

async def handler(websocket):
    while True:
        # message = await websocket.recv()
        await asyncio.sleep(1)
        print("ok")


async def main():
    async with websockets.serve(handler, "", 8000):
        await asyncio.Future()  # run forever


if __name__ == "__main__":
    asyncio.run(main())