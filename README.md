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
    - Khối (Block): các khối chứa dữ liệu
    - Chuỗi (Chain): do các khối chứa dữ liệu liên kết với nhau tạo thành chuỗi
- Mỗi khối (Block) bao gồm 3 thành phần chính:
    - **Data**: Các bản ghi dữ liệu đã xác minh của bạn được bảo vệ bằng các thuật toán mã hóa phụ thuộc vào mỗi chuỗi khối (Thông tin người gửi, người nhận, số lượng coin đã được gửi,…)
    - **Hash**: Là một chuỗi ký tự và số được sinh ngẫu nhiên không giống nhau hoàn toàn. Nó đại diện cụ thể cho khối, mã này là duy nhất và không trùng nhau.
    - **Previous Hash**: Hashcode của block trước đó, được sử dụng giúp cho các khối liền kề biết khối nào ở trước, khối nào ở sau, nhằm liên kết đúng với nhau. Tuy nhiên khối đầu tiên, bởi vì không có khối nào trước nó nên mã Hash của nó là một chuỗi số 0. Khối đầu tiên này được gọi là Genesis Block tức là “Khối nguyên thủy” hay khối gốc.
 <img src = "https://file.publish.vn/coin98/2021-07/gan-cac-block-thanh-mot-chuoi-1625732298411.png">
 
 ## 3. Các tính chất của blockchain
 - **Tính phi tập trung (Decentralized)**: Blockchain sẽ hoạt động độc lập theo các thuật toán máy tính, hoàn toàn không bị bất kỳ một tổ chức nào nắm quyền kiểm soát. Chính vì vậy blockchain tránh được rủi ro từ bên thứ 3.
 - **Tính phân tán (Distributed)**: Các khối chứa dữ liệu giống nhau nhưng được phân tán ở nhiều nơi khác nhau. Nên chẳng may 1 nơi bị mất hoặc hỏng thì dữ liệu vẫn còn trên Blockchain.
 - **Bất biến**: Dữ liệu trong Blockchain không thể sửa (có thể sửa nhưng sẽ để lại dấu vết) và sẽ lưu trữ mãi mãi.
 - **Tính bảo mật**: Các thông tin, dữ liệu trong Blockchain được phân tán và an toàn tuyệt đối.
 - **Tính minh bạch**: Ai cũng có thể theo dõi dữ liệu Blockchain đi từ địa chỉ này tới địa chỉ khác và có thể thống kê toàn bộ lịch sử trên địa chỉ đó.
 - **Tích hợp Smart contract (hay còn gọi là: hợp đồng thông minh)**: Dựa vào đó các điều khoản được ghi trong hợp đồng thông minh sẽ được thực thi khi các điều kiện trước đó được thỏa mãn, không ai có thể ngăn cản hoặc hủy nó.

## 4. Cách thức hoạt động của blockchain
### Nguyên tắc sổ cái
- Mỗi giao dịch trong Blockchain đều được ghi vào một "cuốn sổ cái" và sẽ được chia sẻ cho mỗi node trong mạng (nói cách khác mỗi node trong Blockchain đều đang giữ một bản sao của cuốn sổ cái).
- Hệ thống Blockchain chỉ ghi lại mỗi giao dịch được yêu cầu chứ không hề theo dõi số dư tài khoản của mỗi ví
### Nguyên lý mã hoá - công nghệ khoá công khai
- Để thực hiện các giao dịch trên Blockchain ta cần 1 ví điện tử, ví điện tử này được bảo vệ bằng cặp khoá bảo mật ** khóa riêng tư (chỉ chủ sở hữu biết) và khóa công khai (có thể được người khác biết)**
- Cặp khóa công khai-riêng tư có tính chất độc đáo là mặc dù dữ liệu được mã hóa bằng khóa riêng tư, nó có thể được giải mã bằng khóa công khai tương ứng và ngược lại.
- Khi mã hóa một yêu cầu giao dịch bằng khóa riêng tư, có nghĩa là ta đang tạo ra một chữ ký điện tử được các máy tính trong mạng lưới Blockchain sử dụng để kiểm tra chủ thể gửi và tính xác thực của giao dịch
- Để gửi Bitcoin, cần chứng minh rằng bạn sở hữu khóa riêng tư của một chiếc ví điện tử cụ thể bởi bạn cần sử dụng nó để mã hóa thông điệp yêu cầu giao dịch.
- Cách triển khai khoá công khai phổ biến nhất là thuật toán RSA, tuy nhiên Blockchain cần một thuật toán hiệu quả và mạnh hơn
- Mật mã đường cong Elliptic (Elliptic-curve cryptography/ECC) được sử dụng trong Bitcoin cũng như Ethereum blockchain để tạo cặp khóa công khai và riêng tư
### Nguyên lý tạo khối
- Các giao dịch gửi lên cùng 1 thời điểm trên mạng lưới blockchain được nhóm với nhau tạo thành một khối. 
- Các giao dịch chưa được thực hiện trong 1 khối được coi là chưa được xác nhận
- Mỗi node có thể nhóm các giao dịch với nhau thành một khối và gửi nó vào mạng lưới như một hàm ý cho các khối tiếp theo được gắn vào sau đó. Node nào cũng có thể tạo ra một khối mới.
- **Vậy câu hỏi đặt ra là: Khối nào sẽ được thêm vào Blockchain ?**
- Để giải quyết vấn đề này, hệ thống Blockchain sẽ yêu cầu các node giải một vấn đề toán học. 
- Để được thêm vào Blockchain, mỗi khối phải chứa một đoạn mã đóng vai trò như một đáp án cho một vấn đề toán học phức tạp (đoán số) được tạo ra bằng **hàm mã hóa băm không thể đảo ngược**
- Mạng lưới quy định mỗi khối được tạo ra sau một quãng thời gian là 10 phút một lần, bởi vì trong mạng lưới luôn có một số lượng lớn các máy tính đều tập trung vào việc đoán ra dãy số này.
- Node nào giải quyến vấn đề toán học đó trước tiên sẽ là node có quyền gắn khối(block) tiếp theo lên chuối.
## 4. Bảo mật, toàn vẹn giao dịch
- ### Tính bảo mật
    -  Tính toàn vẹn của một khối được đảm bảo bởi:
        - Nội dung header của block không bị giả mạo.
        - Các giao dịch không bị giả mạo.
        - Các chuyển đổi trạng thái được tính toán, được hash và xác minh.
    - Trong Ethereum, hash của khối là khối của tất cả các thành phần nằm trong header, bao gồm cả các gốc giao dịch và các hash gốc
        trạng thái. Nó được tính toán bằng cách áp dụng một biến thể của thuật toán SHA-3 được gọi là Keccak vào tất cả các thành phần
        của header trong block.
    - Một block điển hình có khoảng 2.000 giao dịch với Bitcoin và khoảng 100 giao dịch với Ethereum. Chúng ta cần một cách hiệu quả để
    phát hiện các giả mạo và thẩm định giao dịch hiệu quả. Hash của các giao dịch trong một block được xử lý trong một cấu trúc cây
    được gọi là hash cây Merkle. Cách này cũng được sử dụng để tính toán hash gốc trạng thái, vì chỉ hash các trạng thái thay đổi mới
    cần tính toán lại. Nó cũng được sử dụng để hash gốc biên nhận.
    - Thực thi hợp đồng thông minh trong Ethereum dẫn đến thay đổi trạng thái. Mọi thay đổi trạng thái yêu cầu tính toán lại hash gốc trạng
    thái. Thay vì tính toán lại hash cho toàn bộ các trạng thái, chỉ có đường dẫn bị ảnh hưởng trong cây Merkle cần phải được tính lại.
    - Block hash trong Ethereum được tính bằng cách tính toán hash gốc trạng thái, gốc giao dịch và hash gốc biên nhận. Những gốc này
    cùng với tất cả mục khác trong header được hash cùng với nhau sử dụng một biến nonce để giải câu hỏi proof of work.
    - Hash khối phục vụ hai mục đích quan trọng:
        - Xác minh tính toàn vẹn của khối và các giao dịch.
        - Hình thành liên kết chuỗi bằng cách nhúng hash của khối trước đó vào header khối hiện tại.

- ### Tính toàn vẹn của giao dịch
    - Để đảm bảo tính toàn vẹn của một giao dịch cần 3 yếu tố:
        - Địa chỉ tài khoản độc nhất và bảo mật.
        - Uỷ quyền giao dịch của người gửi thông qua chữ ký điện tử.
        - Xác minh rằng nội dung của giao dịch không bị sửa đổi
    - Địa chỉ của tài khoản được sinh ra bằng cách dùng một cặp mã khoá công khai-riêng tư
        - Một số có độ dài 256 bit được sinh ngẫu nhiên và chỉ định làm mã khoá riêng tư được bảo vệ bằng mật khẩu.
        - Sử dụng thuật toán ECC để sinh một mã khoá công khai độc nhất từ mã riêng tư. Đây là cặp mã khoá công khai-riêng tư.
        - Sau đó áp dụng hàm hash cho khoá công khai để có được địa chỉ tài khoản. Địa chỉ này có kích thước nhỏ hơn, chỉ 20 byte hoặc
            160 bit
    - Một giao dịch chuyển tài sản cần phải được uỷ quyền, không thể thoái thác và không thể thay đổi. Xác minh một giao dịch:
        - Tìm mã hash của trường dữ liệu trong giao dịch. Mã hoá mã hash đó sử dụng mã riêng tư của người gửi. Do đó, giao dịch được ký
            điện tử để ủy quyền và làm cho giao dịch không thể thoái thác.
        - Thêm mã hash mới vào giao dịch. Nó có thể được xác thực bởi người khác bằng cách giải mã sử dụng mã công khai của người gửi
            và tính toán lại mã hash của giao dịch.
        - So sánh mã hash trên với mã hash nhận được trong chữ ký điện tử. Nếu trùng khớp, chấp nhận giao diện. Ngược lại, từ chối giao
            dịch đó.
    - Ngoài ra, để xác thực giao dịch hoàn chỉnh, mốc thời gian, nonce, số dư tài khoản và toàn bộ chi phí cũng phải được xác minh.
   
   ## 5. Các loại sàn giao dịch
    - ### Sàn DEX
        - DEX (Decentralized Exchange) nghĩa là sàn giao dịch phi tập trung. Tại đây, các giao dịch tiền điện tử được diễn ra ngang hàng giữa những người dùng với nhau     trên nền tảng Blockchain, mà không cần thông qua bất cứ tổ chức trung gian nào. Không ai giữ tiền của bạn và bạn cũng không cần phải tin tưởng sàn giao dịch như        khi sử  dụng sàn giao dịch tiền điện tử tập trung (CEX).
        - #### Cách thức hoạt động của sàn DEX
            - Liquidity Pool : Liquidity Pool hay còn gọi là các bể thanh khoản, vì sàn phi tập trung không dùng cơ chế sổ lệnh(nơi người mua và người bán đặt lệnh để              thực hiện giao dịch), nhưng không phải lúc nào cũng cũng có thể khớp lệnh, vì thế các nhà tạo lập thị trường cung cấp thêm một thứ gọi là thanh                         khoản(Liquidity) để trên DEX người dùng có thể gần như khớp lệnh 24/24. Nói cách khác Liquidity Pool là một bể thanh khoản, để người dùng có thể chuyển                 đổi 24/24.
            - Automated Market Maker : AMM không sử dụng sổ lệnh mà tận dụng các smart contract để tạo ra các nhóm thanh khoản tự động thực hiện giao dịch. AMM tương                   đối thân thiện với người dùng. Các giao dịch trên DEX AMM được thực thi on-chain nên bạn phải tốn phí. Uniswap, Pancakeswap, Sushiswap… là các sàn DEX                  AMM phổ biến nhất hiện nay.
    - ### Sàn CEX
        - CEX (Centralized Exchange) Đây là loại sàn giao dịch tập trung, do bên thứ 3 quản lý. Bên thứ 3 có thể là công ty hoặc tổ chức chủ sàn. Khi bạn tiến hành nạp             vào tài khoản trên sàn CEX, dù là loại tài sản tiền điện tử nào thì cũng đều được công ty hoặc tổ chức đó quản lý, kiểm soát.
        - #### Cách thức hoạt động của sàn CEX
            - Giao dịch: Ở sàn CEX cho phép những nhà giao dịch mua bán tiền mã hóa bằng tiền tệ Fiat. Ngoài ra, họ cũng cung cấp nhiều dịch vụ bổ sung bao gồm có: lưu                 trữ, giới hạn và thậm chí là giao dịch đòn bẩy và Lending – cho vay trong ngành tiền mã hóa.
            - Quy định: Những sàn giao dịch tập trung thường có giấy phép hoạt động tùy theo từng quốc gia / khu vực của họ. Vì thế, họ thực hiện các thủ tục kyc và                    Aml nhằm mục đích tuân thủ luật pháp và đảm bảo sự an toàn của khách hàng.
            - Quyền kiểm soát: Quyền kiểm soát nền tảng và quỹ tiền mã hóa của khách hàng vẫn nằm trong tay của sàn giao dịch. Vì vậy, nếu có bị cuộc tấn công, nó có               thể dẫn đến việc mất tiền mã hóa của khách hàng của họ. Đã có một số cuộc tấn công đã xảy ra trên các sàn giao dịch tiền mã hóa CEX dẫn đến việc mất                    Bitcoin và các đồng tiền mã hóa khác.
