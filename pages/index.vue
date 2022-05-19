<template>

  <div id="home">

    <div class="content">

      <div class="banner">
        <div class="row">
          <h1 class="title">Search for your next CPD course now</h1>
        </div>
        <div class="search">
          <div class="row">
            <transition name="fade" mode="out-in">
              <RemoteSearch 
                v-if="listLoad" 
                :keywords="keywords" 
                :catList="$store.state.searchList"
                :categoriesObj="$store.state.categories" 
                :catsSlugsName="$store.state.categoriesSlugsName"
                pagePosition="home">
              </RemoteSearch>
            </transition>
          </div>
        </div>
      </div>

      <section class="CPD-browse-courses">
        <div class="row">
          <h1>Browse courses by job role</h1>
        </div>
        <div class="row d-flex">
          <div class="home-blocks CPD-courses cf">
            <div class="CPD-browse-course">
              <nuxt-link :to="`/courses/veterinary-surgeon`">
                <div class="CPD-browse-course-img"> <img src="../img/Veterinary-Surgeons.jpg"></div>
                <h3>Veterinary Surgeons</h3>
              </nuxt-link>
            </div>
            <div class="CPD-browse-course">
              <nuxt-link :to="`/courses/veterinary-nurse`">
                <div class="CPD-browse-course-img"> <img src="../img/veterinary-nurses.jpg"></div>
                <h3>Veterinary Nurses</h3>
              </nuxt-link>
            </div>
            <div class="CPD-browse-course">
              <nuxt-link :to="`/courses/equine-vet`">
                <div class="CPD-browse-course-img"> <img src="../img/Equine-vets.jpg"></div>
                <h3>Equine vets</h3>
              </nuxt-link>
            </div>
            <div class="CPD-browse-course">
              <nuxt-link :to="`/courses/receptionist`">
                <div class="CPD-browse-course-img"> <img src="../img/Receptionist.jpg"></div>
                <h3>Receptionist</h3>
              </nuxt-link>
            </div>
            <div class="CPD-browse-course">
              <nuxt-link :to="`/courses/manager`">
                <div class="CPD-browse-course-img"> <img src="../img/manager.jpg"></div>
                <h3>Manager</h3>
              </nuxt-link>
            </div>
            <div class="CPD-browse-course">
              <nuxt-link :to="`/courses/student`">
                <div class="CPD-browse-course-img"> <img src="../img/student.jpg"></div>
                <h3>Student</h3>
              </nuxt-link>
            </div>

          </div>
          <div class="CPD-hot-course home-blocks cf">
            <a :href="cpdPlusUrl" target="_blank">
              <div class="CPD-hot-course-img"> <img src="../img/cpd-plus-360x420.jpg"></div>
            </a>
          </div>
        </div>
      </section>

      <section class="CPD-featured-courses">
        <div class="row" v-if="page['featured-course'] || page['top-courses-heading']" >
          <h1>Featured courses</h1>
          <div class="home-blocks cf">

              <div class="CPD-featured-course" v-for="item in page['featured-course'].slice(0, 4)" :key="item.id" v-if="item.course">
                
                <nuxt-link
                    :to="`/course-details/${item.course}/${item.course_data.slug}/`">

                  <div class="CPD-featured-course-title">
                    <h4 v-if="item.heading">{{ item.heading }} </h4>
                  </div>
                  
                  <p class="desc">
                    <span v-if="item.course_data.overview">{{ item.course_data.overview }}</span> 
                    <span v-else-if="item.course_data.description" v-html="item.course_data.description"></span>   
                    <span v-else>-</span>
                  </p>
                  <hr />
                  <div class="provided-by">
                    <p>Provided by</p>
                    <img v-if="item.provider_data && item.provider_data.logo_data" :src="item.provider_data.logo_data.url">
                    <img v-else src="../img/missing.png">
                  </div>

                </nuxt-link>
                
                <el-popover v-if="checkAuth()"
                            placement="top"
                            width="170"
                            trigger="click">

                  <div class="popover-content">
                    <p>You need to <a :href="'https://my.vettimes.co.uk/login?redirectTo='+location">sign in as user</a> to save a course.</p>
                  </div>
                  
                  <span aria-describedby="el-popover-1051" tabindex="0" slot="reference" class="star-icon">
                    <i data-icon="☆" title="Save course" class="icon-after"></i> 
                  </span>
                  
                </el-popover>
                  
                <span v-else class="star-icon" aria-describedby="el-popover-1051" tabindex="0" @click="courseProcess(item.course_data.id, !isStar(item.course_data.id))">
                  <i v-if="!isStar(item.course_data.id)" data-icon="☆" class="icon-after" title="Save course"></i>
                  <i v-else data-icon="★" class="icon-after" title="Remove saved course"></i>
                </span>

              </div>

          </div>
        </div>
      </section>

      <section class="CPD-inspirations">
        <div class="row">
          <h1>Looking for inspiration?</h1>
          <div class="home-blocks cf">
            <div class="CPD-inspiration">
              <nuxt-link :to="`/courses/online`">
                <div class="CPD-inspiration-img"> <img src="../img/online-course.jpg"></div>
                <h3>Online course</h3>
              </nuxt-link>
            </div>
            <div class="CPD-inspiration">
              <nuxt-link :to="`/courses/free`">
                <div class="CPD-inspiration-img"><img src="../img/free-course.jpg"></div>
                <h3>Free courses</h3>
              </nuxt-link>
            </div>
            <div class="CPD-inspiration">
              <nuxt-link :to="`/courses/webinar`">
                <div class="CPD-inspiration-img"><img src="../img/webinar.jpg"></div>
                <h3>Webinars</h3>
              </nuxt-link>
            </div>
            <div class="CPD-inspiration">
              <nuxt-link :to="`/courses/attended`">
                <div class="CPD-inspiration-img"><img src="../img/attended.jpg"></div>
                <h3>Attended</h3>
              </nuxt-link>
            </div>
          </div>
        </div>
      </section>

      <section class="CPD-tabs">
        <div class="row">

          <el-tabs type="card" class="tabs">
            
            <el-tab-pane v-for="(cats, key) in filteredCategories" :key="cats.id" :label="key" lazy>
              <ul class="cf click-cat">
                <li v-for="(cat, index) in filterEmptyCats(cats, key).slice(0, 16)" :key="cat.id">
                  <nuxt-link :key="`${cat.slug}-link-${index}`" :to="`/courses/${cat.slug}/`" :data-cat="cat.name"
                    :data-key="key">
                    {{cat.name}}<span> {{ categoriesNumbers[cat.name] }}</span>
                  </nuxt-link>
                </li>
              </ul>
              <div class="select-cat">
                <el-select v-model="category" :placeholder="`select ${key}`" :change="goToLink" >
                  <el-option v-for="(cat, index) in filterEmptyCats(cats, key)" :key="cat.id"
                    :label="`${cat.name} ${categoriesNumbers[cat.name]}`" :data-cat="cat.name" :data-key="key"
                    :value="`/courses/${cat.slug}/`">
                  </el-option>
                </el-select>
              </div>
              <p class="more">
                <nuxt-link to="/browse-courses" data-icon="▶" class="icon-after">View all</nuxt-link>
              </p>
            </el-tab-pane>
          </el-tabs>
          <div class="row-margin grid__item equal-heights__item grid-3">

            <RightAd class="advertisement" />
          </div>

        </div>
      </section>

    <!-- <section class="CPD-articles">
        <div class="row">
      

          <div class="home-blocks cf" v-if="page['article']">
            <div class="CPD-article" v-for="item in page['article']" :key="item.article" v-if="item.article" >
              <nuxt-link :to="`/article-details/${item.article}/${item.heading}`" >
                <div class="CPD-article-img">
                  <img v-if="item.image_data" :src="item.image_data.url">
                  <img v-else src="../img/missing.png">
                </div>
                <h3>{{ item.heading }}</h3>
              </nuxt-link>
            </div>
          </div>

         <div class="home-blocks cf" v-if="articles.length > 0">
            <div class="CPD-article" v-for="item in articles.slice(0, 3)" :key="item.id">
              <nuxt-link :to="`/article-details/${item.id}/${item.slug}`">
                <div class="CPD-article-img">
                  <img v-if="item.image_data" :src="item.image_data.url">
                  <img v-else src="../img/missing.png">
                </div>
                <h3>{{ item.title }}</h3>
              </nuxt-link>
            </div>
          </div> 
 
     </div>
      </section> -->

    <section class="CPD-hubs">

        <div class="container">
            <div class="row">
                <div class="col-md-12 section-heading mt-4 mb-4">
                    <div class="heading">
                        <h1>Our Hubs</h1>
                    </div>
                </div>
                    <div class="home-blocks cf">
                          <div v-for="hub in cpdPlusHubs" class="CPD-hub" :key="hub.menu_id">
                    
                              <div class="card maroon-card">
                                  <a :href="`/cpd-plus/${hub.menu_category}/`">
                                      <img class="card-img-top" :src="`https://cpd.vettimes.co.uk/media/${hub.menu_image}`">
                                   
                                        <div class="card-body">
                                          <h3 class="card-title">{{ hub.menu_name }}:</h3>
                                          <p class="card-text" v-html="hub.menu_desc"></p>
                                      </div>
                                  </a>
                              </div>
                          </div>
                    </div>
            </div>
        </div>
    </section>

      <section class="registration-benefits">
        <div class="row">
          <h1>Benefits of registration</h1>
          <div class="home-blocks cf">
            <div class="registration-benefit">
              <img src="../img/cta-icon-register.png">
              <h3>Sign up now</h3>
              <p>Save your favourite courses for later</p>
              <a :href="registerHere" v-if="checkAuth()"><button>Sign up now</button></a>
            </div>
            <div class="registration-benefit">
              <img src="../img/cta-icon-tracker.png">
              <h3>Get all area access</h3>
              <p>One log-in gets your access to CPD, vet times jobs and <a href="https://www.vettimes.co.uk/">vettimes.co.uk</a> which allows you to track your CPD</p>
              <a :href="registerHere" v-if="checkAuth()"><button>Sign up now</button></a>
            </div>
            <div class="registration-benefit">
              <img src="../img/cta-icon-jbe.png">
              <h3>Get course alerts</h3>
              <p>Manage and receive courses alerts via email</p>
              <a href="/your-courses" ><button>Create alerts</button></a>
            </div>
          </div>
        </div>
      </section>

      <div class="row">
        <div class="cf providers-cf">
          <div class="grid equal-heights">

            <div class="grid__item equal-heights__item grid-3" v-if="rssLinks">
              <div class="brand cf">
                <h2>vettimes.co.uk</h2>
                <a :href="item.link" v-for="item in rssLinks" :key="item.id" target="rssLinks">{{ item.title }}</a>
                <div class="more">
                  <a href="https://www.vettimes.co.uk/">View more</a>
                </div>
              </div>
            </div>
            
            <div class="grid__item equal-heights__item grid-3">
              <FbAd />
            </div>

            <div class="grid__item equal-heights__item grid-3">
              <div class="cpd-provider">
                <h2 class="provider-block-heading">Are you a CPD provider?</h2>
                <p>Do you want your course(s) to reach a highly engaged audience of veterinary CPD consumers? If so, we have the perfect platform for you! With an average of 550 live courses at any one time, and with more than 10,000 registered users, Vet Times CPD has received in excess of 22,000 course views in the past 90 days alone.</P>
                <div class="create-acc-btn">
                  <a :href="uploadCourseUrl">Upload course</a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>

  </div>
</template>
<script src="./script.js"></script>
<style lang="scss">@import "./style.scss";</style>