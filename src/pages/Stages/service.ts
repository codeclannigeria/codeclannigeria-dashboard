import { request } from 'umi';

class StageService {
  getStages = async (params?: API.QueryParams) =>
    request<API.PagedList<API.StageDto>>('/api/stages', {
      params,
    });

  deleteStages = (ids: string[]) =>
    request<void>('/api/stages/?isHardDelete=true', {
      method: 'DELETE',
      data: { ids },
    });

  createStage = (data: API.CreateStageDto) =>
    request<API.StageDto>('/api/stages', {
      method: 'POST',
      data,
    });

  updateStage = (stageId: string, data: Partial<API.CreateStageDto>) =>
    request<API.StageDto>(`/api/stages/${stageId}`, {
      method: 'PUT',
      data,
    });
}

export const stageService = new StageService();
