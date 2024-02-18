export const isLoggedIn = () => {
    const user = localStorage.getItem("user");
    if (user == null || user.length <= 2) return false; return true;
}
export const logOut = () => {
    localStorage.removeItem('user');
}
export const UserData = () => {
    const user = localStorage.getItem('user');
    return JSON.parse(user);
}
export const api_key = () => {
    return process.env.API_KEY;
}