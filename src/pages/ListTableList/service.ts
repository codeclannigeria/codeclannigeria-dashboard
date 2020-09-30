import { request } from 'umi';

export async function queryRule(params?: API.QueryParams) {
  return request<API.PagedList<API.UserDto>>('/api/users', {
    params,
  });
}

export async function removeRule(params: { key: string[] }) {
  return request('/api/users', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params: API.CreateUserDto) {
  return request('/api/users', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateUser(params: Partial<API.UserDto>) {
  return request(`/api/users/${params.id}`, {
    method: 'PUT',
    data: params,
  });
}
