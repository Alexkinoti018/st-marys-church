import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { phone, amount } = await request.json();

    // 1. Format the phone number (Convert 07..., 7..., or +254... to 2547...)
    let formattedPhone = phone.replace(/\s+/g, ''); // Remove any accidental spaces
    
    if (formattedPhone.startsWith('0')) {
      formattedPhone = `254${formattedPhone.slice(1)}`;
    } else if (formattedPhone.startsWith('+')) {
      formattedPhone = formattedPhone.slice(1);
    } else if (formattedPhone.startsWith('7') || formattedPhone.startsWith('1')) {
      formattedPhone = `254${formattedPhone}`; // Fixes the exact issue from the screenshot!
    }

    const shortCode = process.env.MPESA_SHORTCODE;
    const passkey = process.env.MPESA_PASSKEY;
    const consumerKey = process.env.MPESA_CONSUMER_KEY;
    const consumerSecret = process.env.MPESA_CONSUMER_SECRET;

    // 2. Generate the Timestamp
    const date = new Date();
    const timestamp = date.getFullYear() +
      ("0" + (date.getMonth() + 1)).slice(-2) +
      ("0" + date.getDate()).slice(-2) +
      ("0" + date.getHours()).slice(-2) +
      ("0" + date.getMinutes()).slice(-2) +
      ("0" + date.getSeconds()).slice(-2);

    // 3. Generate the Base64 Password
    const password = Buffer.from(`${shortCode}${passkey}${timestamp}`).toString('base64');

    // 4. Get the OAuth Access Token from Safaricom
    const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');
    const tokenResponse = await fetch('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials', {
      headers: { Authorization: `Basic ${auth}` },
    });
    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    // 5. Trigger the STK Push
    const stkResponse = await fetch('https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        BusinessShortCode: shortCode,
        Password: password,
        Timestamp: timestamp,
        TransactionType: 'CustomerPayBillOnline',
        Amount: amount,
        PartyA: formattedPhone, // The user's phone number
        PartyB: shortCode,      // The church's till/paybill
        PhoneNumber: formattedPhone,
        CallBackURL: 'https://mydomain.com/api/mpesa/callback', // Safaricom sends receipt here
        AccountReference: 'StMarysAIPCA',
        TransactionDesc: 'Church Tithe and Offering',
      }),
    });

    const stkData = await stkResponse.json();
    return NextResponse.json(stkData);

  } catch (error) {
    console.error('STK Push Error:', error);
    return NextResponse.json({ error: 'Payment failed to initiate' }, { status: 500 });
  }
}