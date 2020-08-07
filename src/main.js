import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/scss/reset.scss'
import './assets/js/rem'

Vue.config.productionTip = false

// 把封装的axios挂载到原型上
import baseJS from './api'
Vue.prototype.baseJs = baseJS

import { Toast, Popup, Locale } from 'vant';
import enUS from 'vant/lib/locale/lang/en-US'
Locale.use('en-US', enUS);
Vue.use(Toast);
Vue.use(Popup);

import { Tab, Tabs } from 'vant';
Vue.use(Tab);
Vue.use(Tabs);

import { Cell, CellGroup } from 'vant';
Vue.use(Cell);
Vue.use(CellGroup);

import { Icon } from 'vant';
Vue.use(Icon);

import { RadioGroup, Radio } from 'vant';
Vue.use(Radio);
Vue.use(RadioGroup);

import { Stepper } from 'vant';
Vue.use(Stepper);

import { Checkbox, CheckboxGroup } from 'vant';
Vue.use(Checkbox).use(CheckboxGroup);

import { Swipe, SwipeItem } from 'vant';
Vue.use(Swipe);
Vue.use(SwipeItem);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
