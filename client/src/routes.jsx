import SignPage from "./pages/SignPage";
import MainPage from "./pages/MainPage";
import AdminPage from "./pages/AdminPage";
import PasswordPage from "./pages/PasswordPage";
import forgotPasswordPage from "./pages/ForgotPasswordPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import ConfirmEmailPage from "./pages/ConfirmEmailPage.jsx";
import { ADMIN_ROUTE, GUEST_ROUTE, MAIN_ROUTE, PASSWORD_ROUTE, PROFILE_ROUTE, FORGOTE_ROUTE,CONFIRM_ROUTE } from "./utils/consts.js";

export const authRoutes = [

    {
        path: MAIN_ROUTE,
        Component: MainPage
    },
    {
        path: PROFILE_ROUTE,
        Component: ProfilePage
    },
    {
        path: CONFIRM_ROUTE,
        Component: ConfirmEmailPage
    }



]

export const guestRoutes = [
    {
        path: GUEST_ROUTE,
        Component: SignPage
    },
    {
        path: FORGOTE_ROUTE,
        Component: forgotPasswordPage
    },
    {
        path: PASSWORD_ROUTE,
        Component: PasswordPage
    }


]
export const adminRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: AdminPage
    },


]

