import { request } from 'umi';

class TaskService {
  getTasks = async (params?: API.QueryParams) =>
    request<API.PagedList<API.TaskDto>>('/api/tasks', {
      params,
    });

  deleteTasks = (ids: string[]) =>
    request<void>('/api/tasks/?isHardDelete=true', {
      method: 'DELETE',
      data: { ids },
    });

  createTask = (data: API.CreateTaskDto) =>
    request<API.TaskDto>('/api/tasks', {
      method: 'POST',
      data,
    });

  updateTask = (taskId: string, data: Partial<API.CreateTaskDto>) =>
    request<API.TaskDto>(`/api/tasks/${taskId}`, {
      method: 'PUT',
      data,
    });
}

export const taskService = new TaskService();
