# Homework Web API (Node.js + Swagger)

โปรเจกต์นี้เป็น REST API แบบง่ายที่พัฒนาด้วย Node.js และ Express  
และใช้ Swagger UI สำหรับแสดงเอกสาร API และทดสอบ endpoint

---

# Requirements (สิ่งที่ต้องมีก่อน)

ก่อนรันโปรเจกต์ต้องติดตั้งโปรแกรมเหล่านี้ก่อน

- Node.js
- npm
- Git

ตรวจสอบได้ด้วยคำสั่ง

```bash
node -v
npm -v
git -v
```

---

# วิธีติดตั้งและรันโปรเจกต์ (Installation & Run)

## 1. Clone Repository

ดาวน์โหลดโปรเจกต์จาก GitHub

```bash
git clone https://github.com/<your-username>/<repository-name>.git
```

---

## 2. เข้าไปในโฟลเดอร์โปรเจกต์

```bash
cd <repository-name>
```

ตัวอย่าง

```bash
cd homeworkweb2-1
```

---

## 3. ติดตั้ง Dependencies

ติดตั้ง packages ที่โปรเจกต์ต้องใช้

```bash
npm install
```

ถ้า dependencies ไม่ถูกติดตั้ง สามารถติดตั้งเองได้ด้วย

```bash
npm install express swagger-ui-express yamljs
```

Packages ที่ใช้ในโปรเจกต์

- express → ใช้สร้าง Web Server
- swagger-ui-express → ใช้แสดง Swagger UI
- yamljs → ใช้อ่านไฟล์ swagger.yaml

---

## 4. รัน Server

เริ่ม server ด้วยคำสั่ง

```bash
node app.js
```

ถ้ารันสำเร็จ server จะทำงานที่

```
http://localhost:8000
```

---

# API Documentation

Swagger UI สามารถเปิดได้ที่

```
http://localhost:8000/api-docs
```

สามารถใช้หน้านี้ในการดู API และทดลองเรียก endpoint ต่าง ๆ ได้

---

# Quick Start (รันแบบสั้น ๆ)

```bash
git clone <repo-url>
cd homeworkweb2-1
npm install express
node app.js
```

จากนั้นเปิด

```
http://localhost:8000/api-docs
```

---

# โครงสร้างโปรเจกต์

```
homeworkweb2-1
│
├── app.js
├── swagger.yaml
├── package.json
├── README.md
└── node_modules
```

หมายเหตุ: โฟลเดอร์ node_modules จะถูกสร้างหลังจากรัน `npm install`

---

# ปัญหาที่อาจเจอ (Troubleshooting)

## 1. Error: Cannot find module

ตัวอย่าง error

```
Error: Cannot find module 'swagger-ui-express'
```

วิธีแก้

ติดตั้ง package ที่หายไป

```bash
npm install swagger-ui-express
```

หรือ

```bash
npm install
```

---

## 2. ไม่มีโฟลเดอร์ node_modules

ให้รันคำสั่ง

```bash
npm install
```

---

## 3. Port ถูกใช้งานอยู่

ถ้าเจอ error แบบนี้

```
Error: listen EADDRINUSE: address already in use :::8000
```

ให้เปลี่ยน port ในไฟล์ `app.js`

ตัวอย่าง

```javascript
const port = 3000;
```

---

# Author

Student Web API Homework Project
