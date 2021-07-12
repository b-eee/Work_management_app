export default (vue: any, route: any, redirect:any): void => {
    if (!vue.$cookies.get('token') && vue.route.name !== 'login' && vue.route.name !== 'password-new-token' && vue.route.name !== 'password-reset') {
        vue.redirect('/login')
    } else {
        vue.$axios.defaults.headers.common.Authorization = `Bearer ${vue.$cookies.get('token')}`
    }
}