
# LoanVault | USB-Secured Ornament Loan Management System

![System Architecture](https://github.com/user-attachments/assets/81963d58-e40d-46b7-aca8-436e3ba5fee1)

## Overview

LoanVault is a secure, offline-first ornament loan management platform designed for jewelry shops and small lending businesses. The system uses USB-based authentication and local SQLite databases to ensure customer data remains accessible only when an authorized USB device is connected.

The application focuses on privacy, security, and reliability in environments where internet connectivity may be unavailable or undesirable.

---

## Key Features

- USB-authenticated access control
- SQLite-based local data storage
- Customer onboarding with image capture
- Automated loan amount calculation
- Secure QR-based customer slips
- PDF generation for loan records
- Active and released customer tracking
- Dashboard analytics and reporting
- Role-based authentication and authorization
- Offline-first architecture

---

## Technology Stack

| Layer | Technologies |
|---------|---------|
| Frontend | React, Axios, Chart.js, React Webcam |
| Backend | Node.js, Express.js |
| Database | SQLite |
| Authentication | JWT, Bcrypt |
| Reporting | PDFKit |
| File Uploads | Multer |
| Visualization | Chart.js |

---

## System Architecture

The application follows a multi-tenant architecture where each authorized user operates on a dedicated SQLite database stored on a USB device.

### Workflow

1. User authenticates into the application.
2. System verifies the presence of an authorized USB device.
3. User-specific SQLite database is loaded from the USB.
4. Customer and loan records are stored locally.
5. Loan slips and reports are generated on demand.
6. Data remains inaccessible when the authorized USB device is unavailable.

---

## Core Modules

### Customer Management

- Customer registration
- Photo capture and storage
- Loan creation and updates
- Loan release workflow

### Loan Processing

- Ornament-based valuation
- Automated loan calculation
- Interest tracking
- Repayment management

### Reporting

- Customer PDF slips
- Loan summaries
- Dashboard analytics
- City-wise loan distribution

---

## Project Structure

```text
loanvault/
├── backend/
│   ├── routes/
│   ├── middleware/
│   ├── uploads/
│   └── app.cjs
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.jsx
│
└── README.md
````

---

## Getting Started

### Prerequisites

* Node.js
* npm
* Authorized USB device
* SQLite database file

### Installation

```bash
git clone https://github.com/nikunj-10/LoanVault.git

cd backend
npm install
npm start

cd ../frontend
npm install
npm run dev
```

### Local Access

```text
Frontend: http://localhost:5173
Backend : http://localhost:4000
```

---

## Future Enhancements

* Face verification during loan release
* Enhanced audit logging
* Backup and recovery workflows
* Mobile-responsive interface
* Advanced reporting dashboards

---

## Author

Nikunj Agarwal

LinkedIn:
https://www.linkedin.com/in/nikunj-agarwal-326b562a4

GitHub:
https://github.com/nikunj-10

```
```
