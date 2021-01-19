# Flutterwave Developer Challenge (J.U.M.G.A)  

## Table of Contents
[Live URL](https://jumgaapp.netlify.app/)  

[TL;DR](#image-timeline-of-the-flutterwave-developer-challenge) 

[Introduction](#introduction) 

[Cont'd](#contd) 

[Implementation](#implementation) 

[Epilogue](#epilogue) 

[Image Timeline of the Flutterwave Developer Challenge](#image-timeline-of-the-flutterwave-developer-challenge)  

[Installation](#installation)  


### Introduction  

<img src="https://i.ibb.co/1Kz7T8Q/17-home.png" style="width: 100%">  
(Home Page)
<br /><br />

[Project Jumga](https://jumgaapp.netlify.app/) is a Full stack application, powered with VueJS as the frontend and [Django as the backend](https://github.com/kingkenway/jumga/).
It is a payment system powered by flutterwave, to help Merchants grow their businesses with ease.

### Overview
1.) Firstly, a Merchant [signs up](https://jumgaapp.netlify.app/signup/merchant) for free, afterwards the Merchant is able to create as many shops as possible for as low as $20 each on approval. This amount is credited instantly to JUMGA'S account, which can be viewed through this [page.](https://jumgaapp.netlify.app/admin/transactions)  

2.) Upon payment confirmation, the shop is assigned a rider automatically and is also allowed to add products to his/her shop and can also go Live instantly for customers to make their purchases.
Also, when a Merchant signs up, he is faced with a selection box to pick any country of his choice between Nigeria, Ghana, Kenya and the United Kingdom.
Whatever country that is picked becomes the base currency for his/her shop and its products.  

3.) Once the products of an approved shop is listed by the merchant, such shop can be viewed live for customers to checkout with a form where they fill in their delivery details, with country choices ranging from Ghana, Nigeria, Kenya and UK, to make purchases.
Also Merchants can view all available orders, whether paid or cancelled on his dashboard.  
  
4.) An Admin Merchant account has been created for JUMGA already, with the following credentials: Email: "jumga@gmail.com", Password: "aaaassss".
It is through this account that all earnings from the proceeds of Shop Approvals, Commision from Sales and Commision from Delivery are being remitted.  
  
5.) From the MVP requirements, no commission ratio was stated for Sales and Delivery, thus the following commission from the given example in the MVP requirements, was assumed, and was shared as follows:  

```
### Sales
MERCHANT'S COMMISSION ON SALE = 97.4%  
JUMGA'S COMMISSION ON SALE = 2.6%  
### Delivery
RIDER'S DELIVERY COMMISSION = 80%  
JUMGA'S DELIVERY COMMISSION = 20%  
```
  
### Cont'd
Through this [link](https://jumgaapp.netlify.app/admin/transactions), Jumga as the sovereign will be able to view every single transaction on the database, alongside with all of Jumga's earnings and also every single order on the database.  

### Implementation  
1. The first instance where the Flutterwave package was initialized is [here](https://github.com/kingkenway/jumga-frontend/blob/master/src/main.js#L10) on line 10, 13 and 14.  

2. The second implementation of flutterwave on Shop Approval, can be found on this [link](https://github.com/kingkenway/jumga-frontend/blob/master/src/views/Merchant/ShopDetail.vue#L106) from line 106 to line 149.  

3. The third implementation on Checkout, can be found on this [link](https://github.com/kingkenway/jumga-frontend/blob/master/src/views/Shop/Checkout.vue#L260) from line 260 to line 305.  

4. The business logic where all transactions and payments resides, can be found [here](https://github.com/kingkenway/jumga/blob/master/jumga/apps/merchant/models.py#L324) from line 324 to line 408.  

## Epilogue  
The overall developer challenge for this project can be viewed live on this [link](https://jumgaapp.netlify.app/).  
Please note that the developer account connected to this project is in Test mode. Therefore to run any transactions, please use the test cards provided on this [flutterwave test cards page.](https://developer.flutterwave.com/docs/test-cards)  
N.B The database is populated with 5 riders for purpose as the Marketplace Delivery men:  

1. driverabel@gmail.com	Driver Abel	Benson  
2. driverbayo@gmail.com	Driver Bayo	Dan  
3. driverchris@gmail.com	Driver Chris	Ahmed  
4. driverdavid@gmail.com	Driver David	Martins  
5. driverenoch@gmail.com	Driver Enoch Ayo  

Also once again, please note that after each transaction, you can use this [link](https://jumgaapp.netlify.app/admin/transactions) to view all transactions and the sharing history to Jumga, the Riders, the Merchants and the Shop approval fee.

## Image Timeline of the Flutterwave Developer Challenge  
1. Merchant Signup Page  
![Merchant Signup Page](https://i.ibb.co/PwC8LcQ/1-signup.png)  

2. Merchant Dashboard Page  
![Merchant Dashboard Page](https://i.ibb.co/8gxXPy3/2-dashboard.png)  

3. Merchant Create Shop Page  
![Merchant Create Shop Page](https://i.ibb.co/JztvKvn/3-create-shop.png)  

4. Shop created awaiting approval  
![Shop created awaiting approval](https://i.ibb.co/X5K4ynV/4-shop-awaiting-approval.png)  

5. Shop display after payment on approval  
![Shop display after payment on approval](https://i.ibb.co/F8WCb8b/5-shop-display-after-approval.png)  

6. New Product Page  
![New Product Page](https://i.ibb.co/yRVXMzY/6-new-product-page.png)  

7. Shop display with Products  
![Shop display with Products](https://i.ibb.co/qx5VQkZ/7-shop-display-with-products.png)  

8. Shop live  
![Shop live](https://i.ibb.co/34WS4Lg/8-shop-live.png)  

9. Shop live with added cart  
![Shop live with added cart](https://i.ibb.co/5j3KByc/9-shop-with-added-carts.png)  

10. Shop with delivery info  
![Shop with delivery info](https://i.ibb.co/F035MdY/10-shop-with-delivery-info.png)  

11. Checkout page  
![Checkout page](https://i.ibb.co/y6FFTbn/11-shop-with-check-out-info.png)  

12. Order Success page  
![Order Success page](https://i.ibb.co/NLtjj4f/12-order-success.png)  

13. Customer order tracking page  
![Shop with delivery info](https://i.ibb.co/YXbQ602/13-customer-order-tracking-page.png)  

14. Jumga's Admin view for all Transactions for recipients  
![Jumga's Admin view for all Transactions for recipients](https://i.ibb.co/X4J1Ghr/14-jumga-s-view-for-all-transactions.png)  

15. Jumga's Admin view for Jumga's Earnings  
![Jumga's Admin view for Jumga's Earnings](https://i.ibb.co/QjW6LvL/15-jumga-s-view-for-jumga-s-earnings.png)  

16. Jumga's Admin view for All Orders  
![Jumga's Admin view for All Orders](https://i.ibb.co/Wx2qjdd/16-jumga-s-view-for-all-orders.png)  



## Installation

The first thing to do is to clone the repository:


```sh
$ git clone https://github.com/kingkenway/jumga-frontend.git
$ cd jumga-frontend
```

## Local Environment Variables
VUE_APP_URL=https://jumga-backend-tada.herokuapp.com/api/v1/  
VUE_APP_BASE_URL=https://jumga-backend-tada.herokuapp.com/  
VUE_APP_FLW_PUBLICKEY=FLWPUBK_TEST-6cbece25a898743b4604bcee583de09b-X  

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn run build
```

