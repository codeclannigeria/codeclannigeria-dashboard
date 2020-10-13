export interface GraphData {
  x: string;
  y: number;
}
export interface SearchDataType {
  index: number;
  keyword: string;
  count: number;
  range: number;
  status: number;
}

export interface OfflineDataType {
  name: string;
  cvr: number;
}

export interface OfflineChartData {
  x: any;
  y1: number;
  y2: number;
}

export interface RadarData {
  name: string;
  label: string;
  value: number;
}
export interface AnalysisData {
  visitData2: GraphData[];
  searchData: SearchDataType[];
  offlineData: OfflineDataType[];
  offlineChartData: OfflineChartData[];
  radarData: RadarData[];
  submissionsData: API.PagedList<API.SubmissionDto>;
  usersData: API.PagedList<API.UserDto>;
  mentorMenteesData: API.PagedList<API.MentorMenteeDto>;
}
