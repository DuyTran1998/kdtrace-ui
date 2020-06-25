import UserList from './components/UserList';
import NotFound from './components/NotFound';
const routes = [
    {
        path : '/',
        exact : true,
        component: UserList
    },
    {
        path: '*',
        exact: false,
        component: NotFound,
    }
]
export default routes;