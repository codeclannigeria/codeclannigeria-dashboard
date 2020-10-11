import { request } from 'umi';

class UserService {
  getUsers = (params?: API.QueryParams) => {
    return request<API.PagedList<API.UserDto>>('/api/users', {
      params,
    });
  };

  getCurrentUser = () => request<API.UserDto>('/api/profile');

  getNotifs = () => request<{ data: API.NoticeIconData[] }>('/api/notices');

  deleteUsers = (params: { key: string[] }) => {
    const isHardDelete = true;
    const input: API.DeleteManyType = {
      ids: params.key,
    };
    return request(`/api/users/?isHardDelete=${isHardDelete}`, {
      method: 'DELETE',
      data: input,
    });
  };

  createUser = (params: API.CreateUserDto) => {
    return request('/api/users', {
      method: 'POST',
      data: {
        ...params,
        method: 'post',
      },
    });
  };

  updateUser = (params: Partial<API.UserDto>) => {
    return request(`/api/users/${params.id}`, {
      method: 'PUT',
      data: params,
    });
  };
}
export default new UserService();
