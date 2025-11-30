// src/app/api/send-order-email/route.js
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const orderData = await request.json();

    // ✅ Correct: use createTransport (not createTransporter)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,        // Your Gmail address
        pass: process.env.GMAIL_APP_PASSWORD // Your Gmail app password
      },
    });

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: 'ruggedmusecollection@gmail.com', // Replace with your Gmail
      subject: `New Order from ${orderData.customer_name}`,
      html: `
        <h2>New Order - RuggedMuseCollection</h2>
        <p><strong>Name:</strong> ${orderData.customer_name}</p>
        <p><strong>Email:</strong> ${orderData.customer_email}</p>
        <p><strong>Address:</strong> ${orderData.customer_address}</p>
        <hr />
        <p><strong>Order Items:</strong></p>
        <pre>${orderData.order_items}</pre>
        <p><strong>Total:</strong> $${orderData.order_total}</p>
        <p><strong>Shipping:</strong> ${orderData.shipping_method}</p>
        <p><strong>Date:</strong> ${orderData.order_date}</p>
      `,
      text: `
        New Order - RuggedMuseCollection
        Customer: ${orderData.customer_name}
        Email: ${orderData.customer_email}
        Address: ${orderData.customer_address}
        
        Order Items:
        ${orderData.order_items}
        
        Total: $${orderData.order_total}
        Shipping: ${orderData.shipping_method}
        Date: ${orderData.order_date}
      `
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      success: true,
      message: 'Order email sent successfully',
    });

  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to send email',
    }, { status: 500 });
  }
}
