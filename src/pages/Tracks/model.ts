/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
import { getEntities } from '@/services/base.service';
import { Effect, Reducer } from 'umi';
import { trackService } from './service';

export interface StateType {
  tracksData: API.PagedList<API.TrackDto>;
  tasksData: API.PagedList<API.TaskDto>;
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    fetch: Effect;
    create: Effect;
    update: Effect;
    delete: Effect;
  };
  reducers: {
    queryList: Reducer<StateType>;
    save: Reducer<StateType>;
    updateReducer: Reducer<StateType>;
    deleteReducer: Reducer<StateType>;
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
    *create({ payload }, { call, put }) {
      const response = yield call(trackService.createTrack, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *update({ payload: { createTrackDto, id } }, { call, put }) {
      const response = yield call(() => trackService.updateTrack(id, createTrackDto));
      yield put({
        type: 'updateReducer',
        payload: response,
      });
    },
    *delete({ payload }, { call, put }) {
      yield call(trackService.deleteTrack, payload.id);
      yield put({
        type: 'deleteReducer',
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
    updateReducer(state, { payload }) {
      const updated = state?.tracksData.items.find((item: API.TrackDto) => item.id === payload.id);
      if (updated) {
        const index = state?.tracksData.items.indexOf(updated);
        state?.tracksData.items.splice(index as number, 1, payload);
      }
      return { ...state, ...payload };
    },
    queryList(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    deleteReducer(state, { payload }) {
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
