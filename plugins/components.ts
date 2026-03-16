import { defineNuxtPlugin } from '#app'

// Layout
import AnnouncementBar from '~/components/layout/AnnouncementBar.vue'
import AppHeader from '~/components/layout/AppHeader.vue'
import AppFooter from '~/components/layout/AppFooter.vue'

// UI
import FsaLogo from '~/components/ui/FsaLogo.vue'
import CourseCard from '~/components/ui/CourseCard.vue'

// Home
import HeroSection from '~/components/home/HeroSection.vue'
import CoursesCarousel from '~/components/home/CoursesCarousel.vue'
import ValueProp from '~/components/home/ValueProp.vue'
import WhyFSA from '~/components/home/WhyFSA.vue'
import Testimonials from '~/components/home/Testimonials.vue'
import LeadForm from '~/components/home/LeadForm.vue'

// Course
import CourseHero from '~/components/course/CourseHero.vue'
import CourseAbout from '~/components/course/CourseAbout.vue'
import CourseCurriculum from '~/components/course/CourseCurriculum.vue'
import CoursePricing from '~/components/course/CoursePricing.vue'
import CourseContact from '~/components/course/CourseContact.vue'

// Checkout
import CheckoutHeader from '~/components/checkout/CheckoutHeader.vue'
import StepIndicator from '~/components/checkout/StepIndicator.vue'
import OrderSummary from '~/components/checkout/OrderSummary.vue'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('AnnouncementBar', AnnouncementBar)
  nuxtApp.vueApp.component('AppHeader', AppHeader)
  nuxtApp.vueApp.component('AppFooter', AppFooter)
  nuxtApp.vueApp.component('FsaLogo', FsaLogo)
  nuxtApp.vueApp.component('CourseCard', CourseCard)
  nuxtApp.vueApp.component('HeroSection', HeroSection)
  nuxtApp.vueApp.component('CoursesCarousel', CoursesCarousel)
  nuxtApp.vueApp.component('ValueProp', ValueProp)
  nuxtApp.vueApp.component('WhyFSA', WhyFSA)
  nuxtApp.vueApp.component('Testimonials', Testimonials)
  nuxtApp.vueApp.component('LeadForm', LeadForm)
  nuxtApp.vueApp.component('CourseHero', CourseHero)
  nuxtApp.vueApp.component('CourseAbout', CourseAbout)
  nuxtApp.vueApp.component('CourseCurriculum', CourseCurriculum)
  nuxtApp.vueApp.component('CoursePricing', CoursePricing)
  nuxtApp.vueApp.component('CourseContact', CourseContact)
  nuxtApp.vueApp.component('CheckoutHeader', CheckoutHeader)
  nuxtApp.vueApp.component('StepIndicator', StepIndicator)
  nuxtApp.vueApp.component('OrderSummary', OrderSummary)
})
