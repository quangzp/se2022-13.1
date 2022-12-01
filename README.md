# Tìm hiểu về blockchain và code một app kết nối với sàn giao dịch Binance, sử dụng Binance API để thiết kế 1 thuật toán tự động trading.
## 1. Tổng quan về blockchain

### Khái niệm
- Blockchain là công nghệ chuỗi – khối, cho phép truyền tải dữ liệu một cách an toàn dựa trên hệ thống mã hóa vô cùng phức tạp, tương tự như cuốn sổ cái kế toán của một công ty, nơi mà tiền được giám sát chặt chẽ và ghi nhận mọi giao dịch trên mạng ngang hàng. 
- Mỗi khối (block) đều chứa thông tin về thời gian khởi tạo và được liên kết với khối trước đó, kèm theo đó là một mã thời gian và dữ liệu giao dịch
<img src = "https://img.money.com/2022/06/What-Is-Blockchain-Infographic.jpg?quality=60">

### Công nghệ sử dụng
- **Mật mã học**: để đảm bảo tính minh bạch, toàn vẹn và riêng tư thì công nghệ Blockchain đã sử dụng public key và hàm hash function.
- **Mạng ngang hàng**: Mỗi một nút trong mạng được xem như một client và cũng là server để lưu trữ bản sao ứng dụng.
- **Lý thuyết trò chơi**: Tất cả các nút tham gia vào hệ thống đều phải tuân thủ luật chơi đồng thuận (giao thức PoW, PoS,…) và được thúc đẩy bởi động lực kinh tế.

### Phân loại
- **Dựa trên các khả năng của blockchain**, chia blockchain thành 3 loại chính (dựa trên nền tảng của Bitcoin):
    - Loại 1: Chỉ làm việc với tiền điện tử
    - Loại 2: Hỗ trợ tiền điện tử và một tầng logic nghiệp vụ được hỗ trợ bởi thực thi mã, ví dụ: Ethereum.
    - Loại 3: Không liên quan đến tiền tệ nhưng hỗ trợ thực hiện phần mềm cho logic nghiệp vụ, ví dụ: Hyperledger của Linux Foundation.
- **Dựa trên mức truy cập** , chia blockchain thành 4 loại chính: 
    - Công khai (Public)
    - Tư nhân/Được quản lý (Private/Managed)
    - Liên hợp (Consortium)
    - Hỗn hợp (Hybrid)
<img src = "https://i.imgur.com/PnvHrLS.png">

- **Ưu, nhược điểm của mỗi loại blockchain**

<img src = "https://i.imgur.com/38nNOAI.png"> 
    - Trong khi được phổ biến với việc sử dụng ngày càng nhiều của bitcoin, ethereum và các loại tiền điện tử khác, công nghệ blockchain
cũng có các ứng dụng đầy hứa hẹn cho nhiều lĩnh vực khác nhau như: hợp đồng pháp lý, bán tài sản, hồ sơ y tế và bất kỳ ngành nào
khác cần cho phép và ghi lại một loạt các hành động hoặc giao dịch.
    - Bitcoin là một loại tiền kỹ thuật số phi tập trung có thể được gửi từ người dùng này sang người dùng khác trên mạng bitcoin ngang
hàng mà không cần người trung gian. Các giao dịch được xác minh bởi các nút mạng thông qua mật mã và được ghi lại trong một sổ
cái phân tán công khai được gọi là blockchain.

## 2. Cấu trúc của blockchain
- Blockchain bao gồm 2 phần chính:
    - Khối (Block): các khối chứa dữ liệ
    - Chuỗi (Chain): do các khối chứa dữ liệu liên kết với nhau tạo thành chuỗi
- Mỗi khối (Block) bao gồm 3 thành phần chính:
    - **Data**: Các bản ghi dữ liệu đã xác minh của bạn được bảo vệ bằng các thuật toán mã hóa phụ thuộc vào mỗi chuỗi khối (Thông tin người gửi, người nhận, số lượng coin đã được gửi,…)
    - **Hash**: Là một chuỗi ký tự và số được sinh ngẫu nhiên không giống nhau hoàn toàn. Nó đại diện cụ thể cho khối, mã này là duy nhất và không trùng nhau.
    - **Previous Hash**: Hashcode của block trước đó, được sử dụng giúp cho các khối liền kề biết khối nào ở trước, khối nào ở sau, nhằm liên kết đúng với nhau. Tuy nhiên khối đầu tiên, bởi vì không có khối nào trước nó nên mã Hash của nó là một chuỗi số 0. Khối đầu tiên này được gọi là Genesis Block tức là “Khối nguyên thủy” hay khối gốc.
 <img src = "https://file.publish.vn/coin98/2021-07/gan-cac-block-thanh-mot-chuoi-1625732298411.png">

## 3. Cách thức hoạt động của blockchain
## 4. Tính bảo mật, toàn vẹn dữ liệu
## 5. Ứng dụng của blockchain
## 6. Ưu điểm, nhược điểm của blockchain



