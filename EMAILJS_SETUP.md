# EmailJS Setup Guide for Contact Form

## Overview
The contact form now uses **EmailJS** to send emails directly from the frontend without needing a backend server. This is a free service that handles email sending.

## Setup Instructions

### Step 1: Create EmailJS Account
1. Go to [EmailJS](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

### Step 2: Add Email Service
1. In the EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (recommended: **Gmail**)
4. Follow the instructions to connect your email (bluecityahmedabad@gmail.com)
5. Note down the **Service ID** (e.g., `service_xxxxxxx`)

### Step 3: Create Email Template
1. Go to **Email Templates** in the dashboard
2. Click **Create New Template**
3. Use this template structure:

```
Subject: {{subject}}

From: {{from_name}}
Email: {{from_email}}
Phone: {{from_phone}}

Message:
{{message}}

---
This message was sent from the Blue City Parivar contact form.
```

4. In the template settings:
   - **Template Name**: Contact Form Submission
   - **Template ID**: Note this down (e.g., `template_xxxxxxx`)
   - **To Email**: {{to_email}} or hardcode your email

5. Make sure to use these variable names in the template:
   - `{{from_name}}` - Sender's name
   - `{{from_email}}` - Sender's email
   - `{{from_phone}}` - Sender's phone
   - `{{subject}}` - Message subject
   - `{{message}}` - Message content
   - `{{to_email}}` - Your email (bluecityahmedabad@gmail.com)

6. Save the template

### Step 4: Get Public Key
1. Go to **Account** → **General**
2. Find your **Public Key** (also called User ID)
3. Note it down (e.g., `xxxxxxxxxxxxxx`)

### Step 5: Configure Environment Variables
1. Open your `.env` file in the frontend directory (create one if it doesn't exist)
2. Add these variables:

```env
# EmailJS Configuration (for contact form)
VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxx
```

Replace the `xxxxxxx` with your actual IDs from EmailJS.

### Step 6: Test the Form
1. Restart your development server
2. Navigate to the Contact page
3. Fill out the form and submit
4. Check your email inbox for the message

## Free Tier Limits
- **200 emails per month** (free tier)
- If you need more, upgrade to a paid plan

## Security Notes
- The public key is safe to expose in frontend code
- EmailJS handles rate limiting and spam prevention
- Your actual email credentials are never exposed

## Troubleshooting

### Email not sending?
1. Check browser console for errors
2. Verify all three environment variables are set correctly
3. Make sure the EmailJS service is connected and active
4. Check EmailJS dashboard for any error logs
5. Verify email template variable names match exactly

### CORS Errors?
- EmailJS handles CORS automatically, no configuration needed

### Getting spam?
- EmailJS has built-in spam protection
- You can add CAPTCHA protection in EmailJS dashboard settings

## Alternative: Gmail App Password
If using Gmail, you might need to:
1. Enable 2-factor authentication
2. Generate an App Password for EmailJS
3. Use that password when connecting Gmail to EmailJS

## Contact
If you need help, refer to [EmailJS Documentation](https://www.emailjs.com/docs/)

## Current Configuration
- **To Email**: bluecityahmedabad@gmail.com (configured in Contact.tsx)
- **Form Fields**: name, email, phone, subject, message
- **Validation**: Handled by Zod schema in `utils/validators.ts`
