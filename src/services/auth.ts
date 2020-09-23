class AuthService {
  logout = () => localStorage.clear();
}
export default new AuthService();
