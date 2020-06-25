import HomePage from './pages/HomePage';
import NotFound from './components/NotFound';
import Login from './components/Login';
import Register from './components/Register';
import ProducerProfile from './components/ProducerProfile';
import ProductDetail from './components/ProductDetail';

const routes = [
    {
        path : '/',
        exact : true,
        component: HomePage
    },
    {
        path : '/dashboard',
        exact : false,
        component: HomePage
    },
    {
        path : '/login',
        exact : false,
        component : Login,
    },
    {
        path : '/register',
        exact : false,
        component : Register,
    },
    {
        path : '/profile',
        exact : false,
        component : ProducerProfile,
    },
    {
        path : '/product/:id',
        exact : false,
        component : ProductDetail,
    },
    {
        path: '*',
        exact: false,
        component: NotFound,
    }
]
export default routes;