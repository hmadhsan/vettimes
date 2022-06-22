<template>
    <div>

        <h2>Make your course stand out?</h2>

        <p>Want to put your course above the rest? Select one of our fantastic enhancement packages below and then click
            pay & publish.</p>

        <div class="course-subscription-block cf">

            <!-- Bronze package -->
            <a class="bronze" :class="changeThemeBronze" href="javascript:void(0);" @click="setTheme('1')">
                <h3 class="bronze-title">Bronze Package</h3>
                <p>Let's make your course stand out above the rest online and also by course alerts. This will drive
                    even more people to view your course.</p>
                <div>
                    <input type="checkbox" class="read-more-state" id="package-bronze" />
                    <ul class="read-more-wrap package-details">
                        <p class="read-more-target included">Included</p>
                        <p class="read-more-target">Online course listing for 12 months</p>
                        <hr class="horizontal-line">
                        <p class="read-more-target">Included in course alerts</p>
                        <hr class="horizontal-line">
                        <p class="read-more-target">‘Bronze’ logo and coloured border (1month)</p>
                    </ul>
                    <label for="package-bronze" class="read-more-trigger"></label>
                </div>
                <div class="package-price"><span>&#163; {{this.prices['t1']}} </span></div>
                <p>
                    <b>33% view increase from Free*</b>
                </p>
                <input class="selected-checkbox" id="bronze-package" type="checkbox" value="1" v-model="bronzePackage">
                <label for="bronze-package"></label>
            </a>

            <!-- Silver package -->
            <a class="silver" :class="changeThemeSilver" href="javascript:void(0);" @click="setTheme('2')">
                <h3 class="silver-title">Silver package</h3>
                <p>Extend your course reach even further by combining online with our print publications that reach a
                    combined audience of over 33,000 readers.</p>
                <div>
                    <input type="checkbox" class="read-more-state" id="package-silver" />
                    <ul class="read-more-wrap package-details">
                        <p class="read-more-target included">Included</p>
                        <p class="read-more-target">Online course listing for 12 months</p>
                        <hr class="horizontal-line">
                        <p class="read-more-target">Included in course alerts</p>
                        <hr class="horizontal-line">
                        <p class="read-more-target">2 x 2 print advert for a month (up to 4 adverts)</p>
                    </ul>
                    <label for="package-silver" class="read-more-trigger"></label>
                </div>
                <div class="package-price"><span>&#163; {{this.prices['t2']}} </span></div>
                <p>
                    <b>80% view increase from Bronze*</b>
                </p>
                <input class="selected-checkbox" id="silver-package" type="checkbox" value="2" v-model="silverPackage">
                <label for="silver-package"></label>
            </a>

            <!-- Gold package -->
            <a class="gold" :class="changeThemeGold" href="javascript:void(0);" @click="setTheme('8')">
                <h3 class="gold-title">Gold package</h3>
                <p>Give your course maximum exposure by utilising all channels to get your course in front of the right
                    audience. There's no better way to fill your course.</p>

                <div>
                    <input type="checkbox" class="read-more-state" id="package-gold" />
                    <ul class="read-more-wrap package-details">
                        <p class="read-more-target included">Everything else plus</p>
                        <p class="read-more-target">Social media boost</p>
                        <hr class="horizontal-line">
                        <p class="read-more-target">Hot sales leads</p>
                        <hr class="horizontal-line">
                        <p class="read-more-target">Top of course speciality<br/>(1 month)</p>                        
                        <hr class="horizontal-line">
                        <p class="read-more-target">Featured course on homepage (1 month)</p>
                    </ul>
                    <label for="package-gold" class="read-more-trigger"></label>
                </div>
                <div class="package-price"><span>&#163; {{this.prices['t8']}} </span></div>
                <p>
                    <b>300% view increase from Bronze*</b>
                </p>
                <input class="selected-checkbox" id="gold-package" type="checkbox" value="8" v-model="goldPackage">
                <label for="gold-package"></label>
            </a>

            <!-- Platinum package -->
            <!-- <a class="platinum" :class="changeThemePlatinum" href="javascript:void(0);" @click="setTheme('4')">
                <h3 class="platinum-title">Platinum package</h3>
                <p>Give your course maximum exposure by utilising all channels to get your course in front of the right
                    audience. There's no better way to fill your course.</p>

                <div>
                    <input type="checkbox" class="read-more-state" id="package-platinum" />
                    <ul class="read-more-wrap package-details">
                        <p class="read-more-target included">Everything else plus</p>
                        <p class="read-more-target">Social media boost</p>
                        <hr class="horizontal-line">
                        <p class="read-more-target">Hot sales leads</p>
                        <hr class="horizontal-line">
                        <p class="read-more-target">Top of course speciality<br/>(1 month)</p>                        
                        <hr class="horizontal-line">
                        <p class="read-more-target">Featured course on homepage (1 month)</p>
                    </ul>
                    <label for="package-platinum" class="read-more-trigger"></label>
                </div>
                <div class="package-price"><span>&#163; {{this.prices['t4']}} </span></div>
                <p>
                    <b>300% view increase from Bronze*</b>
                </p>
                <input class="selected-checkbox" id="platinum-package" type="checkbox" value="9"
                    v-model="platinumPackage">
                <label for="platinum-package"></label>
            </a> -->

        </div>

        <div class="average-difference">
            <p>*Based on the average difference over a 4 week period</p>
        </div>

        <div class="promote-alert">
            <p>Don’t forget we can design you bespoke social media campaigns, personalised e-shots, direct mail and much
                more!</p>
            <p>Call or email us now to see how we can help you promote your course: 01733 383534 or cpd@vettimes.co.uk
            </p>
        </div>

        <div class="payment-details" :class="{ isDisplay: !this.paymentSection }">
            <h2>Payment Details</h2>
            <input type="text" id="cardholder-name" placeholder="Enter name on card" v-model="cardholderName">
            <!-- placeholder for Elements -->
            <div id="card-element"></div>

            <div class="course-posting">
                <h3>Course posting</h3>
                <div class="total-payment">
                    <p>{{ this.packageName }}:<span>&#163;{{ this.packagePrice }} </span></p>
                    <p>VAT:<span>&#163;{{ this.vatPrice }} </span></p>
                    <p class="total-amount">Total:<span>&#163;{{ this.totalPrice }}</span></p>
                </div>
            </div>
        </div>

        <div class="payment-details" :class="{ isDisplay: this.paymentSection }">
            <h2>Payment Details</h2>

            <div class="course-posting">
                <div class="total-payment">
                    <p class="total-amount"><span>Free</span></p>
                </div>
            </div>
        </div>

        <div v-if="loading">
            <Loader />
        </div>

        <!-- controls -->
        <div class="package-btns" v-else-if="!loading">

            <!-- @click="addCredits = true"  -->
            <button type="submit" v-if="this.showButtonPublish" @click="setStatus(1)">Publish</button>
            <button type="submit" v-else @click="chargePayment">Pay & Publish</button>

            <button type="submit" v-if="this.$parent.closeButton" @click="close">Close</button>

            <button type="submit" v-if="(this.old_subscription_plan == this.subscription_plan)"
                @click="saveEnhancement">Save</button>
            <!-- <button type="submit" v-else @click="chargePayment">Save</button> -->
            <button type="submit" v-else-if="(this.paymentSection)" @click="chargePayment">Save</button>

            <router-link v-if="[0,2].indexOf(this.$parent.info.status) > -1" class="preview-link"
                :to="`/course-details/${ this.$parent.info.id}/${ this.$parent.info.slug}/?preview=preview`"
                target="_blank">
                <button type="submit">Preview</button>
            </router-link>

            <button type="submit" @click="$parent.doDelete">Delete</button>
        </div>

        <transition name="fade">
            <Payment v-if="addCredits" />
        </transition>

    </div>
</template>

<style lang="scss">@import "style";</style>

<style>
    .isDisplay {
        display: none;
    }
</style>

<script src="./script.js"></script>