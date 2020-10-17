import { getEntities } from '@/services/get.service';
import userService from '@/services/user.service';
import { Effect, Reducer } from 'umi';

import { AnalysisData } from './data.d';
import { fakeChartData, getSubmissions } from './service';

export interface ModelType {
  namespace: string;
  state: AnalysisData;
  effects: {
    fetch: Effect;
    getSubmissions: Effect;
    getUsers: Effect;
    // getMentorMentees: Effect;
    getEntities: Effect;
  };
  reducers: {
    save: Reducer<AnalysisData>;
    clear: Reducer<AnalysisData>;
  };
}
const initState: AnalysisData = {
  visitData2: [],
  searchData: [],
  offlineData: [],
  offlineChartData: [],
  radarData: [],
  submissionsData: { items: [], totalCount: 0 },
  usersData: { items: [], totalCount: 0 },
  mentorMenteesData: { items: [], totalCount: 0 },
};

const Model: ModelType = {
  namespace: 'dashboard',
  state: initState,
  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(fakeChartData);

      yield put({
        type: 'save',
        payload: response,
      });
    },
    *getSubmissions({ payload }, { call, put }) {
      const response = yield call(() => getSubmissions(payload));

      yield put({
        type: 'save',
        payload: { submissionsData: response },
      });
    },
    *getEntities({ payload }, { call, put }) {
      const response = yield call(() => getEntities(payload.url, payload.params));

      yield put({
        type: 'save',
        payload: { [payload.responseProp]: response },
      });
    },
    *getUsers({ payload }, { call, put }) {
      const response = yield call(() => userService.getUsers(payload));

      yield put({
        type: 'save',
        payload: { usersData: response },
      });
    },
  },
  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    clear() {
      return initState;
    },
  },
};

export default Model;
