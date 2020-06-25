import ProductList from './components/ProductList';
import NotFound from './components/NotFound';

const routes = [
    {
        path : '/',
        exact : true,
        component: ProductList
    },
    {
        path : '/dashboard',
        exact : false,
        component: ProductList
    },
    {
        path: '*',
        exact: false,
        component: NotFound,
    }
]
export default routes;