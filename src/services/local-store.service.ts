class LocalStoreService {
  private AUTH_TOKEN_KEY = 'authToken';

  saveAuthToken = (token: string) => {
    localStorage.setItem(this.AUTH_TOKEN_KEY, token);
  };

  getAuthToken = () => localStorage.getItem(this.AUTH_TOKEN_KEY);
}
export default new LocalStoreService();
