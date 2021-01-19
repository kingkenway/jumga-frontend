<template>
  <div class="home w3-contentx w3-center w3-padding">

    <div style="height: 100vh">
      <div class="header-1" style="margin-top: 80px;">
        WELCOME TO JUMGA!
        <hr class="hr" />
      </div>

      <br>
      
      <div class="w3-large w3-padding-large">
        Grow your sales in new markets.
        <br>
        Start selling right away, Create a shop with ease in seconds.
      </div>

      <center>
        <router-link :to="{ name: 'signupmerchant' }" class="">
          <div class="signup-btn w3-padding-large w3-round w3-card-4">
              Get Started <i class="fa fa-chevron-right w3-small"></i>
          </div>
        </router-link>
      </center>

      <!-- <div>
        Selling made simple
      </div> -->
    
      <img style="width: 35em" class="main-image" alt="<a href='https://www.freepik.com/vectors/blue'>Blue vector created by stories - www.freepik.com</a>" src="../assets/home.png">
      <div>
      

      </div>
    
    </div>

    <div class="b2" style="font-size: 30px">
      <br />
      <b>Grow your sales in new markets</b>
      <hr>
      <div class="w3-medium">
        Collect payments across Nigeria, Ghana, Kenya and United Kingdom
        and create new wholesale relationships.
      </div>
    </div>

    <br /><br /><br /><br />


    <div class="w3-row" style="">

      <div class="w3-third w3-padding box">
        <div class="inner-box">
          <span class="w3-large"><b>SELL YOUR PRODUCTS</b></span><hr />
          Grow sales in new markets <br /><br />
          Get real-time data on how products are selling <br /><br />
        </div>
      </div>


      <div class="w3-third w3-padding box">
        <div class="inner-box">
          <span class="w3-large"><b>MARKET YOUR BRAND</b></span><hr />
          Create email campaigns <br /><br />
          Send automatic reorder reminders <br /><br />
        </div>
      </div>
      

      <div class="w3-third w3-padding box">
        <div class="inner-box">
          <span class="w3-large"><b>RUN YOUR BUSININESS</b></span><hr />
          Built-in analytics & insights <br /><br />
          Easy order fulfillment & invoicing <br /><br />
        </div>
      </div>
    
    </div>

    <br /><br />

    <div class="w3-padding w3-contentx w3-row" style="">
      <div class="w3-row">

        <div class="w3-col l6 m6 s12 footer-a">
          Made with <i class="fa fa-heart w3-text-red"></i> in Nigeria. <a href='https://www.freepik.com/vectors/blue'>Blue vector created by stories - www.freepik.com</a>
        </div>

        <div class="w3-col l6 m6 s12 footer-b">
          &copy; 2021 Jumga Technologies. All Rights Reserved.
        </div>

      </div>
      <br>
    </div>






  </div>

</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    // HelloWorld
  }
}
</script>


<style scoped>
.hr{
  margin: 0 auto;
  display: block;
  border-radius: 10px;
  width: 50px;
  border: none;
  border-bottom: 9px solid #ccc;
}

.inner-box{
  /* border: 1px solid #cccccc; */
  border-radius: 4px;
  padding: 16px;
  
  -webkit-box-shadow: 5px 2px 12px -2px rgba(90,136,138,1);
-moz-box-shadow: 5px 2px 12px -2px rgba(90,136,138,1);
box-shadow: 5px 2px 12px -2px rgba(90,136,138,1);
}

.main-image {
  max-width: 100%;
  background-size: contain;
  margin-top: -10px;
}

.header-1{
  font-size: 64px;
}

.footer{
  display:grid; grid-template-columns: repeat(2, 1fr);
}

.footer-a{
  text-align: left;
}

.footer-b{
  text-align: right;
}

.signup-btn{
  background-color: #1d4476cb;
  color: white;
  display: inline-block;
  margin: 0 auto;
}


@media only screen and (max-width: 900px) {
  .header-1{
    font-size: 48px;
  }

  .footer-a{
    text-align: center;
  }

  .footer-b{
    text-align: center;
  }
}

@media only screen and (max-width: 480px) {
  .header-1{
    font-size: 32px;
  }

  .b2{
    margin-top: -90px;
  }

}

</style>