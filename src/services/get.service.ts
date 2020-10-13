import { request } from 'umi';

export const getEntities = async <T>(path: string, params?: API.QueryParams) => {
  return request<T>(path, {
    params,
    // cache: 'reload',
    // useCache: true,
    // ttl: 60 * mins * 1000,
  });
};
