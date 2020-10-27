import { request } from 'umi';

class TrackService {
  getTracks = async (params?: API.QueryParams) => {
    return request<API.PagedList<API.TrackDto>>('/api/tracks', {
      params,
    });
  };

  deleteTrack = async (id: string) => {
    return request<void>(`/api/tracks/${id}?isHardDelete=true`, { method: 'DELETE' });
  };

  createTrack = async (data: API.CreateTrackDto) => {
    return request<API.TrackDto>('/api/tracks', { method: 'POST', data });
  };

  updateTrack = async (id: string, data: API.CreateTrackDto) => {
    return request<API.TrackDto>(`/api/tracks/${id}`, { method: 'PUT', data });
  };
}

export const trackService = new TrackService();
