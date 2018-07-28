import { isUrl } from '../utils/utils';

const menuData = [
  {
    name: 'dashboard',
    icon: 'dashboard',
    path: 'dashboard',
    children: [
      {
        name: 'Analysis page',
        path: 'analysis',
      },
      {
        name: 'Monitoring page',
        path: 'monitor',
      },
      {
        name: 'workplace',
        path: 'workplace',
        // hideInBreadcrumb: true,
        // hideInMenu: true,
      },
    ],
  },
  {
    name: 'Form page',
    icon: 'form',
    path: 'form',
    children: [
      {
        name: 'basic-form',
        path: 'basic-form',
      },
      {
        name: 'step-form',
        path: 'step-form',
      },
      {
        name: 'advanced-form',
        authority: 'admin',
        path: 'advanced-form',
      },
    ],
  },
  {
    name: 'List',
    icon: 'table',
    path: 'list',
    children: [
      {
        name: 'Inquiry form',
        path: 'table-list',
      },
      {
        name: 'basic-list',
        path: 'basic-list',
      },
      {
        name: 'card-list',
        path: 'card-list',
      },
      {
        name: 'search',
        path: 'search',
        children: [
          {
            name: 'search（articles）',
            path: 'articles',
          },
          {
            name: 'search（projects）',
            path: 'projects',
          },
          {
            name: 'Search（application）',
            path: 'applications',
          },
        ],
      },
    ],
  },
  {
    name: 'details page',
    icon: 'profile',
    path: 'profile',
    children: [
      {
        name: 'basic',
        path: 'basic',
      },
      {
        name: 'advanced',
        path: 'advanced',
        authority: 'admin',
      },
    ],
  },
  {
    name: '结果页',
    icon: 'check-circle-o',
    path: 'result',
    children: [
      {
        name: 'success',
        path: 'success',
      },
      {
        name: 'fail',
        path: 'fail',
      },
    ],
  },
  {
    name: 'Exception page',
    icon: 'warning',
    path: 'exception',
    children: [
      {
        name: '403',
        path: '403',
      },
      {
        name: '404',
        path: '404',
      },
      {
        name: '500',
        path: '500',
      },
      {
        name: 'Trigger exception',
        path: 'trigger',
        hideInMenu: true,
      },
    ],
  },
  {
    name: 'Account',
    icon: 'user',
    path: 'user',
    authority: 'guest',
    children: [
      {
        name: 'login',
        path: 'login',
      },
      {
        name: 'register',
        path: 'register',
      },
      {
        name: 'register-result',
        path: 'register-result',
      },
    ],
  },
];

function formatter(data, parentPath = '/', parentAuthority) {
  return data.map(item => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);
