# Tìm hiểu về blockchain và code một app kết nối với sàn giao dịch Binance, sử dụng Binance API để thiết kế 1 thuật toán tự động trading.
## 1. Tổng quan về blockchain

### Khái niệm
- Blockchain là công nghệ chuỗi – khối, cho phép truyền tải dữ liệu một cách an toàn dựa trên hệ thống mã hóa vô cùng phức tạp, tương tự như cuốn sổ cái kế toán của một công ty, nơi mà tiền được giám sát chặt chẽ và ghi nhận mọi giao dịch trên mạng ngang hàng. 
- Mỗi khối (block) đều chứa thông tin về thời gian khởi tạo và được liên kết với khối trước đó, kèm theo đó là một mã thời gian và dữ liệu giao dịch

### Công nghệ sử dụng
- **Mật mã học**: để đảm bảo tính minh bạch, toàn vẹn và riêng tư thì công nghệ Blockchain đã sử dụng public key và hàm hash function.
- **Mạng ngang hàng**: Mỗi một nút trong mạng được xem như một client và cũng là server để lưu trữ bản sao ứng dụng.
- **Lý thuyết trò chơi**: Tất cả các nút tham gia vào hệ thống đều phải tuân thủ luật chơi đồng thuận (giao thức PoW, PoS,…) và được thúc đẩy bởi động lực kinh tế.

### Phân loại
- **Dựa trên các khả năng của blockchain** mà người ta phân biệt thành 3 loại chính được phát triển từ nền tảng của Bitcoin:
    - Loại 1: Chỉ làm việc với tiền điện tử
    - Loại 2: Hỗ trợ tiền điện tử và một tầng logic nghiệp vụ được hỗ trợ bởi thực thi mã, ví dụ: Ethereum.
    - Loại 3: Không liên quan đến tiền tệ nhưng hỗ trợ thực hiện phần mềm cho logic nghiệp vụ, ví dụ: Hyperledger của Linux Foundation.
- **Dựa trên mức truy cập** , chia blockchain thành 4 loại chính: 
    - Công khai (Public)
    - Tư nhân/Được quản lý (Private/Managed)
    - Liên hợp (Consortium)
    - Hỗn hợp (Hybrid)
<img src = "https://i.imgur.com/KMJQcLN.png">

