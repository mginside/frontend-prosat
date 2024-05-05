import { defineStore } from 'pinia'
import axios from 'axios'
import router from "@/router";


export const useUserStore = defineStore({
 id: 'user',

 state: () => ({
  user: {
   isAuthenticated: false,
   id: null,
   username: null,
   email: null,
   access: null,
   refresh: null,
   balance:null,
   member_group_id:null,
   is_admin:false,
  },
 }),

 getters:{
  getBalance:(state)=>state.user.balance,
  getUsername:(state)=>state.user.username,
  getUserId:(state)=>state.user.id
 },






 actions: {
  initStore() {
   console.log('initStore', localStorage.getItem('user.access'))

   if (localStorage.getItem('user.access')) {
    console.log('User has access!')

    this.user.access = localStorage.getItem('user.access')
    this.user.refresh = localStorage.getItem('user.refresh')

    this.user.isAuthenticated = true

    this.refreshToken()




    console.log('Initialized user:', this.user)
   }
  },


  logout(){
   this.removeToken()
   router.push({name:'login'})

  },





  setToken(data) {
   console.log('setToken', data)

   this.user.access = data.access
   this.user.refresh = data.refresh
   this.user.isAuthenticated = true
   localStorage.setItem('user.access', data.access)
   localStorage.setItem('user.refresh', data.refresh)
   console.log('user.access: ', localStorage.getItem('user.access'))
  },



  removeToken() {
   console.log('removeToken')
   this.user.refresh = ''
   this.user.access = ''
   this.user.isAuthenticated = ''
   this.user.id = ''
   this.user.username = ''
   this.user.email = ''
   this.user.member_group_id = ''
   this.user.is_admin = ''
   this.user.balance = ''
   localStorage.setItem('user.access', '')
   localStorage.setItem('user.refresh', '')
  },

  setUserInfo(user) {
   console.log('setUserInfo', user)
   this.user.email = user.email
   this.user.id = user.user_id
   this.user.username = user.username
   this.user.balance = user.balance
   this.user.member_group_id = user.member_group_id
   this.user.is_admin = user.is_admin



  },

  refreshUserInfo(){
   axios.get('/me').then((res)=>{
    this.setUserInfo(res.data)
   }).catch((err)=>{
    console.log(err)
   })
  },

  refreshToken() {
   axios.post('/refresh/', {
    refresh: this.user.refresh
   })
       .then((response) => {
        this.user.access = response.data.access

        localStorage.setItem('user.access', response.data.access)

        axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.access
       })
       .catch((error)=>{
        console.log(error)
        this.removeToken()
       })
  },
 }
})