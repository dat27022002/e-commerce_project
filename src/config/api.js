const urlBE = process.env.REACT_APP_BASE_BE_URL
const api = {
    LOGIN: urlBE + '/user/login',
    SIGNUP: urlBE + '/user/create',
    CART: urlBE + '/user/cart',
    RECIPIENT: urlBE + '/user/recipient',
    CHECKOUT: urlBE + '/order/create',
    VERIFY_EMAIL: urlBE + '/user/forgot-pwd',
    VERIFY_OTP: urlBE + '/user/verify-otp',
    RESET_PASSWORD: urlBE + '/user/reset-pwd-forgot',
    LOGIN_BY_GG: urlBE + '/user/login/google'
};

export default api;
