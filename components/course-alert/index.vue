<template>
    <div id="course-alert">
        <div class="ce-bg"></div>
        <div class="ce-wrap">
            <div class="ce-container" @click="closePopup">
                <div class="ce-content">
                    <div class="ce-header">
                        <h2 class="ce-header__text">You will now be re-directed to the providers website</h2>
                    </div>
                    <div class="ce-body">
                        <form class="ce-form cf" @submit="submitForm">
                            <!-- <h3>Want to receive CPD email course alerts like this one?</h3>

                            <div class="CPD-checkbox">
                                <input class="custom-checkbox" id="Yes-Please" type="checkbox"  v-model="form.yes_please_box" @click="setCheckBox('1')" >
                                <label for="Yes-Please">Yes Please!</label>
                                <input class="custom-checkbox" id="No-Thanks" type="checkbox"  v-model="form.no_thanks_box" @click="setCheckBox('2')">
                                <label for="No-Thanks">No thanks I don't want to receive relevant course alerts</label>
                            </div> -->

                            <div class="text-center">                            
                                <button class="button float-i button_brand">Continue to website</button>
                            </div>
                            
                            <div class="ce-form__footer">                                
                                
                                <p>
                                    All emails will contain a link in the footer to enable you to unsubscribe at any time.
                                    <br/>
                                    By registering you agree to our <a :href="infoTermsLink"
                                        target="_blank">terms and conditions</a> and <a
                                        :href="cpdBaseUrl" target="_blank">privacy policy.</a>
                                    Your details may be passed on to the course provider to contact you
                                </p>
                            </div>
                        </form>
                    </div>
                    <div class="close-modal">
                        <button
                            title="Close (Esc)" 
                            @click="noThanks()">No thanks<!--  and continue to website   -->
                        </button>
                    </div>
                </div>
            </div>
            <div class="ce-preloader" v-if="!loadData">Loading...</div>
        </div>
    </div>
</template>

<script src="./script.js"></script>
<style lang="scss">@import "../course-alert/style.scss";</style>