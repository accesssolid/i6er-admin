
import { RouterKeys } from '../Routes/RouterKeys'
import { ReactIcons } from '../utils/ReactIcons'
export const SidebarList = [
    {
        id: 'dashboard',
        icon: <ReactIcons.SIDE_BAR.DASHBOARD_ICON/>,
        title: "Dashboard",
        routes: RouterKeys.NON_Auth.HOME,
    },
    {
        id: 'users',
        icon: <ReactIcons.SIDE_BAR.USERS_ICON/>,
        title: "Users",
        routes: RouterKeys.NON_Auth.USERS,
    },
    {
        id: 'faq',
        icon: <ReactIcons.SIDE_BAR.FAQ_ICON/>,
        title: "FAQ",
        routes: RouterKeys.NON_Auth.FAQ,
    },
    {
        id: 'privacy_policy',
        icon: <ReactIcons.SIDE_BAR.PRIVACY_ICON/>,
        title: "Privacy Policy",
        routes: RouterKeys.NON_Auth.PRIVACY,
    },
    {
        id: 'terms_condition',
        icon: <ReactIcons.SIDE_BAR.TERMS_ICON/>,
        title: "Terms & Conditions",
        routes: RouterKeys.NON_Auth.TERMS_CONDITION,
    },
]