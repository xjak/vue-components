import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'

// 异步
const citySelect = resolve => require(['../page/citySelect'], resolve)
const keyboard = resolve => require(['../page/keyboard'], resolve)
const timeSelect = resolve => require(['../page/timeSelect'], resolve)
const picker = resolve => require(['../page/picker'], resolve)
const alert = resolve => require(['../page/alert'], resolve)
const banner = resolve => require(['../page/banner'], resolve)
const onOff = resolve => require(['../page/switch'], resolve)
const upRefresh = resolve => require(['../page/upRefresh'], resolve)
const downRefresh = resolve => require(['../page/downRefresh'], resolve)
const pictureView = resolve => require(['../page/pictureView'], resolve)
const pageSwitch = resolve => require(['../page/pageSwitch'], resolve)

// 打包到一个块中
// const claim = r => require.ensure([], () => r(require('@/components/page/claim-guide')), 'page')

Vue.use(Router)

export default new Router({
    routes: [
    	{
        	path: '/',
        	name: 'index',
        	component: index
    	}, {
        	path: '/timeSelect',
        	component: timeSelect
        }, {
            path: '/citySelect',
            component: citySelect
        }, {
            path: '/picker',
            component: picker
        }, {
            path: '/alert',
            component: alert
        }, {
            path: '/banner',
            component: banner
        }, {
            path: '/switch',
            component: onOff
        }, {
            path: '/upRefresh',
            component: upRefresh
        }, {
            path: '/downRefresh',
            component: downRefresh
        }, {
            path: '/keyboard',
            component: keyboard
        }, {
            path: '/pictureView',
            component: pictureView
        }, {
            path: '/pageSwitch',
            component: pageSwitch
        }
    ]
})
