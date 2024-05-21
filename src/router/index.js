import { createRouter, createWebHistory } from 'vue-router'

import Dashboard from "@/views/Dashboard.vue";
import login from "@/views/Login.vue";
import Users from "@/views/Users.vue";
import PasswordConfirmReset from "@/views/PasswordConfirmReset.vue";
import AddUser from "@/views/AddUser.vue";
import {useUserStore} from "@/stores/user";
import ActiveLine from "@/views/ActiveLine.vue";
import BulkList from "@/views/BulkList.vue";
import Line from "@/views/Line.vue";
import EditBouquetVue from '@/views/EditBouquet.vue';
import LineVue from '@/views/Line.vue';
import LiveLineVue from '@/views/LiveLine.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    {
      path: '/',
      name: 'login',
      component: login,
      meta:{auth:false},



    },
    {
      path:'/home',
      name:'home',
      component:Dashboard,
      meta:{auth:true},


    },
    {
      path:'/passwordResetConfirm/:id/:token',
      name:'password_reset_confirm',
      component: PasswordConfirmReset,
      meta:{auth:false},

    },
    {
      path:'/adduser',
      name:'add-user',
      component:AddUser,
      meta:{auth:true}
    },
    {
      path:'/users',
      name:'users',
      component:Users,
      meta:{auth:true}
    },
    {
      path:'/active-lines',
      name:'active-line',
      component:ActiveLine,
      meta:{auth:true}
    },
    {
      path:'/lines',
      name:'lines',
      component:Line,
      meta:{auth:true}
    },
    {
      path:'/online',
      name:'line-online',
      component:LiveLineVue,
      meta:{auth:true}
    },
    {
      path:'/bulk-list',
      name:'bulk-list',
      component:BulkList,
      meta:{auth:true}
    },
    {
      path:'/edit-bouquet/:id',
      name:'edit-bouquet',
      component:EditBouquetVue,
      meta:{auth:true}
    }


  ]

})
router.beforeEach((to,from,next)=>{
  const store = useUserStore()
  if(to.meta.auth && !store.user.isAuthenticated){
    next('/')

  }else if (!to.meta.auth && store.user.isAuthenticated){

    next('/home')
  }
  else{

    next()
  }




})

export default router
