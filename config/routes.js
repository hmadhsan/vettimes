import Vue from "vue";
import Router from "vue-router";
import store from "./store";

import NotFound from "../view/404.vue";
import Home from "../view/home/index.vue";
import Auth from "../view/auth/index.vue";
import Courses from "../view/courses/index.vue";
import Course from "../view/course/index.vue";
import Articles from "../view/articles/index.vue";
import Article from "../view/article/index.vue";
import Providers from "../view/providers/index.vue";
import Provider from "../view/provider/index.vue";
import Info from "../view/info/index.vue";
import Redirecting from "../view/redirecting/index.vue";
import BrowseCourses from "../view/browse-courses/index.vue";

import CompanyManagement from "../view/company-management";
import courseAdvertise from "../view/course-advertise";
import YourCourses from "../view/your-courses";
import HomeProviders from "../view/home-provider";
import UserManagement from "../view/user-management";
import UserCourses from "../view/user-courses";
import YourAccount from "../view/account";
import CourseNew from "../view/course-new";
import DeleteAccount from "../view/delete-account";
import Payments from "../view/payments";
import EditAlert from "../view/edit-alert";
import PrivacyDashboard from "../view/privacy-dashboard";
import UnsubscribeAlert from "../view/unsubscribe-alert"
import Register from "../view/register"
import CpdTracker from "../view/cpd-tracker"

Vue.use(Router);

let router = new Router({
  mode: "history",
  linkActiveClass: "active",
  linkExactActiveClass: "active",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/providers",
      name: "Providers",
      component: Providers
    },
    {
      path: "/provider-details/:id/:slug/",
      name: "Provider",
      component: Provider
    },
    {
      path: "/redirecting",
      name: "Redirecting",
      component: Redirecting
    },
    {
      path: "/browse-courses",
      name: "Browse Courses",
      component: BrowseCourses
    },
    {
      path: "/your-courses",
      name: "Your Courses",
      component: UserCourses,
      meta: {auth: [1,4]}
    },
    {
      path: "/courses",
      name: "Courses",
      component: Courses,
      props: { providers: false }
    },
    {
      path: "/courses/:keyword",
      name: "Course Category",
      component: Courses,
      props: { providers: false }
    },
    {
      path: "/courses/*",
      name: "Course Category",
      component: Courses,
      props: { providers: false }
    },
    {
      path: "/course-details/:id/:slug",
      name: "Course",
      component: Course
    },
    {
      path: "/course-providers",
      name: "Course Providers",
      component: Courses,
      props: { providers: true }
    },
    {
      path: "/articles",
      name: "Articles",
      component: Articles
    },
    {
      path: "/article-details/:id/:slug",
      name: "Article",
      component: Article
    },
    {
      path: "/info/:slug",
      name: "Info Page",
      component: Info
    },
    {
      path: "/auth",
      name: "Auth",
      component: Auth,
      meta: { auth: 0 }
    },
    {
      path: "/your-account",
      name: "Your Account",
      component: YourAccount,
      meta: { auth: [1,4] }
    },
    {
      path: "/edit-alert/:id",
      name: "Edit Alert",
      component: EditAlert,
      meta: { auth: [1,4] }
    },
    {
      path: "/privacy-dashboard",
      name: "Privacy Dashboard",
      component: PrivacyDashboard,
      meta: { auth: [1,4] }
    },
    {
      path: "/unsubscribe-alert/",
      name: "Unsubscribe Alert",
      component: UnsubscribeAlert
    },
    {
      path: "/courseproviders/",
      name: "HomeProviders",
      component: HomeProviders
    },
    {
      path: "/courseproviders/your-account",
      name: "Your Account",
      component: YourAccount,
      meta: { auth: [2,3] }
    },
    {
      path: '/courseproviders/company-management',
      name: "Company Management",
      component: CompanyManagement,
      meta: {auth: [2]}
    },
    {
      path: '/courseproviders/courses/:id/:tab/',
      name: "Course Advertise",
      component: courseAdvertise,
      meta: {auth: [2,3]}
    },
    {
      path: '/courseproviders/courses',
      name: "Providers Courses",
      component: YourCourses,
      meta: {auth: [2,3]}
    },
    {
      path: '/courseproviders/user-management',
      name: "Users",
      component: UserManagement,
      meta: {auth: [2]}
    },
    {
      path: "/courseproviders/info/:slug",
      name: "Provider Info Page",
      component: Info
    },
    {
      path: "/courseproviders/courses/new",
      name: "Course New",
      component: CourseNew,
      meta: { auth: [2,3] }
    },
    {
      path: "/courseproviders/register",
      name: "Vet Times CPD Provider Services",
      component: Register
    },
    {
      path: "/delete-account-request",
      name: "Delete Account",
      component: DeleteAccount
    },
    {
      path: "/cpd-tracker",
      name: "CPD Tracker",
      component: CpdTracker,
      //meta: { auth: [4] }
    },
    {
      path: "/courseproviders/payments",
      name: "Payments",
      component: Payments,
      meta: { auth: [2,3] }
    },
    {
      path: "/admin/",
      beforeEnter() {
        window.location = process.env.BASE_URL + "admin/courses"
      }
    },
    {
      path: "*",
      name: "Page not found",
      component: NotFound
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
  }
});

router.beforeEach((to, from, next) => { 
  store.commit('googleAnalyticsTagManager');
  if (store.state.auth === null || Vue.prototype.$access(to)) next();
});

export default router;
