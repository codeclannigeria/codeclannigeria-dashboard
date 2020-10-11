import userService from '@/services/user.service';
import { Effect, Reducer } from 'umi';

import { AnalysisData } from './data.d';
import { fakeChartData, getSubmissions } from './service';

export interface ModelType {
  namespace: string;
  state: AnalysisData;
  effects: {
    fetch: Effect;
    fetchSalesData: Effect;
    getSubmissions: Effect;
    getUsers: Effect;
  };
  reducers: {
    save: Reducer<AnalysisData>;
    clear: Reducer<AnalysisData>;
  };
}
const initState: AnalysisData = {
  visitData: [],
  visitData2: [],
  salesData: [],
  searchData: [],
  offlineData: [],
  offlineChartData: [],
  salesTypeData: [],
  salesTypeDataOnline: [],
  salesTypeDataOffline: [],
  radarData: [],
  submissionsData: { items: [], totalCount: 0 },
  usersData: { items: [], totalCount: 0 },
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
    *fetchSalesData(_, { call, put }) {
      const response = yield call(fakeChartData);
      yield put({
        type: 'save',
        payload: {
          salesData: response.salesData,
        },
      });
    },
    *getSubmissions({ payload }, { call, put }) {
      const response = yield call(() => getSubmissions(payload));
      yield put({
        type: 'save',
        payload: { submissionsData: response },
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
