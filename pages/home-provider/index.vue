<template>

  <div id="home-provider">

    <div class="content">
      <div class="banner">
        <div class="row">
          <h1 class="title">Advertise your <br /> course with us...</h1>
          <h2>and reach every sector of <br /> the veterinary profession</h2>
          <!--<p><button class="button button_larger button_callback" @click="dialogFormVisible = true">Request a callback</button></p>-->

          <router-link to="/courseproviders/courses/new" class="button button_larger button_callback"
            v-if="[2,3].indexOf($store.state.auth.role) > -1">Upload a Course Now</router-link>

          <div class="btn-group" v-if="!([2,3].indexOf($auth().role) > -1)">
            <!-- <a :href="loginTo+`?redirectTo=`+redirectTo" class="banner-btn">Sign in</a>
            <a :href="registerTo+`?redirectTo=${redirectTo}`" class="banner-btn">Register</a> -->
            <a href="javascript:void(0);" @click="$scrollToElement('why-choose-us')" class="banner-btn">Find out
              more</a>
          </div>
        </div>
      </div>

      <section class="CPD-why-choose-us" id="why-choose-us">
        <div class="row">
          <h1>Why choose us?</h1>
          <div class="home-blocks cf">
            <div class="why-choose-us">
              <h3>500+</h3>
              <p>live courses*</p>
            </div>
            <div class="why-choose-us">
              <h3>22,000</h3>
              <p> course views*</p>
            </div>
            <div class="why-choose-us">
              <h3>10,000</h3>
              <p>active course seekers*</p>              
            </div>
          </div>
          <p class="days">*1/9/19 - 30/11/19</p>
        </div>
      </section>

      <section class="CPD-benefits">
        <div class="row">
          <div class="home-blocks cf">

            <div class="CPD-benefit">
              <div class="CPD-benefit-icon">
                <img src="../../img/user.svg">
              </div>
              <div class="CPD-content">
                <h4>Reach more veterinary professionals online!</h4>
                <p>As you can see we have a huge number of users coming to our site and interacting with our
                  courses. Therefore you know your course will be
                  in the best place to be seen!</p>
              </div>
            </div>

            <div class="CPD-benefit">
              <div class="CPD-benefit-icon">
                <img src="../../img/user-clock.svg">

              </div>
              <div class="CPD-content">
                <h4>It’s quick and easy</h4>
                <p>Our newly transformed website allows you to register and post courses when ever you want with our
                  completely self-serve platform. Don’t worry we are still here if you want to talk to us.</p>
              </div>
            </div>
          </div>
          <div class="home-blocks cf">
            <div class="CPD-benefit">
              <div class="CPD-benefit-icon">
                <img src="../../img/vt.svg">

              </div>
              <div class="CPD-content">
                <h4>Vettimes.co.uk</h4>
                <p>Did you know our CPD site is actually a micro site off vettimes.co.uk and can be accessed from there
                  directly? vettimes.co.uk has over 70,000 users a month visit the site?</p>
              </div>
            </div>

            <div class="CPD-benefit">
              <div class="CPD-benefit-icon">
                <img src="../../img/heart-box.svg">

              </div>
              <div class="CPD-content">
                <h4>More options than ever</h4>
                <p>We have new enhancement packages for all budgets and needs allowing you even more
                  options than ever to reach your audience.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section class="CPD-packages" id="packages">
        <div class="row">
          <h1>View our packages</h1>
          <div class="package-wrapper">
            <div class="package">
              <h2 class="package__header free">Free CPD Listing</h2>
              <ul class="package__list">
                <p>Showcase your course online to our mass audience with ease. You can do this whenever and wherever
                  you want with our self-serve system.</p>
                <div>
                  <input type="checkbox" class="read-more-state" id="package-free" />
                  <ul class="read-more-wrap">
                    <p class="read-more-target included">Included</p>
                    <li class="read-more-target">Online course listing for 6 months</li>
                    <li class="read-more-target">Included in course alerts</li>
                  </ul>
                  <label for="package-free" class="read-more-trigger"></label>
                </div>
              </ul>
              <h3 class="package__price">FREE</h3>
              <a :href="buyTo" class="buy-btn">BUY</a>
            </div>
            <div class="package">              
              <h2 class="package__header bronze">BRONZE</h2>
              <ul class="package__list">
                <p>Let's make your course stand out above the rest online and also by course alerts. This will drive
                  even more people to view your course.</p>
                <div>
                  <input type="checkbox" class="read-more-state" id="package-bronze" />
                  <ul class="read-more-wrap">
                    <p class="read-more-target included">Included</p>
                    <li class="read-more-target">Online course listing for 12 months</li>
                    <li class="read-more-target">Included in course alerts</li>
                    <li class="read-more-target">‘Bronze’ logo and coloured border (1month)</li>
                  </ul>
                  <label for="package-bronze" class="read-more-trigger"></label>
                </div>
              </ul>
              <h3 class="package__price">£50</h3>
              <p>
                <b>33% view increase from Free*</b>
              </p>
              <a :href="buyTo" class="buy-btn">BUY</a>
            </div>
            <div class="package most-popular-package">
              <span class="most-popular">Most popular</span>
              <h2 class="package__header silver">SILVER</h2>
              <ul class="package__list">
                <p>Extend your course reach even further by combining online with our print publications that reach a
                  combined audience of over 33,000 readers.</p>
                <div>
                  <input type="checkbox" class="read-more-state" id="package-silver" />
                  <ul class="read-more-wrap">
                    <p class="read-more-target included">Included</p>
                    <li class="read-more-target">Online course listing for 12 months</li>
                    <li class="read-more-target">Included in course alerts</li>
                    <li class="read-more-target">2 x 2 print advert for a month (up to 4 adverts)</li>
                  </ul>
                  <label for="package-silver" class="read-more-trigger"></label>
                </div>
              </ul>
              <h3 class="package__price">£100</h3>
              <p>
                <b>80% view increase from Bronze*</b>
              </p>
              <a :href="buyTo" class="buy-btn">BUY</a>
            </div>
            <div class="package">
              <h2 class="package__header gold">Gold</h2>
              <ul class="package__list">
                <p>Give your course maximum exposure by utilising all channels to get your course in front of the right
                  audience. There's no better way to fill your course.</p>
                <div>
                  <input type="checkbox" class="read-more-state" id="package-gold" />
                  <ul class="read-more-wrap">
                    <p class="read-more-target included">Everything else plus</p>
                    <li class="read-more-target">Social media boost</li>
                    <li class="read-more-target">Hot sales leads</li>
                    <li class="read-more-target">Top of course speciality<br/>(1 month)</li> 
                    <li class="read-more-target">Featured course on homepage (1 month)</li>
                  </ul>
                  <label for="package-gold" class="read-more-trigger"></label>
                </div>
              </ul>
              <h3 class="package__price">£250</h3>
              <p>
                <b>300% view increase from Bronze*</b>
              </p>
              <a :href="buyTo" class="buy-btn">BUY</a>
            </div>
            <!-- <div class="package">
              <h2 class="package__header platinum">Platinum</h2>
              <ul class="package__list">
                <p>Give your course maximum exposure by utilising all channels to get your course in front of the right
                  audience. There's no better way to fill your course.</p>
                <div>
                  <input type="checkbox" class="read-more-state" id="package-platinum" />
                  <ul class="read-more-wrap">
                    <p class="read-more-target included">Everything else plus</p>
                    <li class="read-more-target">Social media boost</li>
                    <li class="read-more-target">Hot sales leads</li>
                    <li class="read-more-target">Top of course speciality<br/>(1 month)</li> 
                    <li class="read-more-target">Featured course on homepage (1 month)</li>
                  </ul>
                  <label for="package-platinum" class="read-more-trigger"></label>
                </div>
              </ul>
              <h3 class="package__price">£250</h3>
              <p>
                <b>300% view increase from Bronze*</b>
              </p>
              <a :href="buyTo" class="buy-btn">BUY</a>
            </div> -->
          </div>

          <h3>Still not sure what package would be best for you? Call us now for a free consultation</h3>
          <div class="phone-number">
            <a href="javascript:void(0);">01733 383534</a>
            <p>*Based on the average difference over a 4 week period</p>
          </div>
        </div>
      </section>

      <section class="CPD-testimonial" v-if="page['testimonials']">
        <div class="row">
          <h1>What our clients are saying…</h1>

          <el-carousel indicator-position="none">            

            <el-carousel-item name ='first' v-for="item in page['testimonials'].slice(0, 6)" :key="item.id">

              <blockquote>
                <!-- <span v-if="item.overview">{{ item.overview }}</span> -->
                <p v-if="item.body">“{{ item.body.replace(/(<([^>]+)>)/ig, '') }}”</p>
                <span v-if="item.author">{{ item.author }}</span>
              </blockquote>              
                
            </el-carousel-item>

          </el-carousel>
          
        </div>
      </section>

      <section class="CPD-clients" v-if="page['featured-provider-logos']">
        <div class="row">
          <h1>Just some of our clients</h1>
          <div class="clients-logo">
            <div class="provider-logo" v-for="item in page['featured-provider-logos']" :key="item.id">
              <img v-if="item.image" :src="item.image_data.url" />
              <img v-else src="../../img/missing.png">
            </div>
          </div>
        </div>
      </section>

      <!-- <section class="CPD-clients">
        <div class="row">
          <h1>just some of our clients</h1>
          <div class="clients-logo">
            <div class="provider-logo">
              <img src="../../img/clint01.gif" />
            </div>
            <div class="provider-logo">
              <img src="../../img/clint02.jpg" />
            </div>
            <div class="provider-logo">
              <img src="../../img/clint03.jpg" />
            </div>
            <div class="provider-logo">
              <img src="../../img/clint04.jpg" />
            </div>
            <div class="provider-logo">
              <img src="../../img/clint05.gif" />
            </div>
            <div class="provider-logo">
              <img src="../../img/clint06.gif" />
            </div>
          </div>
        </div>
      </section> -->

    </div>
    <el-dialog title="Request a callback" :visible.sync="dialogFormVisible">
      <p><strong>This will send an email directly to our team, who will call you back as soon as possible.</strong></p>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="form-validate form-responsive">
        <el-form-item label="Your name" prop="name">
          <el-input v-model="ruleForm.name" type="text" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Your telephone number" prop="phone">
          <el-input v-model.number="ruleForm.phone" type="tel" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Your email address" prop="email">
          <el-input v-model="ruleForm.email" type="email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Your company">
          <el-input v-model="ruleForm.company" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Message">
          <el-input v-model="ruleForm.message" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button class="button button_brand" @click="submitForm('ruleForm')">Request call back</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script src="./script.js"></script>
<style lang="scss">@import "style";</style>