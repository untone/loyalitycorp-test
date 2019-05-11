import Users from './components/users/users';
import UsersList from './components/users/list';
import UsersSearch from './components/users/search';
import Repos from './components/repos/repos';
import ReposList from './components/repos/list';
import RepoItem from './components/repos/repo';

const routes = [
  {
    path: '/',
    component: Users,
    props: (route) => ({
      username: ''
    }),
    children: [
      {
        path: '',
        component: UsersSearch,
        props: (route) => ({
          username: ''
        })
      },
      {
        path: 'search',
        component: UsersList,
        props: (route) => ({
          username: route.query.username
        })
      },
    ]
  },
  {
    path: '/:username/',
    component: Repos,
    props: (route) => ({
      username: route.params.username
    }),
    children: [
      {
        name: 'ReposList',
        path: '',
        components: {
          list: ReposList
        },
        props: (route) => ({
          username: route.params.username
        })
      },
      {
        name: 'RepoItem',
        path: ':reponame',
        components: {
          list: ReposList,
          modal: RepoItem,
        },
        props: (route) => ({
          username: route.params.username
        }),
        meta: {
         showModal: true
        }
      }
    ]
  }
];

export default routes;
