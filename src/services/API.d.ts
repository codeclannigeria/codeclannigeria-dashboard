declare namespace API {
  export interface CurrentUser {
    avatar?: string;
    name?: string;
    title?: string;
    group?: string;
    signature?: string;
    tags?: {
      key: string;
      label: string;
    }[];
    userid?: string;
    access?: 'user' | 'guest' | 'admin';
    unreadCount?: number;
  }

  export interface LoginStateType {
    status?: 'ok' | 'error';
    type?: string;
  }

  export interface NoticeIconData {
    id: string;
    key: string;
    avatar: string;
    title: string;
    datetime: string;
    type: string;
    read?: boolean;
    description: string;
    clickClose?: boolean;
    extra: any;
    status: string;
  }

  export interface QueryParams {
    search?: { [key: string] };
    opts?: { [key: string] };
    limit?: number;
    skip?: number;
  }
  export interface PagedList<T> {
    totalCount: number;
    items: T[];
  }
  export interface SMQuery<T> {
    params: API.QueryParams;
    responseProp: string;
    path: string;
  }
}
