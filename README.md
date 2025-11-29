# Notes Management App - Backend API

Ứng dụng quản lý ghi chú được xây dựng bằng NestJS với PostgreSQL.

## Yêu cầu hệ thống

- Node.js (v18 trở lên)
- pnpm hoặc npm
- Docker và Docker Compose (để chạy database)

## Cài đặt

```bash
# Cài đặt dependencies
pnpm install
```

## Cấu hình môi trường

Tạo file `.env` trong thư mục gốc của dự án:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=nest
DB_PASS=nest
DB_NAME=notesdb
```

**Lưu ý:** Nếu chạy database bằng Docker Compose, sử dụng `DB_HOST=postgres` thay vì `localhost`.

## Chạy Database với Docker

### Cách 1: Chỉ chạy Database (khuyến nghị cho development)

```bash
# Khởi động PostgreSQL container
docker-compose up -d postgres

# Kiểm tra container đang chạy
docker ps

# Xem logs nếu cần
docker-compose logs postgres
```

Database sẽ chạy tại `localhost:5432` với thông tin:

- **Host:** localhost
- **Port:** 5432
- **User:** nest
- **Password:** nest
- **Database:** notesdb

### Cách 2: Chạy toàn bộ ứng dụng với Docker Compose

```bash
# Build và chạy cả database và API
docker-compose up -d

# Xem logs
docker-compose logs -f

# Dừng tất cả services
docker-compose down

# Dừng và xóa volumes (xóa dữ liệu)
docker-compose down -v
```

## Chạy dự án

### Development mode (với hot-reload)

```bash
# Đảm bảo database đã chạy (xem phần trên)
pnpm run start:dev
```

Ứng dụng sẽ chạy tại: `http://localhost:3000`

### Production mode

```bash
# Build dự án
pnpm run build

# Chạy production
pnpm run start:prod
```

### Chạy thủ công (không dùng Docker)

Nếu bạn đã có PostgreSQL chạy sẵn trên máy:

1. Tạo database:

```sql
CREATE DATABASE notesdb;
```

2. Cập nhật file `.env` với thông tin database của bạn

3. Chạy ứng dụng:

```bash
pnpm run start:dev
```

## API Endpoints

### GET /notes

Lấy danh sách tất cả ghi chú

**Response:**
```json
[
  {
    "id": "uuid",
    "title": "Tiêu đề ghi chú",
    "content": "Nội dung ghi chú",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

### GET /notes/:id

Lấy chi tiết ghi chú theo ID

**Response:**
```json
{
  "id": "uuid",
  "title": "Tiêu đề ghi chú",
  "content": "Nội dung ghi chú",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

### POST /notes

Tạo mới một ghi chú

**Request Body:**
```json
{
  "title": "Tiêu đề ghi chú",
  "content": "Nội dung ghi chú (optional)"
}
```

**Response:**
```json
{
  "message": "Tạo ghi chú thành công"
}
```

### PUT /notes/:id

Cập nhật ghi chú theo ID

**Request Body:**
```json
{
  "title": "Tiêu đề mới (optional)",
  "content": "Nội dung mới (optional)"
}
```

**Response:**
```json
{
  "message": "Cập nhật ghi chú thành công"
}
```

### DELETE /notes/:id

Xóa ghi chú theo ID

**Response:**
```json
{
  "message": "Xóa ghi chú thành công."
}
```

## Chạy Tests

```bash
# Unit tests
pnpm run test

# E2E tests
pnpm run test:e2e

# Test coverage
pnpm run test:cov
```

## Cấu trúc dự án

```text
src/
├── entity/          # Database entities
├── dto/            # Data Transfer Objects
├── notes/          # Notes module (controller, service, module)
├── app.module.ts   # Root module
└── main.ts         # Application entry point
```

## Troubleshooting

### Lỗi kết nối database

1. Kiểm tra database đã chạy:

```bash
docker ps | grep postgres
```

2. Kiểm tra thông tin kết nối trong file `.env`

3. Kiểm tra logs:

```bash
docker-compose logs postgres
```

### Port đã được sử dụng

Nếu port 3000 hoặc 5432 đã được sử dụng, bạn có thể:

- Thay đổi port trong `docker-compose.yml`
- Hoặc dừng service đang sử dụng port đó

## License

UNLICENSED
