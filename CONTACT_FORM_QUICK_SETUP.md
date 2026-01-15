# Contact Form - Quick Setup Guide

## ✅ What Was Done

The contact form was **NOT working** - it was just showing a fake success message without actually sending emails.

Now it's been **fixed** to use **EmailJS** - a free service that sends emails directly from the frontend (no backend needed).

## 🚀 Quick Setup (5 minutes)

### 1. Create EmailJS Account
- Go to https://www.emailjs.com/
- Sign up (free)

### 2. Connect Your Gmail
- Dashboard → Email Services → Add Service
- Choose Gmail
- Connect: **bluecityahmedabad@gmail.com**
- Copy the **Service ID**

### 3. Create Email Template
- Dashboard → Email Templates → Create Template
- Copy this template:

```
Subject: New Contact Form Message - {{subject}}

From: {{from_name}}
Email: {{from_email}}
Phone: {{from_phone}}

Message:
{{message}}

---
Sent from Blue City Parivar Contact Form
```

- Save and copy the **Template ID**

### 4. Get Public Key
- Dashboard → Account → General
- Copy your **Public Key**

### 5. Add to .env File
Create/edit `frontend/.env`:

```env
VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxx
```

### 6. Restart Dev Server
```bash
cd frontend
nvm use 25
npm run dev
```

## 📧 Test It
1. Go to Contact page
2. Fill form and submit
3. Check **bluecityahmedabad@gmail.com** inbox

## 💰 Free Tier
- **200 emails/month** free
- Perfect for contact forms

## 🔧 Files Changed
- ✅ `frontend/src/pages/Contact.tsx` - Added EmailJS integration
- ✅ `frontend/env.template` - Added EmailJS config
- ✅ `frontend/package.json` - Added @emailjs/browser

## 📝 Important Notes
- The form will show an error if EmailJS is not configured
- Users can still contact you directly via email shown in the error
- All form validation still works (phone, email, message length, etc.)

## 🆘 Need Help?
See detailed guide: `EMAILJS_SETUP.md`
