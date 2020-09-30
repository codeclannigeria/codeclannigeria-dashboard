import { request } from 'umi';

export async function getUsers(params?: API.QueryParams) {
  return request<API.PagedList<API.UserDto>>('/api/users', {
    params,
  });
}

export async function deleteUsers(params: { key: string[] }) {
  const isHardDelete = true;
  const input: API.DeleteManyType = {
    ids: params.key,
  };
  return request(`/api/users/?isHardDelete=${isHardDelete}`, {
    method: 'DELETE',
    data: input,
  });
}

export async function createUser(params: API.CreateUserDto) {
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
