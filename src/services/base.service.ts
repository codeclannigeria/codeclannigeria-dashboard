import { request } from 'umi';

export const getEntities = async <T>(url: string, params?: API.QueryParams) => {
  return request<T>(url, {
    params,
    // cache: 'reload',
    // useCache: true,
    // ttl: 60 * mins * 1000,
  });
};
export const createEntity = async <TCreateDto, TDto>(url: string, data: TCreateDto) => {
  return request<TDto>(url, { method: 'POST', data });
};
