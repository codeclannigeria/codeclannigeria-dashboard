/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
import { getEntities } from '@/services/get.service';
import { Effect, Reducer } from 'umi';

import { createTrack, deleteTrack, queryFakeList } from './service';

export interface StateType {
  tracksData: API.PagedList<API.TrackDto>;
  tasksData: API.PagedList<API.TaskDto>;
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    fetch: Effect;
    appendFetch: Effect;
    createTrack: Effect;
    deleteTrack: Effect;
  };
  reducers: {
    queryList: Reducer<StateType>;
    save: Reducer<StateType>;
    deleteTrackReducer: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'tracks',

  state: {
    tracksData: { items: [], totalCount: 0 },
    tasksData: { items: [], totalCount: 0 },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const { url, params } = payload;
      const response = yield call(() => getEntities(url, params));
      yield put({
        type: 'queryList',
        payload: { [payload.responseProp]: response },
      });
    },
    *appendFetch({ payload }, { call, put }) {
      const response = yield call(queryFakeList, payload);
      yield put({
        type: 'appendList',
        payload: Array.isArray(response) ? response : [],
      });
    },
    *createTrack({ payload }, { call, put }) {
      const response = yield call(createTrack, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *deleteTrack({ payload }, { call, put }) {
      yield call(deleteTrack, payload.id);
      yield put({
        type: 'deleteTrackReducer',
        payload,
      });
    },
  },

  reducers: {
    save(state, { payload }) {
      state?.tracksData.items.splice(0, 0, payload);
      if (state?.tracksData) state.tracksData.totalCount++;
      return { ...state, ...payload };
    },
    queryList(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    deleteTrackReducer(state, { payload }) {
      if (state?.tracksData) {
        state.tracksData.totalCount--;
        const tracks = state?.tracksData.items.filter((item) => item.id !== payload.id);
        state.tracksData.items = tracks;
      }
      return { ...state, ...payload };
    },
  },
};

export default Model;
