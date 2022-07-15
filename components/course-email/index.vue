<template>
    <div id="course-email">
        <div class="ce-bg"></div>
        <div class="ce-wrap">
            <div class="ce-container" @click="closePopup">
                <div class="ce-content">
                    <div class="ce-header">
                        <h2 class="ce-header__text">To continue to book this CPD course, please enter your email address
                            below...</h2>
                    </div>
                    <div class="ce-body">
                        <form class="ce-form cf" @submit="submitForm">
                            <input type="hidden" name="courseId" value="0000">
                            <div class="ce-form__field" v-if="!$store.state.mystore.auth">
                                <label class="ce-form__label" for="yourEmailAddress">Email Address<span>
                                        *</span></label>
                                <input type="email" id="yourEmailAddress" name="yourEmailAddress" required
                                    autocomplete="off" v-model="form.email" />
                            </div>

                            <div class="ce-form__footer">                                
                                <div class="CPD-checkbox">
                                    <input class="custom-checkbox" id="custom-checkbox" type="checkbox" value="value1" v-model="form.concern_box"/>
                                    <label for="custom-checkbox">Email me CPD courses like this one</label>
                                </div>                                
                                
                                <div class="text-center">                            
                                    <button class="button float-i button_brand">Submit and continue</button>
                                </div>

                                <p>
                                    All emails will contain a link in the footer to enable you to ubsubscribe at any time.
                                    By registering you agree to our <a :href="infoTermsLink"
                                        target="_blank">terms and conditions</a> and <a
                                        :href="infoTermsLink" target="_blank">privacy policy.</a>
                                    Your details may be passed on to the course provider to contact you
                                </p>                            

                            </div>                            
                        </form>
                    </div>
                    <div class="close-modal">
                        <button 
                            title="Close (Esc)" 
                            @click="closeCourseEmailPopup(true)">No thanks <!-- and continue to website -->  
                        </button>
                    </div> 
                </div>
            </div>
            <div class="ce-preloader" v-if="!loadData">Loading...</div>
        </div>
    </div>
</template>

<script src="./script.js"></script>
<style lang="scss">@import "style";</style>