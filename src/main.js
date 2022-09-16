import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

//配置vant组件库
import Vant from 'vant';
import 'vant/lib/index.less';

Vue.use(Vant);

new Vue({
    render: h => h(App),
    router
}).$mount('#app')