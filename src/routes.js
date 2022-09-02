import Admin from './page/admin/Admin';
import BasketPage from './page/BasketPage';
import Item from './page/ItemPage';
import Catalog from './page/Catalog';
import {
    ADMIN_ROUTE,
    BASKET_ROUTE,
    BRAND_ROUTE,
    CATALOG_ROUTE,
    CATEGORY_ROUTE,
    CATEGORYDOWN_ROUTE,
    CHANGE_SCALE_ROUTE,
    CHANGEBRAND_ROUTE,
    CHANGECATEGORY_ROUTE,
    CHANGECATEGORYDOWN_ROUTE,
    CHANGEITEM_ROUTE,
    CHECKORDER_ROUTE,
    CREATE_SCALE_ROUTE,
    CREATEITEM_ROUTE,
    CREATEORDER_ROUTE,
    DELANDPAY_ROUTE,
    DISCOUNT_ROUTE,
    FIND_ROUTE,
    FINDCHANGE_ROUTE,
    FINDYOURORDER_ROUTE,
    HOME_ROUTE,
    ITEM_ROUTE,
    NEW_ROUTE,
    ORDERPAGE_ROUTE,
    ORDERS_ROUTE,
    POPULAR_ROUTE,
    THANKS_ROUTE,
    YOURORDER_ROUTE
} from "./utils/consts";
import CreateOrder from "./page/CreateOrder";
import CreateBrand from "./page/admin/CreateBrand";
import CreateCategory from "./page/admin/CreateCategory"
import CreateDownCategory from "./page/admin/CreateDownCategory";
import CreateItem from "./page/admin/CreateItem";
import CheckOrder from "./page/CheckOrder";
import DeliveryAndPay from "./page/DeliveryAndPay";
import FindPage from "./page/FindPage";
import Thanks from "./page/Thanks";
import Orders from './page/admin/Orders'
import Home from "./page/Home";
import FindChange from "./page/admin/FindChange";
import ChangeItem from "./page/admin/ChangeItem";
import ChangeCategory from "./page/admin/ChangeCategory";
import ChangeDownCategory from "./page/admin/ChangeDownCategory";
import ChangeBrand from "./page/admin/ChangeBrand";
import OrderPage from "./page/admin/OrderPage";
import FindYourOrder from "./page/FindYourOrder";
import YourOrder from "./page/YourOrder";
import DiscountCatalog from "./page/DiscountCatalog";
import PopularCatalog from "./page/PopularCatalog";
import NewCatalog from "./page/NewCatalog";
import CreateScale from "./page/admin/CreateScale";
import ChangeScale from "./page/admin/ChangeScale";

export const routes = [
    {
        path: BASKET_ROUTE,
        Component: BasketPage
    },
    {
        path: ITEM_ROUTE + '/:id',
        Component: Item
    },
    {
        path: CATALOG_ROUTE,
        Component: Catalog
    },
    {
        path: CREATEORDER_ROUTE,
        Component: CreateOrder
    },
    {
        path: CHECKORDER_ROUTE,
        Component: CheckOrder
    },
    {
        path: DELANDPAY_ROUTE,
        Component: DeliveryAndPay
    },
    {
        path: FIND_ROUTE,
        Component: FindPage
    },
    {
        path: THANKS_ROUTE,
        Component: Thanks
    },
    {
        path: HOME_ROUTE,
        Component: Home
    },
    {
        path: FINDYOURORDER_ROUTE,
        Component: FindYourOrder
    },
    {
        path: YOURORDER_ROUTE + '/:number',
        Component: YourOrder
    },
    {
        path: DISCOUNT_ROUTE,
        Component: DiscountCatalog
    },
    {
        path: POPULAR_ROUTE,
        Component: PopularCatalog
    },
    {
        path: NEW_ROUTE,
        Component: NewCatalog
    }
]

export const adminRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: BRAND_ROUTE,
        Component: CreateBrand
    },
    {
        path: CATEGORY_ROUTE,
        Component: CreateCategory
    },
    {
        path: CATEGORYDOWN_ROUTE,
        Component: CreateDownCategory
    },
    {
        path: CREATEITEM_ROUTE,
        Component: CreateItem
    },
    {
        path: BASKET_ROUTE,
        Component: BasketPage
    },
    {
        path: ITEM_ROUTE + '/:id',
        Component: Item
    },
    {
        path: CATALOG_ROUTE,
        Component: Catalog
    },
    {
        path: CHECKORDER_ROUTE,
        Component: CheckOrder
    },
    {
        path: DELANDPAY_ROUTE,
        Component: DeliveryAndPay
    },
    {
        path: FIND_ROUTE,
        Component: FindPage
    },
    {
        path: THANKS_ROUTE,
        Component: Thanks
    },
    {
        path: ORDERS_ROUTE,
        Component: Orders
    },
    {
        path: ORDERPAGE_ROUTE + '/:id',
        Component: OrderPage
    },
    {
        path: HOME_ROUTE,
        Component: Home
    },
    {
        path: FINDCHANGE_ROUTE,
        Component: FindChange
    },
    {
        path: CHANGEITEM_ROUTE + '/:id',
        Component: ChangeItem
    },
    {
        path: CHANGECATEGORY_ROUTE,
        Component: ChangeCategory
    },
    {
        path: CHANGECATEGORYDOWN_ROUTE,
        Component: ChangeDownCategory
    },
    {
        path: CHANGEBRAND_ROUTE,
        Component: ChangeBrand
    },
    {
        path: FINDYOURORDER_ROUTE,
        Component: FindYourOrder
    },
    {
        path: YOURORDER_ROUTE + '/:number',
        Component: YourOrder
    },
    {
        path: DISCOUNT_ROUTE,
        Component: DiscountCatalog
    },
    {
        path: POPULAR_ROUTE,
        Component: PopularCatalog
    },
    {
        path: NEW_ROUTE,
        Component: NewCatalog
    },
    {
        path: CREATE_SCALE_ROUTE,
        Component: CreateScale
    },
    {
        path: CHANGE_SCALE_ROUTE,
        Component: ChangeScale
    }
]