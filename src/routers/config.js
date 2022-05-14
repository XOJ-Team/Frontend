// React.lazy() and preload
// https://github.com/pomber/react-lazy-preload-demo/pull/8/commits/126c1bf6e2a23b3e3f7eb0ffb1b4db260516643f
// v6路由
import React from 'react';
import {Navigate} from "react-router-dom";



// 预懒加载所有路由
const ListQPromise = import(/* webpackChunkName: 'ListQ' */ '../pages/questions/ListQ')
const ListQ=React.lazy(()=>ListQPromise)

const MainPagePromise = import(/* webpackChunkName: 'MainPage' */ '../pages/openpage/MainPage')
const MainPage=React.lazy(()=>MainPagePromise)

const LookQPromise = import(/* webpackChunkName: 'LookQ' */ '../pages/questions/LookQ')
const LookQ=React.lazy(()=>LookQPromise)

const LoginPromise = import(/* webpackChunkName: 'Login' */ '../pages/LoginRegister/Login')
const Login=React.lazy(()=>LoginPromise)

const RegisterPromise = import(/* webpackChunkName: 'Register' */ '../pages/LoginRegister/Register')
const Register=React.lazy(()=>RegisterPromise)

const EditQPromise = import(/* webpackChunkName: 'EditQ' */ '../pages/questions/EditQ')
const EditQ=React.lazy(()=>EditQPromise)

const UserPagePromise = import(/* webpackChunkName: 'UserPage' */ '../pages/userpages/UserPage')
const UserPage=React.lazy(()=>UserPagePromise)

const ModifyInfoPromise = import(/* webpackChunkName: 'ModifyInfo' */ '../pages/userpages/ModifyInfo')
const ModifyInfo=React.lazy(()=>ModifyInfoPromise)

const AboutusPromise = import(/* webpackChunkName: 'Aboutus' */ '../pages/About/Aboutus')
const Aboutus=React.lazy(()=>AboutusPromise)

const NotFoundPromise = import(/* webpackChunkName: 'NotFound' */ '../pages/NotFound')
const NotFound=React.lazy(()=>NotFoundPromise)

const ViewCompetitionPromise = import(/* webpackChunkName: 'ViewCompetition' */ '../pages/Competition/ViewCompetition')
const ViewCompetition=React.lazy(()=>ViewCompetitionPromise)

const ListCompetitionPromise = import(/* webpackChunkName: 'ListCompetition' */ '../pages/Competition/ListCompetition')
const ListCompetition=React.lazy(()=>ListCompetitionPromise)

const EditCompetitionPromise = import(/* webpackChunkName: 'EditCompetition' */ '../pages/Competition/EditCompetition')
const EditCompetition=React.lazy(()=>EditCompetitionPromise)

const SiteRankPromise = import(/* webpackChunkName: 'SiteRank' */ '../pages/Ranks/SiteRank')
const SiteRank=React.lazy(()=>SiteRankPromise)

const ManagepagePromise = import(/* webpackChunkName: 'Managepage' */ '../pages/Management/Managepage')
const Managepage=React.lazy(()=>ManagepagePromise)

const SubmisstionPagePromise=import('../pages/Submission/SubmissionPage')
const SubmissionPage=React.lazy(()=>SubmisstionPagePromise)

// 路由配置
// id应当唯一,最好不要更改id
export const allroutes=[
    {
        id:'notfound',
        path:'404',
        element:<NotFound />
    },
    {
        id:'mainpage',
        path:'',
        element:<MainPage />
    },
    {
        path:'userauth',
        children:[
            {
                id:'userlogin',
                path:'login',
                element:<Login />
            },
            {
                id:'userregister',
                path:'register',
                element:<Register />
            },
        ]
    },
    {
        path:'questions',
        children:[
            {
                id:'questionList',
                path:'',
                element:<ListQ />
            },{
                id:'questionOnlyOne',
                path:'look',
                element:<LookQ />
            },{
                id:'questionEdit',
                path:'edit',
                element:<EditQ />
            }
        ]
    },
    {
        path:'rank',
        children:[
            {
                id:'siterank',
                path:'',
                element:<SiteRank />
            }
        ]
    },
    {
        path:'about',
        children:[
            {
                id:'aboutxoj',
                path:'xoj',
                element:<Aboutus />
            },
        ]
    },
    {
        path:'competition',
        children:[
            {
                id:'competitionList',
                path:'',
                element:<ListCompetition />
            },
            {
                id:'onecompetition',
                path:'view',
                element:<ViewCompetition />
            },
            {
                id:'editcompetition',
                path:'edit',
                element:<EditCompetition />
            }
        ]
    },
    {
        path:'userpages',
        children:[
            {
                id:'userpage',
                path:'',
                element:<UserPage />
            },
            {
                id:'editUserInfo',
                path:'edit',
                element:<ModifyInfo />
            }
        ]
    },
    {
        path:'manage',
        children:[
            {
                id:'manageusers',
                path:'',
                element:<Managepage />
            }
        ]
    },
    {
        path:'submissions',
        children:[
            {
                id:'submission',
                path:'detail',
                element:<SubmissionPage />
            }
        ]
    },
    {
        id:'default',
        path:'*',
        element:<Navigate to="/404" />
    },
]

/**
 * find the path of a route which id is 
 * @param {String} id    路由的id
 * 
 * for example, input id='questionOnlyOne'
 * this will return '/questions/look'
 */
export function findRoute(id){
    let result=[]
    recfindRoute("",allroutes)
    if(result.length>1){
        console.error("id in routers/config should be unique")
        return result[0]
    }else if(result.length===1){
        return result[0]
    }else{
        return "/"
    }

    function recfindRoute(prefix,node){
        for (let i of node){
            if(i.id===id){
                result.push(prefix+"/"+i.path)
            }
            if(i.children!=null){
                recfindRoute(prefix+"/"+i.path,i.children)
            }
        }
    }
}