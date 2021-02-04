import Vue from 'vue'
import App from './App.vue'

import './config/bootstrap'
import './config/msg'
import router from './config/router'

Vue.config.productionTip = false

//TEMPORARIO
require('axios').defaults.headers.common['Authorization'] = 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6OSwibmFtZSI6InJvbmxhZG8gbHVpeiIsImVtYWlsIjoicm9uYWxkb29AZW1haWwuY29tIiwiYWRtaW4iOnRydWUsImlhdCI6MTYxMjM3ODM3MCwiZXhwIjoxNjEyNjM3NTcwfQ.0xR9KyWWsIL0iRry2gbMyCe7ex9RQZD-ejnqvIOT0Kw'
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
