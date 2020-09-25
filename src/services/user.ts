import { request } from 'umi';

export async function query() {
  return request<DTO.UserDto[]>('/api/users');
}

export async function queryCurrent() {
  return request<DTO.UserDto>('/api/profile');
}

export async function queryNotices(): Promise<any> {
  return request<{ data: API.NoticeIconData[] }>('/api/notices');
}
