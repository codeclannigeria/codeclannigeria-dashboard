import { request } from 'umi';

class CourseService {
  getCourses = async (params?: API.QueryParams) =>
    request<API.PagedList<API.CourseDto>>('/api/courses', {
      params,
    });

  deleteCourses = (ids: string[]) =>
    request<void>('/api/courses/?isHardDelete=true', {
      method: 'DELETE',
      data: { ids },
    });

  createCourse = (data: API.CreateCourseDto) =>
    request<API.CourseDto>('/api/courses', {
      method: 'POST',
      data,
    });

  updateCourse = (courseId: string, data: Partial<API.CreateCourseDto>) =>
    request<API.CourseDto>(`/api/courses/${courseId}`, {
      method: 'PUT',
      data,
    });
}

export const courseService = new CourseService();
