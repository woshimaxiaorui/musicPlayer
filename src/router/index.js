import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/pages/Home'
import Recommend from '@/components/pages/home/Recommend'
import Singer from '@/components/pages/home/Singer'
import Link from '@/components/pages/home/Link'
import Search from '@/components/pages/home/Search'
import CdList from '@/components/pages/home/cdList/CdList'


Vue.use(Router)

export default new Router({
	
  routes: [
		{
			path : '/home',
			name : 'Home',
			component:Home,
			children:[
				{
					path:'recommend',
					component:Recommend,
					children : [
						{
							path : 'cdList',
							name : 'CdList',
							component : CdList
						}
					]
				},
				{path:'singer',component:Singer},
				{path:'link',component:Link},
				{path:'search',component:Search}
			]
		},
		{
			path:'/home/recommend',
			name:'Recommend',
			component:Recommend
		},
		{
			path: '/',
			redirect:"/home/recommend"
		},
		{
			path: '**',
			redirect:"/home/recommend"
		}
  ]
})
