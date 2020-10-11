import { request } from 'umi';

// const mins = 10;
export async function fakeChartData() {
  return request('/api/fake_chart_data');
}
export const getSubmissions = async (params?: API.QueryParams) => {
  return request<API.PagedList<API.SubmissionDto>>('/api/submissions', {
    params,
    // cache: 'reload',
    // useCache: true,
    // ttl: 60 * mins * 1000,
  });
};
