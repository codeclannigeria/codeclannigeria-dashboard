import { request } from 'umi';
import { BasicListItemDataType } from './data';

interface ParamsType extends Partial<BasicListItemDataType> {
  count?: number;
}

export async function queryFakeList(params: ParamsType) {
  return request('/api/fake_list', {
    params,
  });
}

export async function deleteTrack(id: string) {
  return request<void>(`/api/tracks/${id}?isHardDelete=true`, { method: 'DELETE' });
}

export async function createTrack(data: API.CreateTrackDto) {
  return request<API.TrackDto>('/api/tracks', { method: 'POST', data });
}

export async function updateTrack(id: string, data: API.CreateTrackDto) {
  return request<API.TrackDto>(`/api/tracks/${id}`, { method: 'PUT', data });
}
