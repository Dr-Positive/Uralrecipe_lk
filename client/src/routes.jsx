import SignPage from "./pages/SignPage";
import MainPage from "./pages/MainPage";
import AdminPage from "./pages/AdminPage";
import { ADMIN_ROUTE, GUEST_ROUTE, MAIN_ROUTE } from "./utils/consts.js";

export const authRoutes = [

    {
        path: MAIN_ROUTE,
        Component : MainPage
    }

]

export const guestRoutes = [
    {
        path: GUEST_ROUTE,
        Component : SignPage
    },


]
export const adminRoutes = [
    {
        path: ADMIN_ROUTE,
        Component : AdminPage
    },


]
