# Tài liệu Cơ sở dữ liệu MongoDB — VivuTravel

> **Mục đích:** Làm rõ các entity, mối quan hệ logic giữa các collection và chiến lược indexing cho hệ thống VivuTravel.

---

## 1. Danh sách Entity (Collection)

Hệ thống sử dụng **MongoDB** với **Mongoose ODM**. Dưới đây là 16 collection chính:

### 1.1. `users` — Ngườii dùng

| Field       | Type    | Mô tả                                 |
| ----------- | ------- | ------------------------------------- |
| `fullName`  | String  | Họ tên ngườii dùng                    |
| `email`     | String  | Email đăng nhập                       |
| `password`  | String  | Mật khẩu (hash)                       |
| `isAdmin`   | Boolean | Phân quyền admin (default: `false`)   |
| `address`   | String  | Địa chỉ                               |
| `phone`     | String  | Số điện thoại                         |
| `birthDay`  | Date    | Ngày sinh                             |
| `typeLogin` | String  | Loại đăng nhập: `email` hoặc `google` |
| `avatar`    | String  | URL ảnh đại diện                      |
| `isOnline`  | Boolean | Trạng thái online                     |
| `createdAt` | Date    | Thờii gian tạo                        |
| `updatedAt` | Date    | Thờii gian cập nhật                   |

### 1.2. `products` — Tour du lịch

| Field                | Type                  | Mô tả                                                  |
| -------------------- | --------------------- | ------------------------------------------------------ |
| `title`              | String                | Tên tour                                               |
| `destination`        | String                | Điểm đến chính                                         |
| `description`        | String                | Mô tả chi tiết                                         |
| `category`           | ObjectId → `category` | Danh mục tour                                          |
| `images`             | [String]              | Danh sách ảnh                                          |
| `transport`          | [String]              | Phương tiện di chuyển                                  |
| `departureSchedules` | [Object]              | Các đợt khởi hành (ngày đi/về, khách sạn, giá, số chỗ) |
| `createdAt`          | Date                  |                                                        |
| `updatedAt`          | Date                  |                                                        |

### 1.3. `categories` — Danh mục tour

| Field          | Type   | Mô tả        |
| -------------- | ------ | ------------ |
| `categoryName` | String | Tên danh mục |
| `image`        | String | Ảnh đại diện |
| `description`  | String | Mô tả        |
| `createdAt`    | Date   |              |
| `updatedAt`    | Date   |              |

### 1.4. `blogs` — Bài viết

| Field       | Type   | Mô tả        |
| ----------- | ------ | ------------ |
| `title`     | String | Tiêu đề      |
| `content`   | String | Nội dung     |
| `image`     | String | Ảnh đại diện |
| `createdAt` | Date   |              |
| `updatedAt` | Date   |              |

### 1.5. `carts` — Giỏ hàng

| Field                                   | Type                 | Mô tả                                      |
| --------------------------------------- | -------------------- | ------------------------------------------ |
| `user`                                  | ObjectId → `user`    | Chủ giỏ hàng                               |
| `email`, `phone`, `fullName`, `address` | String               | Thông tin liên hệ                          |
| `items`                                 | [Object]             | Các sản phẩm trong giỏ                     |
| `items[].product`                       | ObjectId → `product` | Tour được chọn                             |
| `items[].departureScheduleId`           | ObjectId             | ID đợt khởi hành (subdocument của product) |
| `items[].quantity`                      | Object               | Số lượng: adult, child, baby               |
| `items[].priceSnapshot`                 | Object               | Giá tại thờii điểm thêm vào giỏ            |
| `items[].totalItemPrice`                | Number               | Thành tiền dòng                            |
| `totalCartPrice`                        | Number               | Tổng tiền giỏ hàng                         |
| `nameCounpon`                           | String               | Mã giảm giá đang áp dụng                   |
| `createdAt`                             | Date                 |                                            |
| `updatedAt`                             | Date                 |                                            |

### 1.6. `payments` — Thanh toán / Đơn hàng

| Field                                   | Type              | Mô tả                                                    |
| --------------------------------------- | ----------------- | -------------------------------------------------------- |
| `user`                                  | ObjectId → `user` | Ngườii đặt tour                                          |
| `email`, `phone`, `fullName`, `address` | String            | Thông tin liên hệ                                        |
| `items`                                 | [Object]          | Các tour đã thanh toán (cấu trúc tương tự cart)          |
| `totalCartPrice`                        | Number            | Tổng tiền đơn hàng                                       |
| `nameCounpon`                           | String            | Mã giảm giá đã dùng                                      |
| `paymentMethod`                         | String            | `momo` hoặc `vnpay`                                      |
| `paymentStatus`                         | String            | `pending`, `success`, `failed`, `completed`, `cancelled` |
| `createdAt`                             | Date              |                                                          |
| `updatedAt`                             | Date              |                                                          |

### 1.7. `coupons` — Mã giảm giá

| Field        | Type   | Mô tả                      |
| ------------ | ------ | -------------------------- |
| `nameCoupon` | String | Tên mã giảm giá            |
| `discount`   | Number | % giảm giá                 |
| `quantity`   | Number | Số lượng còn lại           |
| `startDate`  | Date   | Ngày bắt đầu               |
| `endDate`    | Date   | Ngày kết thúc              |
| `minPrice`   | Number | Giá trị đơn hàng tối thiểu |
| `createdAt`  | Date   |                            |
| `updatedAt`  | Date   |                            |

### 1.8. `favourites` — Yêu thích

| Field       | Type                 | Mô tả          |
| ----------- | -------------------- | -------------- |
| `productId` | ObjectId → `product` | Tour yêu thích |
| `userId`    | ObjectId → `user`    | Ngườii dùng    |
| `createdAt` | Date                 |                |
| `updatedAt` | Date                 |                |

### 1.9. `feedbacks` — Đánh giá

| Field       | Type                 | Mô tả              |
| ----------- | -------------------- | ------------------ |
| `productId` | ObjectId → `product` | Tour được đánh giá |
| `userId`    | ObjectId → `user`    | Ngườii đánh giá    |
| `rating`    | Number               | Số sao             |
| `content`   | String               | Nội dung đánh giá  |
| `createdAt` | Date                 |                    |
| `updatedAt` | Date                 |                    |

### 1.10. `flashSales` — Khuyến mãi Flash Sale

| Field       | Type                 | Mô tả               |
| ----------- | -------------------- | ------------------- |
| `productId` | ObjectId → `product` | Tour áp dụng        |
| `discount`  | Number               | % giảm              |
| `startDate` | Date                 | Thờii gian bắt đầu  |
| `endDate`   | Date                 | Thờii gian kết thúc |
| `createdAt` | Date                 |                     |
| `updatedAt` | Date                 |                     |

### 1.11. `contacts` — Liên hệ

| Field                        | Type            | Mô tả                            |
| ---------------------------- | --------------- | -------------------------------- |
| `userId`                     | String → `user` | ID ngườii dùng (lưu dạng String) |
| `fullName`, `email`, `phone` | String          | Thông tin liên hệ                |
| `message`                    | String          | Nội dung                         |
| `status`                     | String          | Trạng thái: `pending`            |
| `createdAt`                  | Date            |                                  |
| `updatedAt`                  | Date            |                                  |

### 1.12. `conversations` — Cuộc trò chuyện (User ↔ Admin)

| Field          | Type                 | Mô tả                          |
| -------------- | -------------------- | ------------------------------ |
| `user`         | ObjectId → `user`    | Ngườii dùng thường             |
| `admin`        | ObjectId → `user`    | Admin quản lý (self-reference) |
| `lastMessage`  | ObjectId → `message` | Tin nhắn mới nhất              |
| `lengthIsRead` | Number               | Số tin chưa đọc (computed)     |
| `createdAt`    | Date                 |                                |
| `updatedAt`    | Date                 |                                |

### 1.13. `messages` — Tin nhắn trong cuộc trò chuyện

| Field          | Type                      | Mô tả                                  |
| -------------- | ------------------------- | -------------------------------------- |
| `conversation` | ObjectId → `conversation` | Thuộc cuộc trò chuyện nào              |
| `sender`       | ObjectId → `user`         | Ngườii gửi (có thể là admin hoặc user) |
| `content`      | String                    | Nội dung                               |
| `type`         | String                    | `text`, `image`, `file`                |
| `isRead`       | Boolean                   | Đã đọc chưa                            |
| `createdAt`    | Date                      |                                        |
| `updatedAt`    | Date                      |                                        |

### 1.14. `messageChatbots` — Lịch sử chat với Bot

| Field       | Type              | Mô tả             |
| ----------- | ----------------- | ----------------- |
| `userId`    | ObjectId → `user` | Ngườii dùng       |
| `sender`    | String            | `user` hoặc `bot` |
| `content`   | String            | Nội dung          |
| `timestamp` | Date              | Thờii điểm gửi    |
| `createdAt` | Date              |                   |
| `updatedAt` | Date              |                   |

### 1.15. `apikeys` — Khóa API

| Field        | Type            | Mô tả                            |
| ------------ | --------------- | -------------------------------- |
| `userId`     | String → `user` | ID ngườii dùng (lưu dạng String) |
| `publicKey`  | String          | Public key                       |
| `privateKey` | String          | Private key                      |
| `expireAt`   | Date            | Hết hạn sau 7 ngày (TTL index)   |
| `createdAt`  | Date            |                                  |
| `updatedAt`  | Date            |                                  |

### 1.16. `otps` — Mã OTP

| Field       | Type   | Mô tả          |
| ----------- | ------ | -------------- |
| `email`     | String | Email nhận OTP |
| `otp`       | String | Mã OTP         |
| `createdAt` | Date   |                |
| `updatedAt` | Date   |                |

---

## 2. Quan hệ Logic giữa các Collection

Dưới đây là các mối quan hệ logic (logical relationships) được thiết lập qua `ref` và cấu trúc schema:

### 2.1. Sơ đồ tổng quan (mô tả)

```
users ||--o{ products : "đánh giá / yêu thích"
users ||--o{ carts : "sở hữu"
users ||--o{ payments : "thanh toán"
users ||--o{ conversations : "tham gia"
users ||--o{ messageChatbots : "chat với bot"
users ||--o{ contacts : "gửi liên hệ"
users ||--o{ apikeys : "sở hữu"

products }o--|| categories : "thuộc về"
products ||--o{ departureSchedules : "chứa (embedded)"
products ||--o{ flashSales : "áp dụng khuyến mãi"
products ||--o{ feedbacks : "nhận đánh giá"
products ||--o{ favourites : "được yêu thích"
products ||--o{ carts.items : "được thêm vào giỏ"
products ||--o{ payments.items : "được mua"

carts ||--o| payments : "chuyển thành"

coupons ||--o{ carts : "áp dụng"
coupons ||--o{ payments : "áp dụng"

conversations ||--o{ messages : "chứa"
users ||--o{ messages : "gửi"
users ||--o{ conversations : "là admin của"
```

### 2.2. Chi tiết quan hệ

| Quan hệ                                    | Kiểu                   | Mô tả                                                                                     |
| ------------------------------------------ | ---------------------- | ----------------------------------------------------------------------------------------- |
| `users` ↔ `products`                       | **N-M (gián tiếp)**    | Thông qua `favourites` (yêu thích) và `feedbacks` (đánh giá).                             |
| `users` → `carts`                          | **1-1 / 1-N**          | Mỗi user có 1 giỏ hàng hoạt động (`Cart.findOne({ user })`).                              |
| `users` → `payments`                       | **1-N**                | Một user có nhiều đơn thanh toán.                                                         |
| `categories` → `products`                  | **1-N**                | Một danh mục có nhiều tour.                                                               |
| `products` → `flashSales`                  | **1-1**                | Một tour có thể có 1 flash sale tại một thờii điểm.                                       |
| `carts` → `payments`                       | **1-1**                | Giỏ hàng chuyển thành đơn thanh toán sau khi checkout.                                    |
| `conversations` → `messages`               | **1-N**                | Một cuộc trò chuyện có nhiều tin nhắn.                                                    |
| `users` → `conversations` (user)           | **1-N**                | Một user có thể có một cuộc trò chuyện với admin.                                         |
| `users` → `conversations` (admin)          | **Self-reference 1-N** | Một admin có thể quản lý nhiều cuộc trò chuyện.                                           |
| `conversations` → `messages` (lastMessage) | **1-1**                | Tham chiếu đến tin nhắn mới nhất (denormalization để tối ưu hiển thị danh sách).          |
| `users` → `messageChatbots`                | **1-N**                | Lịch sử chat với bot của từng user.                                                       |
| `products` → `carts.items`                 | **N-M (gián tiếp)**    | Một tour có thể nằm trong nhiều giỏ hàng. `departureScheduleId` là subdocument reference. |
| `products` → `payments.items`              | **N-M (gián tiếp)**    | Tương tự như cart, nhưng ở đơn hàng đã thanh toán.                                        |

> **Lưu ý về thiết kế:**
>
> - `departureSchedules` được **embedded** trong `products`, phù hợp với pattern _Containment_ (mỗi đợt khởi hành không tồn tại độc lập ngoài tour).
> - `carts` và `payments` có cấu trúc `items` giống nhau, đây là dạng **snapshot pattern** (lưu trạng thái giá tại thờii điểm giao dịch).
> - `userId` trong `contacts` và `apikeys` đang lưu dạng **String** thay vì `ObjectId`, tạo ra _loose reference_ (không có ràng buộc DB-level).

---

## 3. Indexing

### 3.1. Index hiện tại trong codebase

Hiện tại, codebase **chỉ định nghĩa rõ 1 index duy nhất** trong toàn bộ các model:

| Collection | Field      | Loại Index    | Mô tả                                              |
| ---------- | ---------- | ------------- | -------------------------------------------------- |
| `apikeys`  | `expireAt` | **TTL Index** | Tự động xóa document sau 7 ngày (`expires: '7d'`). |

Ngoài ra, MongoDB tự động tạo index mặc định:

- **`_id`** trên tất cả các collection.

### 3.2. Các index đề xuất (dựa trên query patterns)

Dựa trên phân tích các service layer (`*.service.js`), dưới đây là các index **nên được thêm** để tối ưu hiệu năng:

#### A. `users`

| Index            | Loại            | Lý do                                                       |
| ---------------- | --------------- | ----------------------------------------------------------- |
| `{ email: 1 }`   | Unique (nên có) | Đăng nhập, tìm user theo email (`User.findOne({ email })`). |
| `{ isAdmin: 1 }` | Single-field    | Tìm admin nhanh (`User.findOne({ isAdmin: true })`).        |

#### B. `products`

| Index                                        | Loại                | Lý do                                                                                                   |
| -------------------------------------------- | ------------------- | ------------------------------------------------------------------------------------------------------- |
| `{ category: 1 }`                            | Single-field        | Lọc tour theo danh mục.                                                                                 |
| `{ destination: 1 }`                         | Single-field / Text | Tìm kiếm theo điểm đến (`$regex` trong `searchProduct`). Nếu tìm kiếm phức tạp hơn nên dùng Text Index. |
| `{ "departureSchedules.departureDate": 1 }`  | Single-field        | Lọc theo ngày khởi hành.                                                                                |
| `{ "departureSchedules.seatsAvailable": 1 }` | Single-field        | Kiểm tra số chỗ còn trống.                                                                              |
| `{ title: 1 }`                               | Single-field / Text | Tìm kiếm theo tên tour.                                                                                 |

#### C. `categories`

| Index                 | Loại            | Lý do                     |
| --------------------- | --------------- | ------------------------- |
| `{ categoryName: 1 }` | Unique (nên có) | Tránh trùng tên danh mục. |

#### D. `carts`

| Index         | Loại                                      | Lý do                                                                                 |
| ------------- | ----------------------------------------- | ------------------------------------------------------------------------------------- |
| `{ user: 1 }` | Single-field (Unique nếu 1 user = 1 cart) | Tìm giỏ hàng theo user (`Cart.findOne({ user })`). Đây là query **rất thường xuyên**. |

#### E. `payments`

| Index                        | Loại         | Lý do                                                                               |
| ---------------------------- | ------------ | ----------------------------------------------------------------------------------- |
| `{ user: 1, createdAt: -1 }` | Compound     | Lấy lịch sử thanh toán của user (`Payment.find({ user }).sort({ createdAt: -1 })`). |
| `{ paymentStatus: 1 }`       | Single-field | Lọc đơn hàng theo trạng thái (admin dashboard).                                     |

#### F. `coupons`

| Index                          | Loại     | Lý do                                               |
| ------------------------------ | -------- | --------------------------------------------------- |
| `{ nameCoupon: 1 }`            | Unique   | Tìm mã giảm giá (`Coupon.findOne({ nameCoupon })`). |
| `{ startDate: 1, endDate: 1 }` | Compound | Kiểm tra hiệu lực mã giảm giá.                      |

#### G. `favourites`

| Index                         | Loại              | Lý do                                                                                           |
| ----------------------------- | ----------------- | ----------------------------------------------------------------------------------------------- |
| `{ userId: 1, productId: 1 }` | Compound (Unique) | Tránh trùng lặp yêu thích; query toggle favourite (`Favourite.findOne({ userId, productId })`). |
| `{ userId: 1 }`               | Single-field      | Lấy danh sách yêu thích của user.                                                               |
| `{ productId: 1 }`            | Single-field      | Đếm số lượt yêu thích của 1 tour.                                                               |

#### H. `feedbacks`

| Index              | Loại         | Lý do                                                    |
| ------------------ | ------------ | -------------------------------------------------------- |
| `{ productId: 1 }` | Single-field | Lấy đánh giá theo tour (`Feedback.find({ productId })`). |
| `{ userId: 1 }`    | Single-field | Lấy đánh giá theo user.                                  |

#### I. `flashSales`

| Index                          | Loại         | Lý do                                                          |
| ------------------------------ | ------------ | -------------------------------------------------------------- |
| `{ productId: 1 }`             | Single-field | Tìm flash sale theo tour (`FlashSale.findOne({ productId })`). |
| `{ startDate: 1, endDate: 1 }` | Compound     | Kiểm tra flash sale còn hiệu lực.                              |

#### J. `conversations`

| Index                   | Loại              | Lý do                                                |
| ----------------------- | ----------------- | ---------------------------------------------------- |
| `{ user: 1, admin: 1 }` | Compound (Unique) | Đảm bảo 1 user chỉ có 1 cuộc trò chuyện với 1 admin. |
| `{ user: 1 }`           | Single-field      | Tìm conversation của user.                           |

#### K. `messages`

| Index                                       | Loại     | Lý do                                                                                                              |
| ------------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------ |
| `{ conversation: 1, createdAt: 1 }`         | Compound | Lấy tin nhắn theo cuộc trò chuyện và sắp xếp thờii gian (`Message.find({ conversation }).sort({ createdAt: 1 })`). |
| `{ conversation: 1, isRead: 1, sender: 1 }` | Compound | Đếm tin nhắn chưa đọc (`Message.find({ conversation, isRead: false, sender })`).                                   |

#### L. `messageChatbots`

| Index                          | Loại     | Lý do                                          |
| ------------------------------ | -------- | ---------------------------------------------- |
| `{ userId: 1, createdAt: -1 }` | Compound | Lấy lịch sử chat bot của user theo thờii gian. |

#### M. `contacts`

| Index           | Loại         | Lý do                            |
| --------------- | ------------ | -------------------------------- |
| `{ userId: 1 }` | Single-field | Lọc liên hệ theo user (nếu cần). |
| `{ status: 1 }` | Single-field | Lọc theo trạng thái xử lý.       |

#### N. `otps`

| Index                         | Loại     | Lý do                                                                                                                           |
| ----------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `{ email: 1, createdAt: -1 }` | Compound | Lấy OTP mới nhất của email. Nên thêm **TTL index** trên `createdAt` (hoặc `updatedAt`) để tự động xóa OTP hết hạn sau vài phút. |

---

### 3.3. Cách triển khai index trong Mongoose (ví dụ)

Ví dụ thêm index cho collection `carts`:

```js
// server/src/models/cart.model.js
cartSchema.index({ user: 1 }, { unique: true });
```

Ví dụ thêm compound index cho `favourites`:

```js
// server/src/models/favourite.model.js
modelFavourite.index({ userId: 1, productId: 1 }, { unique: true });
```

Ví dụ TTL index cho `otps` (tự xóa sau 10 phút):

```js
// server/src/models/otp.model.js
modelOtp.index({ createdAt: 1 }, { expireAfterSeconds: 600 });
```

> **Khuyến nghị:** Nên kiểm tra index hiện có trên production bằng lệnh `db.collection.getIndexes()` và sử dụng `explain("executionStats")` trên các query chậm để tinh chỉnh thêm.

---

## 4. Tóm tắt

| Tiêu chí                | Chi tiết                                                                                                         |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------- |
| **Số lượng Collection** | 16                                                                                                               |
| **Relationship chính**  | 1-N (user-cart, user-payment, category-product, conversation-message), N-M (user-product qua favourite/feedback) |
| **Embedded Documents**  | `products.departureSchedules`, `carts.items`, `payments.items`                                                   |
| **Index hiện có**       | 1 TTL index (`apikeys.expireAt`) + default `_id`                                                                 |
| **Index cần bổ sung**   | ~20+ index đơn và compound đã đề xuất ở mục 3.2 để tối ưu các query pattern hiện tại                             |

---

_Tài liệu này được tạo để phục vụ việc hiểu rõ cấu trúc DB và tối ưu hiệu năng truy vấn cho project VivuTravel._
