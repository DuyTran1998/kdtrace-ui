import Login from './components/Login';
import Register from './components/Register';

const routes = [
    {
        path : '/login',
        exact : false,
        component : Login,
    },
    {
        path : '/register',
        exact : false,
        component : Register,
    }
]
export default routes;