<template>
  <div id="email-courses">
    <div class="popover-content">
      <form class="popover-form" v-on:submit.prevent="submitForm">
        <fieldset class="popover-form__fieldset">
          <h2 class="popover-form__title">{{ content.title }}</h2>
          <div class="form-field">
            <input type="email" id="emailAddress" name="emailAddress" required placeholder="Your email" v-model="form.email">
          </div>
        </fieldset>
        <p>When you create this course alert we will email you a selection of courses matching your criteria. Our <a
            :href="content.termConditionsLink" target="_blank">Terms and Conditions</a> apply to this service.</p>
        <hr class="popover-form-hr">
        <div class="popover-form__footer">
          <p>All emails will contain a link in the footer to enable you to unsubscribe at any time.</p>
        </div>
        <button class="button button_brand icon-before" data-icon="✉">Get course alert</button>
      </form>
    </div>
  </div>
</template>

<script src="./script.js"></script>
<style lang="scss">@import "style";</style>