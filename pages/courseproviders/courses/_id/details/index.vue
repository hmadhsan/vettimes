<template>
  <div>

    <MessageInfo
        :updateSuccess="dataUpdateSuccess"
        :updateError="dataUpdateError"
        :http="true"
    ></MessageInfo>

    <div v-if="!form.id">{{ load }}</div>

    <form v-else class="adv-form cm-form" @submit="submit">
<!--      <div class="message-wrapper" v-if="isEmptyObj(credits) && $parent.info.status === 2">-->
<!--        <div class="message message_warning icon-before" data-icon="!" role="alert">-->
<!--          You will need to purchase credits before being able to post the course-->
<!--        </div>-->
<!--      </div>-->

      <div v-if="$parent.info.status === 2">
        <!--<h2>Select your advert type <span class="small required-indicator">&bull;</span></h2>-->
        <div class="cm-form__field cf" :class="{ 'is-required hasFocus': rules.adwProduct }">
        <input type="text" class="hidden" ref="adwProduct">
        <el-row :gutter="20" class="adw-product">
          <el-col :span="24" :xs="24">
            <div class="adv-product__selector">
              <input
                class="adv-product__selector-radio"
                type="radio" id="ProductId_1"
                name="ProductId"
                value="9"
                @change="onChange"
                :checked="checkCredit(1)"
              >
              <label class="adv-product__selector-label" for="ProductId_1">
                <span class="adv-product__selector-name d-block">{{ products.title[9] }}</span>
                <!-- <span class="adv-product__selector-desc d-block"><p>{{ products.description[1] }}</p></span> -->
                <span class="adv-product__selector-price d-block"><p style="color: #15507f;"><b>Publish your course online for 6 months for free with our free package.</b></p></span>
              </label>
            </div>
          </el-col>
          <el-col v-if="rules.adwProduct" :span="24"><span class="required-message">Please select your advert type</span></el-col>
        </el-row>
      </div><br>
      </div>
      <h2>Fill in your advert details</h2>
      <p>If you'd like to add an image or video to your course, or you would like to upgrade your product for a greater response,
        please call us on <a href="callto:(0)1733383534">(0)1733 383534</a> or email us at
        <a href="mailto:cpd@vettimes.co.uk">cpd@vettimes.co.uk</a></p>

      <div class="cm-form__field cf" :class="{ 'is-required hasFocus': rules.title }">
        <label for="courseTitle" class="cm-form__label float-l">Title <span class="small required-indicator">&bull;</span></label>
        <div class="cm-form__input-wrapper float-l ">
          <input @focus="onFocus" ref="title" @blur="onBlur" class="cm-form__input" type="text" id="courseTitle" name="courseTitle" v-model="form.title" value="form.title" require>
          <span class="required-message" v-if="rules.title">Please add your title</span>
        </div>
      </div>
      <div class="cm-form__field cf" >
        <label for="courseRef" class="cm-form__label float-l">Course ref</label>
        <div class="cm-form__input-wrapper float-l">
          <input @focus="onFocus" @blur="onBlur" class="cm-form__input" type="text" id="courseRef" name="courseRef" v-model="form.course_ref" value="form.course_ref" >
        </div>
      </div>
      <div class="cm-form__field cf" >
        <label for="courseDuration" class="cm-form__label float-l">Duration</label>
        <div class="cm-form__input-wrapper float-l">
          <input @focus="onFocus" @blur="onBlur" class="cm-form__input" type="text" id="courseDuration" name="courseDuration" v-model="form.duration" value="form.duration" >
        </div>
      </div>
      <div class="cm-form__field cf" >
        <label for="coursePrice" class="cm-form__label float-l">Price</label>
        <div class="cm-form__input-wrapper float-l">
          <input @focus="onFocus" @blur="onBlur" class="cm-form__input" type="text" id="coursePrice" name="coursePrice" v-model="form.price" value="form.price" >
        </div>
      </div>
      <div class="cm-form__field cf" :class="{ 'is-required hasFocus': rules.description }">
        <label class="cm-form__label float-l">Description <span class="small required-indicator">&bull;</span></label>
        <div class="cm-form__input-wrapper float-l">
          <input type="text" class="hidden" ref="description" >
          <!-- <div id="appEditor">
            <ckeditor
              :editor="editor"
              v-model="form.description"
              :config="editorConfig"
              @focus="onFocusEditor"
              @blur="onBlurEditor"
            ></ckeditor>
          </div> -->
          <div id="appEditor" style="background-color: white">
            <vue-editor 
                v-model="form.description" 
                :editorToolbar="customToolbar"
                @focus="onFocusEditor"
                @blur="onBlurEditor"
              ></vue-editor>
          </div>
          <span class="required-message" v-if="rules.description">Please add your description</span>
        </div>
      </div>
      <div class="cm-form__field cf">
        <label for="courseOverview" class="cm-form__label float-l">Overview</label>
        <div class="cm-form__input-wrapper float-l">
          <el-popover placement="right-start" width="250" trigger="click">
            <b>Optional. </b>This will be displayed in course results listings in favour of the first 150 characters of the description.
            <template slot="reference">
              <textarea
                  class="cm-form__textarea"
                  name="courseOverview"
                  id="courseOverview"
                  maxlength="150"
                  v-model="form.overview"
                  @focus="onFocus"
                  @blur="onBlur"
              ></textarea>
            </template>
          </el-popover>
          <span class="cm-form__textarea-after">{{ 150 - (form.overview || "").length }}</span>
        </div>
      </div>

      <hr class="cm-hr">
      <h2>Course delivery</h2>
      <div class="cm-form__field cf" :class="{ 'is-required hasFocus': rules.startDate }">
        <label class="cm-form__label float-l">Start Date <span class="small required-indicator">&bull;</span></label>
        <div class="cm-form__input-wrapper float-l">
          <el-row :gutter="20">
            <el-col :span="24" :md="12">
              <div class="d-block radio-wrapper">
                <el-radio v-model="form.delivery_start_if" :label="true">Fixed date</el-radio>
              </div>
              <div class="d-block radio-wrapper">
                <el-radio v-model="form.delivery_start_if" :label="false">No fixed date</el-radio>
              </div>
            </el-col>
            <el-col  :span="24" :md="12" v-if="form.delivery_start_if">
              <div class="position-relative">
                <el-date-picker
                    v-model="form.delivery_start"
                    :editable="false"
                    format="dd/MM/yyyy"
                    value-format="yyyy-MM-dd"
                    ref="startDate"
                />
                <i class="date-picker__icon icon-before" data-icon=""></i>
              </div>

            </el-col>
          </el-row>
          <span class="required-message" v-if="rules.startDate">Please choose your start date</span>
        </div>

      </div>
      <div class="cm-form__field cf" :class="{ 'is-required hasFocus': rules.delivery }">
        <label class="cm-form__label float-l">Delivery <span class="small required-indicator">&bull;</span></label>
        <div class="cm-form__input-wrapper float-l">
          <el-row :gutter="20">
            <el-col :span="24" :md="12">
              <div class="d-block radio-wrapper">
                <el-radio checked v-if="deliveryMethod">Specific location</el-radio>
                <el-radio v-else v-model="form.delivery_method" label="">Specific location</el-radio>
              </div>
              <div class="d-block radio-wrapper">
                <el-radio v-model="form.delivery_method" label="Online">Online</el-radio>
              </div>
              <div class="d-block radio-wrapper">
                <el-radio v-model="form.delivery_method" label="Distance">Distance (Other)</el-radio>
              </div>
            </el-col>
            <el-col :span="24" :md="12">
              <el-input v-model="form.delivery_method" v-if="deliveryMethod" ref="delivery"/>
            </el-col>
          </el-row>
          <span class="required-message" v-if="rules.delivery">Please choose your delivery method</span>
        </div>
      </div>
      <div class="cm-form__field cf" :class="{ 'is-required hasFocus': rules.booking_url }">
        <label for="courseBooking" class="cm-form__label float-l">Booking Url <span class="small required-indicator">&bull;</span></label>
        <div class="cm-form__input-wrapper float-l">
          <input @focus="onFocus" ref="booking_url" @blur="onBlur" @change="validateUrl(form.booking_url, $event)" class="cm-form__input" type="url" id="courseBooking" name="courseBooking" v-model="form.booking_url" value="form.booking_url" require>
          <span class="required-message" v-if="rules.booking_url">Please add your booking url</span>
        </div>
      </div>

      <hr class="cm-hr">
      <h2>General enquiries</h2>
      <div class="cm-form__field cf" >
        <label for="courseContact" class="cm-form__label float-l">Contact Name</label>
        <div class="cm-form__input-wrapper float-l">
          <input @focus="onFocus" @blur="onBlur" class="cm-form__input" type="text" id="courseContact" name="courseContact" v-model="form.contact" value="form.contact" >
        </div>
      </div>
      <p>Please complete at least one of the following <span class="small required-indicator">&bull;</span></p>
      <div :class="{ 'is-required hasFocus': rules.atLeast }">
        <div class="cm-form__field cf" >
          <label for="courseEmail" class="cm-form__label float-l">Email</label>
          <div class="cm-form__input-wrapper float-l">
            <input ref="atLeast" @focus="onFocus" @blur="onBlur" class="cm-form__input" type="email" id="courseEmail" name="courseEmail" v-model="form.email" value="form.email" >
          </div>
        </div>
        <div class="cm-form__field cf" >
          <label for="courseWebsite" class="cm-form__label float-l">Website</label>
          <div class="cm-form__input-wrapper float-l">
            <input @focus="onFocus" @blur="onBlur" @change="validateUrl(form.site, $event)" class="cm-form__input" type="url" id="courseWebsite" name="courseWebsite" v-model="form.site" value="form.site" >
          </div>
        </div>
        <div class="cm-form__field cf" >
          <label for="courseTelephone" class="cm-form__label float-l">Telephone</label>
          <div class="cm-form__input-wrapper float-l">
            <input @focus="onFocus" @blur="onBlur" class="cm-form__input" type="text" id="courseTelephone" name="courseTelephone" v-model="form.phone" value="form.phone" >
            <span class="required-message" v-if="rules.atLeast">Please add one of general enquiries</span>
          </div>
        </div>

      </div>

      <hr class="cm-hr">
      <h2>Advert settings</h2>
      <div class="cm-form__field cf" :class="{ 'is-required hasFocus': rules.advert }">
        <label class="cm-form__label float-l">From <span class="small required-indicator">&bull;</span></label>
        <div class="cm-form__input-wrapper float-l">
          <el-row :gutter="20">
            <el-col :span="24" :md="12">
              <div class="position-relative">
                <el-date-picker                                     
                  v-model="form.posting_from"
                  placeholder="From"
                  :editable="false"
                  format="dd/MM/yyyy"
                  value-format="yyyy-MM-dd"
                  @blur="onElBlur"
                  @focus="onElFocus"
                  @change="addMonthsForTo"
                  :disabled="disableFromDate"
                />
                <i class="date-picker__icon icon-before" data-icon=""></i>
              </div>
            </el-col>
            <el-col :span="24" :md="12">
              <div class="position-relative">
                
                <el-date-picker                                  
                  v-model="form.posting_to"
                  placeholder="To"
                  :editable="false"
                  format="dd/MM/yyyy"
                  value-format="yyyy-MM-dd"
                  @blur="onElBlur"
                  @focus="onElFocus"
                  :picker-options="pickerOptions"
                  :disabled="disableToDate"
                />                
                <i class="date-picker__icon icon-before" data-icon=""></i>
              </div>
            </el-col>
          </el-row>
          <span class="required-message" v-if="rules.advert">Please choose advert settings</span>
        </div>
      </div>

      <div class="cm-btn-container cf" >
        <el-row :gutter="30">
          <el-col :md="8">&nbsp;</el-col>
          <el-col :md="8">
            <button type="submit" class="button button_brand button_larger">Save</button>
          </el-col>
          <el-col :md="8">
            <button type="button" class="button button_brand button_larger" @click="submit(true)">Next</button>
          </el-col>
        </el-row>
      </div>
    </form>

    <!-- <transition name="fade">
      <Payment v-if="addCredits" />
    </transition> -->

  </div>
</template>

<script src="./script.js"></script>
