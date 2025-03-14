﻿/**
 * @name umi 的路由配置
 * @description 只支持 path,component,routes,redirect,wrappers,name,icon 的配置
 * @param path  path 只支持两种占位符配置，第一种是动态参数 :id 的形式，第二种是 * 通配符，通配符只能出现路由字符串的最后。
 * @param component 配置 location 和 path 匹配后用于渲染的 React 组件路径。可以是绝对路径，也可以是相对路径，如果是相对路径，会从 src/pages 开始找起。
 * @param routes 配置子路由，通常在需要为多个路径增加 layout 组件时使用。
 * @param redirect 配置路由跳转
 * @param wrappers 配置路由组件的包装组件，通过包装组件可以为当前的路由组件组合进更多的功能。 比如，可以用于路由级别的权限校验
 * @param name 配置路由的标题，默认读取国际化文件 menu.ts 中 menu.xxxx 的值，如配置 name 为 login，则读取 menu.ts 中 menu.login 的取值作为标题
 * @param icon 配置路由的图标，取值参考 https://ant.design/components/icon-cn， 注意去除风格后缀和大小写，如想要配置图标为 <StepBackwardOutlined /> 则取值应为 stepBackward 或 StepBackward，如想要配置图标为 <UserOutlined /> 则取值应为 user 或者 User
 * @doc https://umijs.org/docs/guides/routes
 */
export default [
  // 登录页作为独立路由
  {
    name: 'login',
    path: '/user/login',
    layout: false, // 现在能正确生效
    component: './User/Login',
  },
  {
    path: '/index',
    name: 'index',
    icon: 'home',
    component: './index',
  },
  {
    path: '/account',
    name: '个人中心',
    icon: 'user',
    component: './account',
  },
  // 用户管理
  {
    path: '/user',
    icon: 'SolutionOutlined',
    name: '用户管理',
    routes: [
      {
        path: '/user',
        redirect: '/user/list',
      },
      {
        path: '/user/list',
        name: '用户列表',
        component: './User/List',
      },
      {
        path: ':user',
        name: '用户详情',
        component: './User/List/detail',
        hideInMenu: true,
      },
      {
        path: 'create',
        name: '用户创建',
        component: './User/List/create',
        hideInMenu: true,
      },
      {
        path: ':user/edit',
        name: '用户更新',
        component: './User/List/create',
        hideInMenu: true,
      },
      {
        path: '/user/role',
        name: '用户权限',
        component: './User/Role',
      },
    ],
  },
  {
    path: '/article',
    icon: 'ReadOutlined',
    name: '文章管理',
    routes: [
      {
        path: '/article',
        redirect: '/article/list',
      },
      {
        path: '/article/list',
        name: '文章列表',
        component: './Article',
      },
    ],
  },
  {
    path: '/',
    redirect: '/index',
  },
  {
    path: '*',
    layout: false,
    component: './404',
  },
];
