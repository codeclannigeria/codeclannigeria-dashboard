import { defineConfig } from 'umi';
import { pagePath } from '../src/routes';
import defaultSettings from './defaultSettings';
import proxy from './proxy'; // https://umijs.org/config/

const { REACT_APP_ENV, NODE_ENV } = process.env;
export default defineConfig({
  hash: true,
  base: NODE_ENV === 'production' ? '/codeclannigeria-dashboard/' : undefined,
  publicPath: NODE_ENV === 'production' ? '/codeclannigeria-dashboard/' : undefined,
  antd: {},
  dva: {
    hmr: true,
  },
  layout: {
    name: 'Code Clan Nigeria',
    locale: false,
  },
  locale: {
    default: 'en-US',
    useLocalStorage: true,
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/auth',
      layout: false,
      routes: [
        {
          name: 'login',
          path: pagePath.login,
          component: './auth/login',
        },
      ],
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      icon: 'dashboard',
      component: './Dashboard',
    },
    {
      name: 'Users',
      icon: 'team',
      title: 'Users',
      path: '/users',
      component: './Users',
    },
    // {
    //   path: '/admin',
    //   name: 'admin',
    //   icon: 'crown',
    //   access: 'canAdmin',
    //   component: './Admin',
    //   routes: [
    //     {
    //       path: '/admin/sub-page',
    //       name: 'sub-page',
    //       icon: 'smile',
    //       component: './Welcome',
    //     },
    //   ],
    // },
    {
      name: 'Paths',
      icon: 'NodeExpandOutlined',
      access: 'canAdmin',
      routes: [
        {
          name: 'Tracks',
          path: '/tracks',
          component: './Tracks',
        },
      ],
    },

    {
      path: '/',
      redirect: '/dashboard',
    },
    {
      component: './404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  // @ts-ignore
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
});
