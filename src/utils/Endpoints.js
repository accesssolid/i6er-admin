export const Endpoints = {
    AUTH :{
        LOGIN: `admin/auth/login`,
        FORGET_PASSWORD: `admin/auth/forgot_password`,
        RESET_PASSWORD: `admin/auth/reset_password`,
        VERIFY_OTP: `admin/auth/verify_otp`,
        RESENT_OTP: `admin/auth/resend_otp`,
        LOGOUT: `admin/auth/logout`
    },
    NON_AUTH:{
        CHANGE_PASSWORD: `admin/auth/change_password`,
        DASHBOARD_DATA: `admin/user/dashboard`,
        USER_GRAPH:'/admin/dashboard/users',
        USER_LIST:'admin/user/list',
        CONTACT_US_LIST:'admin/contactus/list',
        USER_DETAILS:'admin/user/details',
        USER_INFO_LIST:'admin/user/info/list',
        USER_STATUS_UPDATE:'admin/user/status',
        COMMON_CONTENT:'common/common_content',
        COMMON_CONTENT_UPDATE:'admin/common/common_content',
        FAQ_LIST:'common/questions',
        FAQ_Add_UPDATE:'admin/common/question',
        
    },
}