import { DefautLayout } from '~/layout';
import { AddressUser, Cart, Checkout, Home, Login, Signup, Product, Profile, TrackingOrder } from '~/pages';

import config from '~/config';
import Shop from '~/pages/Shop/Shop';
import RequireAuth from '~/layout/RequireAuthLayout';

const publicRoutes = [
    { path: config.routes.HOME, element: Home, layout: DefautLayout },
    { path: config.routes.PRODUCT, element: Product, layout: DefautLayout },
    { path: config.routes.SHOP, element: Shop, layout: DefautLayout },
];

const privateRoutes = [
    { path: config.routes.ADDRESSUSER, element: AddressUser, layout: RequireAuth },
    { path: config.routes.CART, element: Cart, layout: RequireAuth },
    { path: config.routes.CHECKOUT, element: Checkout, layout: RequireAuth },
    { path: config.routes.PROFILE, element: Profile, layout: RequireAuth },
    { path: config.routes.TRACKINGORDER, element: TrackingOrder, layout: RequireAuth },
];

const authenticationRoutes = [
    { path: config.routes.LOGIN, element: Login, layout: null },
    { path: config.routes.SIGNUP, element: Signup, layout: null },
];

export { publicRoutes, privateRoutes, authenticationRoutes };
