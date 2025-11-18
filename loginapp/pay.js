const express = require('express');
const bodyParser = require('body-parser');
const path=require('path');
const SSLCommerzPayment = require('sslcommerz-lts');

const payment = express();
payment.use(bodyParser.json());
payment.use(bodyParser.urlencoded({ extended: true }));

const store_id = 'abc6912282a8d00c';
const store_passwd = 'abc6912282a8d00c@ssl';
const is_live = false; // true for live, false for sandbox

//Home route
payment.get('/payment', (req, res) => {
  res.sendFile(path.join(__dirname,'/views/pay.html'));
});

//Initialize Payment
payment.get('/init', (req, res) => {
  const data = {
    total_amount: 100,
    currency: 'BDT',
    tran_id: 'REF' + Date.now(),
    success_url: 'http://localhost:3000/success',
    fail_url: 'http://localhost:3000/fail',
    cancel_url: 'http://localhost:3000/cancel',
    ipn_url: 'http://localhost:3000/ipn',
    shipping_method: 'Courier',
    product_name: 'Computer.',
    product_category: 'Electronic',
    product_profile: 'general',
    cus_name: 'Customer Name',
    cus_email: 'customer@example.com',
    cus_add1: 'Dhaka',
    cus_add2: 'Dhaka',
    cus_city: 'Dhaka',
    cus_state: 'Dhaka',
    cus_postcode: '1000',
    cus_country: 'Bangladesh',
    cus_phone: '01711111111',
    cus_fax: '01711111111',
    ship_name: 'Customer Name',
    ship_add1: 'Dhaka',
    ship_add2: 'Dhaka',
    ship_city: 'Dhaka',
    ship_state: 'Dhaka',
    ship_postcode: 1000,
    ship_country: 'Bangladesh',
  };

  const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
  sslcz.init(data).then(apiResponse => {
    let GatewayPageURL = apiResponse.GatewayPageURL;
    console.log('Redirecting to:', GatewayPageURL);
    res.redirect(GatewayPageURL);
  }).catch(error => {
    console.error('Payment init error:', error);
    res.status(500).send('Payment initialization failed');
  });
});
//Payment Success
payment.post('/success', (req, res) => {
  res.status(200).sendFile(path.join(__dirname,'/views/payment_form.html'));
});

//Payment Failed
payment.post('/fail', (req, res) => {
  console.log('Payment Failed:', req.body);
  res.status(200).sendFile('Payment Failed! Please try again.');
});

//Payment Cancelled
payment.post('/cancel', (req, res) => {
  console.log('Payment Cancelled:', req.body);
  res.status(200).send('Payment Cancelled!');
});

//IPN
payment.post('/ipn', (req, res) => {
  console.log('IPN:', req.body);
  res.status(200).send('IPN received');
});

module.exports=payment;
