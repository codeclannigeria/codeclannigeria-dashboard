import { request } from 'umi';

class AuthService {
  login = (input: API.LoginReqDto) =>
    request<API.LoginResDto>('/api/auth/login', {
      data: input,
      method: 'POST',
    });

  logout = () => localStorage.clear();
}
export default new AuthService();
