# 🤖 AI Invoice Pro 

AI Invoice Pro is a sophisticated **Full Stack (MERN)** billing solution that integrates **Generative AI** to automate invoice creation. It allows users to transform natural language prompts into professional, structured invoices while providing a comprehensive dashboard for financial management.

-------

## Demo

![Demo 1](Demo1.png)
![Demo 2](Demo2.png)



## 🌟 Key Features

* **✨ AI Invoice Generation:** Utilizes **Google Gemini AI** to parse unstructured text prompts into valid invoice data (items, quantities, prices).
* **📊 Comprehensive Dashboard:** Real-time visualization of KPIs including Total Revenue, Pending Amounts, and Paid/Unpaid ratios.
* **🔐 Secure Multi-Tenancy:** Robust authentication and data isolation via **Clerk**, ensuring users only access their own invoices and business profiles.
* **🏢 Brand Management:** Dedicated business profile settings to manage logos, digital stamps, signatures, and default tax/currency configurations.
* **📄 Professional Exports:** Generate, preview, and print invoices or save them as high-quality PDFs.
* **🔍 Smart Filtering:** Search and filter system for invoices based on status, client name, or invoice number.

---

## 🛠️ Technical Stack

### **Frontend**
* **Library:** React.js (Vite)
* **Styling:** Tailwind CSS (Responsive Design)
* **State & Routing:** React Hooks & React Router DOM
* **Auth:** Clerk SDK

### **Backend**
* **Runtime:** Node.js
* **Framework:** Express.js
* **AI:** Google Gemini API
* **File Handling:** Multer (for Logo/Signature uploads)

### **Database**
* **Database:** MongoDB Atlas
* **ODM:** Mongoose (Schema validation & data modeling)

---

## 🚀 Getting Started

### 1. Prerequisites
* Node.js (v16+)
* MongoDB Atlas Account
* Clerk Dev Account
* Google Cloud Console (Gemini API Key)

### 2. Installation
```bash
# Clone the repository
git clone [https://github.com/yourusername/ai-invoice-pro.git](https://github.com/yourusername/ai-invoice-pro.git)

# Install Backend dependencies
cd backend
npm install

# Install Frontend dependencies
cd ../frontend
npm install

3. Environment Variables
Create a .env file in the backend directory:

Code snippet

PORT=4000
MONGO_URI=your_mongodb_connection_string
CLERK_SECRET_KEY=your_clerk_secret_key
GEMINI_API_KEY=your_gemini_api_key
Create a .env file in the frontend directory:

Code snippet

VITE_CLERK_PUBLISHABLE_KEY=your_clerk_pub_key
VITE_BACKEND_URL=http://localhost:4000
4. Running the Application
Bash

# Start Backend (from backend folder)
npm run dev

# Start Frontend (from frontend folder)
npm run dev