# VivuTravel - Tour Booking Website

VivuTravel là ứng dụng web đặt tour du lịch full-stack cho phép người dùng khám phá và đặt tour du lịch trực tuyến. Hệ thống tích hợp AI chatbot hỗ trợ, thanh toán trực tuyến và giao tiếp thời gian thực.

## 🚀 Tính năng chính

- Duyệt và tìm kiếm tour du lịch
- Xem chi tiết tour và thông tin đặt tour
- Xác thực người dùng (JWT)
- Thanh toán trực tuyến VNPay
- AI chatbot tư vấn du lịch thông minh
- Giao tiếp thời gian thực (Socket.io)
- Upload và quản lý ảnh (Cloudinary)

## 🤖 AI Chatbot

AI Chatbot là tính năng nổi bật của VivuTravel, sử dụng **LLM (Llama 3.3 70B)** kết hợp **Prompt Engineering** để tư vấn du lịch thông minh.

### Khả năng:

- **Hiểu ngữ cảnh phức tạp**: Xử lý câu hỏi dài, nhiều yêu cầu cùng lúc
- **Truy vấn real-time**: Kiểm tra chỗ trống, giá, lịch khởi hành theo thời gian thực từ MongoDB
- **Cá nhân hóa**: Tư vấn theo nhu cầu ngân sách, số người, độ tuổi, sở thích
- **Ngôn ngữ tự nhiên**: Hiểu tiếng Việt đời thường, sai chính tả vẫn hiểu
- **So sánh & đề xuất**: So sánh tour, lịch trình, khách sạn và đưa ra lời khuyên

### Luồng hoạt động:

1. User gửi câu hỏi qua giao diện ChatBot (React + Ant Design)
2. Backend nhận request qua API `/api/users/chatbot`
3. Truy vấn dữ liệu real-time từ MongoDB (tour, chỗ trống, giá, lịch trình)
4. Prompt Engineering ghép dữ liệu tour + câu hỏi user
5. Groq API (Llama 3.3 70B) xử lý ngôn ngữ tự nhiên
6. Lưu lịch sử hội thoại vào `messageChatbot` collection
7. Trả về câu trả lời với format đẹp, emoji, bullet points

## 🛠️ Công nghệ sử dụng

### Frontend

- ReactJS
- JavaScript
- HTML / CSS

### Backend

- Node.js
- ExpressJS
- MongoDB

### Các công nghệ khác

- JWT Authentication
- Cloudinary
- VNPay Payment Gateway
- Socket.io
- AI Chatbot (Groq / Gemini API)

## 📦 Cài đặt

```bash
# Cài đặt tất cả dependencies
npm install

# Chạy development (cả client và server)
npm run start

# Chạy riêng server
npm run server

# Chạy riêng client
npm run client
```

## 📄 Giấy phép

ISC
