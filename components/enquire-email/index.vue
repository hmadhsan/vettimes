<template>
    <div id="enquire-email">
        <div class="ee-bg"></div>
        <div class="ee-wrap">
            <div
                class="ee-container"
                @click="closePopup"
            >
                <div class="ee-content">
                    <div class="ee-header">
                        <h2 class="ee-header__text">{{ content.title }}</h2>
                    </div>
                    <div class="ee-body">
                        <form class="ee-form cf" @submit="submitForm">
                            <input type="hidden" name="courseId" value="0000">
                            <div class="ee-form__field" v-if="!$store.state.auth">
                                <label class="ee-form__label" for="yourEmailAddress">{{ content.labelEmail }}</label>
                                <input type="email" id="yourEmailAddress" name="yourEmailAddress" required autocomplete="off" v-model="form.email">
                            </div>
                            <div class="ee-form__field">
                                <label class="ee-form__label" for="yourMessage">{{ content.labelMessage }}</label>
                                <textarea name="yourMessage" id="yourMessage" v-model="form.message" required placeholder="Please send me more information about…"></textarea>
                            </div>
                            <div class="ee-form__footer">
                                <p>When you enquire for a course, we will send your enquiry to the named provider, who may contact you. By enquiring for a course listed on vet times CPD you agree to our <a :href="content.termConditionsLink" target="_blank">terms and conditions</a></p>
                                <br>
                                <p>All emails will contain a link in the footer to enable you to unsubscribe at any time.</p>
                            </div>
                            <button class="button button_brand">Send enquiry</button>
                        </form>
                    </div>
                    <button
                        title="Close (Esc)"
                        class="ee-close icon-before"
                        data-icon="x"
                        @click="closeEnquireEmailPopup"
                    ></button>
                </div>
            </div>
            <div class="ee-preloader" v-if="!loadData">Loading...</div>
        </div>
    </div>
</template>

<script src="./script.js"></script>
<style lang="scss">@import "style";</style>