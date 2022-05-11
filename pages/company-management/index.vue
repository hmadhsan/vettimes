<template>
    <div id="company-management">
        <div class="content">
            <template > <!-- v-if="!notAuth" -->
                <div class="site-title-wrapper">
                  <h1 class="site-title">Provider information</h1>
                </div>
                <div class="row">
                    <div class="inner">
                        <!-- <p>If you'd like to add an image or video to your provider information, or you would like to upgrade your display options for a greater exposure, please call us on
                            <a :href="`tel:${content.phoneCompany}`">{{ content.phoneCompany }}</a> or email us at <a
                                :href="`mailto:${content.emailCompany}`">{{ content.emailCompany }}</a></p> -->
                        <p>In this section please enter all the information about your CPD provider.</p>
                        <p><router-link to="/courseproviders/payments">Payments history page</router-link></p>

                        <form
                            class="cm-form"
                            @submit="formSubmit"
                        >
                            <div class="cm-form__field cf" >
                                <label for="providerName" class="cm-form__label float-l">{{ content.name.title }} <span class="small required-indicator">&bull;</span></label>
                                <div class="cm-form__input-wrapper float-l">
                                    <input @focus="onFocus" @blur="onBlur" class="cm-form__input" type="text" id="providerName" name="providerName" v-model="content.name.content" value="content.name.content" require>
                                </div>
                            </div>
                            <div class="cm-form__field cf" >
                                <label class="cm-form__label float-l">{{ content.description.title }} <span class="small required-indicator">&bull;</span></label>
                                <div class="cm-form__input-wrapper float-l">
                                    <!-- <div id="appEditor">
                                        <ckeditor
                                            :editor="editor"
                                            v-model="content.description.content"
                                            :config="editorConfig"
                                            @focus="onFocusEditor"
                                            @blur="onBlurEditor"
                                        ></ckeditor>
                                    </div> -->
                                    <div id="appEditor">
                                        <vue-editor 
                                            v-model="content.description.content" 
                                            :editorToolbar="customToolbar"
                                            @focus="onFocusEditor"
                                            @blur="onBlurEditor"
                                        ></vue-editor>
                                    </div>
                                </div>
                            </div>
                            <div class="cm-form__field cf">
                                <label for="providerOverview" class="cm-form__label float-l">{{ content.overview.title }}</label>
                                <div class="cm-form__input-wrapper float-l">
                                    <textarea
                                        class="cm-form__textarea"
                                        name="providerOverview"
                                        id="providerOverview"
                                        maxlength="150"
                                        v-model="content.overview.content"
                                        @focus="onFocus"
                                        @blur="onBlur"
                                    ></textarea>
                                    <span class="cm-form__textarea-after">{{ 150 - (content.overview.content || "").length }}</span>
                                </div>
                            </div>

                            <div class="cm-form__field cf">
                                <label for="providerLogo" class="cm-form__label float-l">{{ content.providerLogo.title }}</label>
                                <el-form :model="content" autocomplete="off">
                                    <div class="cm-form__input-wrapper float-l">
                                        <el-form-item>
                                            <div class="image"  @click="change" style="cursor: pointer">
                                                <img v-if="content.logo_data" :src="content.logo_data.url" />
                                                <img v-else src="../../img/missing.png" />
                                            </div>
                                            <div class="text-r">                                            
                                                <el-button type="text" @click="remove">Remove</el-button>
                                                <el-button type="text" @click="change">Change</el-button>
                                            </div>
                                            <input type="hidden" v-model="content.logo" />
                                        </el-form-item>
                                    </div>
                                </el-form>
                            </div>

                            <div class="cm-form__field cf" v-if="(($auth().role) !== 2)" style="text-align: right;"> 
                                <span class="small required-indicator">&bull;</span>                                
                                <input type="checkbox" class="cm-form__checkbox custom-checkbox" id="cpd_certify" name="cpd_certify" v-model="content.cpd_certify.content">
                                <label class="cm-form__label" for="cpd_certify">I certify that I am an approved CPD provider</label>
                            </div>

                            <hr class="cm-hr">
                            <h2>{{ content.course_enquires_title }}</h2>
                            <div
                                class="cm-form__field cf"
                                v-for="item in content.course_enquires" :key="item.id"
                            >
                                <label :for="`courseEnquiries${item.name}`" class="cm-form__label float-l">{{ item.title }}</label>
                                <div class="cm-form__input-wrapper float-l">
                                    <input @change=" item.title == 'Website' ? validateUrl(item.content, $event) : ''" @focus="onFocus" @blur="onBlur" class="cm-form__input" type="text" :id="`courseEnquiries${item.name}`" :name="`courseEnquiries${item.name}`" v-model="item.content" value="'item.content'">
                                </div>
                            </div>
                            <div class="cm-btn-container cf">
                                <button type="submit" class="button button_brand float-r">Save</button>
                            </div>

                        </form>
                        
                    </div>
                </div>

            <!-- <UserManagement style="margin-top:20px" /> -->

            </template>
            <!-- <ProvidersOnly v-else /> -->
        </div>

        <Media />

    </div>
</template>

<script src="./script.js"></script>
<style lang="scss">@import "style";</style>
