import { DefautLayout } from '~/layout';
import { AddressUser, Cart, Checkout, Home, Login, Signup, Product, Profile, TrackingOrder } from '~/pages';

import config from '~/config';

const publicRoutes = [
    { path: config.routes.HOME, element: Home, layout: DefautLayout },
    { path: config.routes.PRODUCT, element: Product, layout: DefautLayout },
];

const privateRoutes = [
    { path: config.routes.ADDRESSUSER, element: AddressUser, layout: DefautLayout },
    { path: config.routes.CART, element: Cart, layout: DefautLayout },
    { path: config.routes.CHECKOUT, element: Checkout, layout: DefautLayout },
    { path: config.routes.PROFILE, element: Profile, layout: DefautLayout },
    { path: config.routes.TRACKINGORDER, element: TrackingOrder, layout: DefautLayout },
];

const authenticationRoutes = [
    { path: config.routes.LOGIN, element: Login, layout: null },
    { path: config.routes.SIGNUP, element: Signup, layout: null },
];

export { publicRoutes, privateRoutes, authenticationRoutes };
