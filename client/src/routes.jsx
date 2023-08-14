import SignPage from "./pages/SignPage";
import MainPage from "./pages/MainPage";
import AdminPage from "./pages/AdminPage";
import { ADMIN_ROUTE, LOGIN_ROUTE, LK_ROUTE } from "./utils/consts.js";

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component : AdminPage
    },
    {
        path: LK_ROUTE,
        Component : MainPage
    }

]

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component : SignPage
    },


]
