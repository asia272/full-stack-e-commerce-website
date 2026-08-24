# 🛍️ Full-Stack E-Commerce Website

A modern full-stack e-commerce website built with **Next.js, TypeScript, Prisma, PostgreSQL, Neon, Better Auth, Stripe, Cloudinary, and Tailwind CSS**.

Users can browse products, search and filter products, add items to their cart, place orders, make payments, and track their orders.

The project also includes an **Admin Dashboard** for managing products and customer orders.

---

## 🚀 Features

* 🔐 User authentication with Better Auth
* 👤 Role-based access control (`USER` / `ADMIN`)
* 🛍️ Product browsing, search, filtering, and sorting
* 🛒 Shopping cart management
* 📦 Order creation and order tracking
* 💳 Stripe payments
* 💵 Cash on Delivery
* 🚚 Order status management
* 👨‍💼 Admin dashboard
* 🖼️ Cloudinary product image uploads
* 📧 EmailJS for email/OTP functionality
* 📱 Responsive design

---

## 🛠️ Tech Stack

* **Next.js**
* **TypeScript**
* **React**
* **Tailwind CSS**
* **shadcn/ui**
* **Better Auth**
* **Prisma ORM**
* **PostgreSQL**
* **Neon**
* **Stripe**
* **Cloudinary**
* **EmailJS**
* **Vercel**

---

## 📂 Project Structure

```text
app/
├── actions/
├── admin/
├── api/
├── cart/
├── checkout/
├── orders/
└── products/

components/
├── admin/
├── auth/
├── cart/
├── order/
└── product/

lib/
├── auth.ts
├── auth-client.ts
├── prisma.ts
└── stripe.ts

prisma/
├── schema.prisma
└── seed.ts

public/
└── assets/
```

---

## 🔐 Environment Variables

Create a `.env` file in the project root.

```env
DATABASE_URL="your_postgresql_database_url"

BETTER_AUTH_SECRET="your_better_auth_secret"
BETTER_AUTH_URL="http://localhost:3000"
BETTER_AUTH_API_KEY="your_better_auth_api_key"

NEXT_PUBLIC_APP_URL="http://localhost:3000"

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your_cloudinary_cloud_name"
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET="your_cloudinary_upload_preset"

STRIPE_SECRET_KEY="your_stripe_secret_key"
STRIPE_WEBHOOK_SECRET="your_stripe_webhook_secret"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="your_stripe_publishable_key"

EMAILJS_SERVICE_ID="your_emailjs_service_id"
EMAILJS_TEMPLATE_ID="your_emailjs_template_id"
EMAILJS_PUBLIC_KEY="your_emailjs_public_key"
EMAILJS_PRIVATE_KEY="your_emailjs_private_key"
```



---

## ⚙️ Installation

Clone the repository:

```bash
git clone https://github.com/asia272/full-stack-e-commerce-website.git
cd full-stack-e-commerce-website
```

Install dependencies:

```bash
npm install
```

Generate Prisma Client:

```bash
npx prisma generate
```

Run migrations:

```bash
npx prisma migrate dev
```

Start the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## 💳 Payment

Stripe is integrated for online payments.

The application also supports **Cash on Delivery**.

Stripe webhooks are used to handle successful payment events and update order/payment status.

---

## 👨‍💼 Admin

Admins can:

* Create products
* Delete products
* Upload product images
* View customer orders
* Update order status

Available roles:

```text
USER
ADMIN
```

---

## 🌐 Deployment

The application can be deployed on **Vercel**.

Make sure all required environment variables are added to the deployment environment.

---

## 👩‍💻 Author

**Asia Ashraf**

GitHub: https://github.com/asia272

Portfolio: https://asia-ashraf.vercel.app/

---

⭐ If you like this project, consider giving it a star!
