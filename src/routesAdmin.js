import HomePage from './pages/HomePage';
import NotFound from './components/NotFound';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import ProductDetail from './components/ProductDetail';
import Market from './components/Market';
import PrivateRoute from './components/PrivateRoute';
import TransactionDetails from './components/TransactionDetails';
import TransactionComponent from './components/TransactionComponent'
import Warehouse from './components/Warehouse';
import ReportList from './components/ReportList';

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
        path : '/report',
        exact : false,
        component : ReportList,
    },
    {
        path : '/register',
        exact : false,
        component : Register,
    },
    {
        path : '/profile',
        exact : false,
        component : Profile,
    },
    {
        path : '/product/:id',
        exact : false,
        component : ProductDetail,
    },
    {
        path : '/transaction/:id',
        exact : false,
        component : TransactionDetails,
    },
    {
        path : '/market',
        exact : false,
        component : Market,
    },
    {
        path : '/warehouse',
        exact : false,
        component : Warehouse,
    },
    {
        path : '/transactions',
        exact : false,
        component : TransactionComponent,
    },
    {
        path : '/check-information/:code',
        exact : false,
        component : PrivateRoute,
    },
    {
        path: '*',
        exact: false,
        component: NotFound,
    }
]
export default routes;