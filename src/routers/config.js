// 记录所有路由配置
import ListQ from '../pages/questions/ListQ';
import MainPage from '../pages/openpage/MainPage';
import LookQ from '../pages/questions/LookQ';
import Login from '../pages/LoginRegister/Login';
import NotFound from '../pages/NotFound';
import Register from '../pages/LoginRegister/Register';
import EditQ from '../pages/questions/EditQ';
import UserPage from '../pages/userpages/UserPage';
import Aboutus from '../pages/About/Aboutus';
import ListCompetition from '../pages/Competition/ListCompetition'
// v6路由
import {Navigate} from "react-router-dom";

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
        path:'main',
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
        return ""
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