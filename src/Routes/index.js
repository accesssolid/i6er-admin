
import AuthLayout from "../layouts/AuthLayout";
import ForgotPassword from "../screen/Auth/ForgotPassword";
import Login from "../screen/Auth/Login";
import OTPVerify from "../screen/Auth/OTPVerify";
import { RouterKeys } from "./RouterKeys";
import ProtectRoute from "./ProtectRoute";
import AuthProtect from "./AuthProtect";
import MainLayout from "../layouts/MainLayout";
import NewPassword from "../screen/Auth/NewPassword";
import Home from "../screen/NonAuth/Home/Home";
import Users from "../screen/NonAuth/Users/Users";
import Category from "../screen/NonAuth/Category/Category";
import UserDetailView from "../screen/NonAuth/Users/UserDetailView";
import CategoryView from "../screen/NonAuth/Category/CategoryView";
import Community from "../screen/NonAuth/Community/Community";
import CommunityDetail from "../screen/NonAuth/Community/CommunityDetail";
import FAQList from "../screen/NonAuth/FAQ/FAQList";
import Terms from "../screen/NonAuth/General/Terms";
import Privacy from "../screen/NonAuth/General/Privacy";
import ReportUser from "../screen/NonAuth/Reports/ReportUser";
import Post from "../screen/NonAuth/Reports/Post";
import Comments from "../screen/NonAuth/Reports/Comments";
import PostDetail from "../screen/NonAuth/Reports/PostDetail";
import CommentDetail from "../screen/NonAuth/Reports/CommentDetail";
import ChangePassword from "../screen/NonAuth/General/ChangePassword";
// import UploadStatus from "../screen/Auth/Home/UploadStatus";

export const AppRouter = [
    // Auth Part
    {
        path: RouterKeys.NON_Auth.CONTINUE,
        element: (
            <AuthProtect>
                <AuthLayout />,
            </AuthProtect>
        ),
        children: [
            {
                index: true,  // Default route when visiting '/'
                element: <Login />,
            },
            {
                path: RouterKeys.AUTH.FORGOT_PASSWORD,
                element: <ForgotPassword />,
            },
            {
                path: RouterKeys.AUTH.OTP_VERIFY,
                element: <OTPVerify />,
            },
            {
                path: RouterKeys.AUTH.CREATE_PASSWORD,
                element: <NewPassword />,
            },
        ],
    },
    // after login parts
    {
        element: (
            <ProtectRoute>
                <MainLayout />
            </ProtectRoute>
        ),
        children: [
            {
                path: RouterKeys.NON_Auth.HOME,
                element: <Home />,
            },
            {
                path: RouterKeys.NON_Auth.USERS,
                element: <Users />,
            },
            {
                path: RouterKeys.NON_Auth.USER_Detail,
                element: <UserDetailView />,
            },
            {
                path: RouterKeys.NON_Auth.CATEGORY,
                element: <Category />,
            },
            {
                path: RouterKeys.NON_Auth.CATEGORY_DETAIL,
                element: <CategoryView />,
            },
            {
                path: RouterKeys.NON_Auth.COMMUNITY,
                element: <Community />,
            },
            {
                path: RouterKeys.NON_Auth.COMMUNITY_DETAIL,
                element: <CommunityDetail />,
            },
            {
                path: RouterKeys.NON_Auth.FAQ,
                element: <FAQList />,
            },
            {
                path: RouterKeys.NON_Auth.REPORT_USERS,
                element: <ReportUser />,
            },
            {
                path: RouterKeys.NON_Auth.REPORT_POST,
                element: <Post />,
            },
            {
                path: RouterKeys.NON_Auth.REPORT_POST_DETAIL,
                element: <PostDetail />,
            },
            {
                path: RouterKeys.NON_Auth.REPORT_COMMENTS,
                element: <Comments />,
            },
            {
                path: RouterKeys.NON_Auth.REPORT_COMMENTS_DETAIL,
                element: <CommentDetail />,
            },
            {
                path: RouterKeys.NON_Auth.TERMS_CONDITION,
                element: <Terms />,
            },
            {
                path: RouterKeys.NON_Auth.PRIVACY,
                element: <Privacy />,
            },
            {
                path: RouterKeys.NON_Auth.CHANGE_PASSWORD,
                element: <ChangePassword/>,
            },
        ],
    },
];

