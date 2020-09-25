import { request } from 'umi';

class UserService {
  getUsers = (query?: API.QueryParams) => {
    return request<API.PagedList<API.UserDto>>('/api/users', {
      params: { ...query },
      paramsSerializer: (params) => JSON.stringify(params),
    });
  };

  getCurrentUser = () => request<API.UserDto>('/api/profile');

  getNotifs = () => request<{ data: API.NoticeIconData[] }>('/api/notices');
}
export default new UserService();
