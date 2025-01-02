import * as AntdComponents from 'antd'
import { STATIC_IMAGES } from '../utils/StaticImages'
import { RouterKeys } from '../Routes/RouterKeys'
export const SidebarList = [
    {
        id: 'dashboard',
        icon: <AntdComponents.Image preview={false} height={20} src={STATIC_IMAGES.SIDE_BAR.DASHBOARD}/>,
        title: "Dashboard",
        routes: RouterKeys.NON_Auth.HOME,
    },
    {
        id: 'users',
        icon: <AntdComponents.Image preview={false} height={20} src={STATIC_IMAGES.SIDE_BAR.USERS}/>,
        title: "Users",
        routes: RouterKeys.NON_Auth.USERS,
    },
    {
        id: 'category',
        icon: <AntdComponents.Image preview={false} height={20} src={STATIC_IMAGES.SIDE_BAR.CATEGORY}/>,
        title: "Category",
        routes: RouterKeys.NON_Auth.CATEGORY,
    },
    {
        id: 'community',
        icon: <AntdComponents.Image preview={false} height={20} src={STATIC_IMAGES.SIDE_BAR.FAQ}/>,
        title: "Community",
        routes: RouterKeys.NON_Auth.COMMUNITY,
    },
    {
        type: 'subMenu',
        title: "Report",
        icon: <AntdComponents.Image preview={false} height={20} src={STATIC_IMAGES.SIDE_BAR.PRIVACY}/>,
        submenus: [
          {
            id: 'report_users',
            title: "Users",
            routes: RouterKeys.NON_Auth.REPORT_USERS,
          },
          {
            id: 'report_users',
            title: "Post",
            routes: RouterKeys.NON_Auth.REPORT_POST,
          },
          {
            id: 'report_users',
            title: "Comments",
            routes: RouterKeys.NON_Auth.REPORT_COMMENTS,
          },
        ]
      },
    {
        id: 'faq',
        icon: <AntdComponents.Image preview={false} height={20} src={STATIC_IMAGES.SIDE_BAR.FAQ}/>,
        title: "FAQ",
        routes: RouterKeys.NON_Auth.FAQ,
    },
    {
        id: 'privacy_policy',
        icon: <AntdComponents.Image preview={false} height={20} src={STATIC_IMAGES.SIDE_BAR.PRIVACY}/>,
        title: "Privacy Policy",
        routes: RouterKeys.NON_Auth.PRIVACY,
    },
    {
        id: 'terms_condition',
        icon: <AntdComponents.Image preview={false} height={20} src={STATIC_IMAGES.SIDE_BAR.TERMS}/>,
        title: "Terms & Conditions",
        routes: RouterKeys.NON_Auth.TERMS_CONDITION,
    },
]