
# **MeetlinkO — Connect. Travel. Explore.**

MeetlinkO is a modern travel networking platform designed to help travelers connect, find compatible travel buddies, explore curated travel plans, and enjoy a seamless travel community experience. Built with a scalable architecture and polished UI, MeetlinkO provides real-time features, verified memberships, secure authentication, and an intuitive interface crafted for smooth interaction.

---

## 🚀 **Features**

### **👤 User Features**

* Create and manage personal traveler profiles
* Upload avatar, bio, travel interests, and visited countries
* Explore profiles of verified travelers
* Search and filter based on destination, date, and preferences

### **🤝 Find Travel Buddy**

* Smart match suggestions based on interests
* View compatibility insights
* Connect with travelers who share similar plans

### **🗺️ Travel Plans & Explore**

* Explore featured travel plans
* View destinations, budgets, hosts, and schedules
* Save and follow interesting travel plans

### **💰 Subscription System**

* Weekly, Monthly & Yearly premium plans
* Verified Badge after successful payment
* Stripe payment integration
* Secure checkout & webhook validation

### **🔐 Authentication & Security**

* JWT-based secure login & registration
* Role-based access control (Admin & User)
* Protected routes and data validation

### **📊 Admin Dashboards**

* Manage users
* Manage travel plans
* View subscription data

### **🛠️ Modern UI & UX**

* Fully responsive
* Clean and minimal interface
* Built using Tailwind CSS & Shadcn UI components

---

## 🧰 **Tech Stack**

### **Frontend**

* **Next.js 15**
* **React**
* **Tailwind CSS**
* **Shadcn UI**
* **Stripe Checkout**
* **Lucide Icons**

### **Backend**

* **Node.js**
* **Express.js**
* **Prisma ORM**
* **MongoDB**

### **Other Tools**

* Stripe Webhooks
* JWT Authentication
* Middleware-based security

---

## ⚙️ **Installation & Setup**

### **1. Clone the Repository**

```sh
git clone https://github.com/yourusername/meetlinko.git
cd meetlinko
```

### **2. Install Dependencies**

#### For Frontend

```sh
cd client
npm install
```

#### For Backend

```sh
cd server
npm install
```

---

## 🔑 **Environment Variables**

### **Backend `.env`**

```
DATABASE_URL=your_mongodb_url
JWT_SECRET=your_secret
STRIPE_SECRET_KEY=your_key
WEBHOOK_SECRET=your_webhook_secret
```

### **Frontend `.env.local`**

```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_key
NEXT_PUBLIC_BASE_API_URL=http://localhost:5000
```

---

## ▶️ **Run the App**

### **Backend**

```sh
npm run dev
```

### **Frontend**

```sh
npm run dev
```

---

## 📦 **Folder Structure**

```
/client
  /components
  /app
  /lib
/server
  /src
    /controllers
    /routes
    /services
    /prisma
```







