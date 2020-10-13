import { GridContent } from '@ant-design/pro-layout';
import { Col, Row } from 'antd';
import { RangePickerProps } from 'antd/es/date-picker/generatePicker';
import _ from 'lodash';
import moment, { Moment } from 'moment';
import React, { Suspense, useEffect, useState } from 'react';
import { connect, Dispatch } from 'umi';

import PageLoading from './components/PageLoading';
import { AnalysisData, GraphData, SearchDataType } from './data.d';
import styles from './style.less';
import { getTimeDistance } from './utils/utils';

const IntroduceRow = React.lazy(() => import('./components/IntroduceRow'));
const SalesCard = React.lazy(() => import('./components/SubmissionCard'));
const TopSearch = React.lazy(() => import('./components/TopSearch'));
const ProportionSales = React.lazy(() => import('./components/ProportionSales'));
// const OfflineData = React.lazy(() => import('./components/OfflineData'));

type RangePickerValue = RangePickerProps<Moment>['value'];
interface DashboardProps {
  dashboard: AnalysisData;
  dispatch: Dispatch;
  loading: boolean;
}

interface DashboardState {
  salesType: 'all' | 'online' | 'stores';
  currentTabKey: string;
  dateType: 'today' | 'week' | 'month' | 'year';
  rangePickerValue: RangePickerValue;
}

const Dashboard: React.FC<DashboardProps> = ({ dashboard, dispatch, loading }) => {
  const [state, setState] = useState<DashboardState>({
    salesType: 'all',
    dateType: 'year',
    currentTabKey: '',
    rangePickerValue: getTimeDistance('year'),
  });

  let reqRef = 0;

  useEffect(() => {
    reqRef = requestAnimationFrame(() => {
      // dispatch({
      //   type: 'dashboard/fetch',
      // });
      dispatch<API.QueryParams>({
        type: 'dashboard/getSubmissions',
        payload: { limit: 1000000 },
      });
      dispatch<API.QueryParams>({
        type: 'dashboard/getUsers',
        payload: { limit: 1000000, opts: { sort: { createdAt: 1 } } },
      });
      dispatch<API.SMQuery<API.MentorMenteeDto>>({
        type: 'dashboard/getEntities',
        payload: {
          params: { limit: 1000000 },
          responseProp: 'mentorMenteesData',
          path: '/api/mentor-mentee',
        },
      });
    });
    return () => {
      dispatch({
        type: 'dashboard/clear',
      });
      cancelAnimationFrame(reqRef);
      clearTimeout(0);
    };
  }, []);

  // const handleChangeSalesType = (e: RadioChangeEvent) => {
  //   setState({ ...state, salesType: e.target.value });
  // };

  // const handleTabChange = (key: string) => {
  //   setState({ ...state, currentTabKey: key });
  // };

  const handleRangePickerChange = (rangePickerValue: RangePickerValue) => {
    setState({ ...state, rangePickerValue });

    // dispatch({
    //   type: 'dashboard/fetchSalesData',
    // });
  };

  const selectDate = (type: 'today' | 'week' | 'month' | 'year') => {
    setState({ ...state, rangePickerValue: getTimeDistance(type), dateType: type });

    // dispatch({
    //   type: 'dashboard/fetchSalesData',
    // });
  };

  const isActive = (type: 'today' | 'week' | 'month' | 'year') => {
    const { rangePickerValue } = state;
    if (!rangePickerValue) {
      return '';
    }
    const value = getTimeDistance(type);
    if (!value) {
      return '';
    }
    if (!rangePickerValue[0] || !rangePickerValue[1]) {
      return '';
    }
    if (
      rangePickerValue[0].isSame(value[0] as Moment, 'day') &&
      rangePickerValue[1].isSame(value[1] as Moment, 'day')
    ) {
      return styles.currentDate;
    }
    return '';
  };
  const splitDateIntoEqualIntervals = (
    startDate: Date,
    endData: Date,
    numberOfIntervals: number,
  ) => {
    const diff = endData.getTime() - startDate.getTime();
    const intervalLength = diff / numberOfIntervals;
    const intervals = [];
    for (let i = 1; i <= numberOfIntervals; i += 1)
      intervals.push(new Date(startDate.getTime() + i * intervalLength));
    return intervals;
  };

  const submissionCardData = (
    submissions: API.SubmissionDto[],
    startDate = state.rangePickerValue?.[0]?.toDate(),
    endDate = state.rangePickerValue?.[1]?.toDate(),
    split = 12,
  ) => {
    const data: GraphData[] = [];
    if (!startDate || !endDate) return data;

    const timeSlots = splitDateIntoEqualIntervals(startDate, endDate, split);

    let fromDate = startDate;

    for (let i = 0; i < timeSlots.length; i += 1) {
      const toDate = timeSlots[i];

      // eslint-disable-next-line no-loop-func
      const res = submissions.filter((item) => {
        const date = new Date(item.createdAt);
        return date >= fromDate && date <= toDate;
      });
      data.push({
        x: `${moment(toDate).format('MM/DD H:S')}`,
        y: res.length,
      });
      fromDate = moment(toDate).add(1, 's').toDate();
    }

    return data;
  };
  const taskEngagementTblData = (submissions: API.SubmissionDto[]) => {
    const submissionRes = _.groupBy(submissions, ({ mentee }) => mentee.id);
    const submissionResSorted = _.orderBy(submissionRes, (item) => item.length, 'desc');

    const now = new Date();
    const currDate = moment(now);
    const currMonthRange = {
      start: currDate.startOf('month').toDate(),
      end: currDate.endOf('month').toDate(),
    };

    const prevDate = moment(now).subtract(1, 'month');
    const prevMonthRange = {
      start: prevDate.startOf('month').toDate(),
      end: prevDate.endOf('month').toDate(),
    };
    const searchTableData: SearchDataType[] = [];
    Object.keys(submissionResSorted).forEach((k, i) => {
      const data = submissionResSorted[k] as API.SubmissionDto[];

      const index = i + 1;
      const keyword = data[0].mentee.firstName.toLocaleUpperCase();
      const count = data.length;
      const prevMonthData = data.filter((item) => {
        const date = new Date(item.createdAt);
        return date >= prevMonthRange.start && date <= prevMonthRange.end;
      });
      const currMonthData = data.filter((item) => {
        const date = new Date(item.createdAt);
        return date >= currMonthRange.start && date <= currMonthRange.end;
      });

      const prev = prevMonthData.length;
      const curr = currMonthData.length;
      const diff = Math.abs(prev - curr);
      let range;
      if (prev === 0 || curr === 0) range = diff * 100;
      else range = +((diff * 100) / prev).toFixed(2);

      const status = prevMonthData.length > currMonthData.length ? 1 : 0;
      searchTableData.push({ index, keyword, range, status, count });
    });
    return searchTableData;
  };
  const pieChatData = (items: API.MentorMenteeDto[]) => {
    const pieData: GraphData[] = [];
    const result = _.groupBy(items, ({ track }) => track.title);
    Object.keys(result).forEach((key) => {
      const y = result[key].length;
      const x = key.length >= 10 ? `${key.substr(0, 10)}...` : key;
      pieData.push({ x, y });
    });
    return pieData;
  };
  const render = () => {
    const { rangePickerValue } = state;

    const {
      submissionsData,
      // offlineData,
      // offlineChartData,

      usersData,
      mentorMenteesData,
    } = dashboard;

    const pieData = pieChatData(mentorMenteesData.items);
    const searchTableData = taskEngagementTblData(submissionsData.items);

    // const activeKey = currentTabKey || (offlineData[0] && offlineData[0].name);
    return (
      <GridContent>
        <Suspense fallback={<PageLoading />}>
          <IntroduceRow loading={loading} submissionsData={submissionsData} usersData={usersData} />
        </Suspense>
        <Suspense fallback={null}>
          <SalesCard
            submissionsRawData={submissionsData}
            rangePickerValue={rangePickerValue}
            submissionsData={submissionCardData(submissionsData.items)}
            isActive={isActive}
            handleRangePickerChange={handleRangePickerChange}
            loading={loading}
            // handleTabChange={handleSubmissionCardTabChange}
            selectDate={selectDate}
          />
        </Suspense>
        <Row
          gutter={24}
          style={{
            marginTop: 24,
          }}
        >
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Suspense fallback={null}>
              <TopSearch
                loading={loading}
                submissionsData={submissionsData}
                searchData={searchTableData}
              />
            </Suspense>
          </Col>
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Suspense fallback={null}>
              <ProportionSales loading={loading} salesPieData={pieData} />
            </Suspense>
          </Col>
        </Row>
        {/* <Suspense fallback={null}>
          <OfflineData
            activeKey={activeKey}
            loading={loading}
            offlineData={offlineData}
            offlineChartData={offlineChartData}
            handleTabChange={handleTabChange}
          />
        </Suspense> */}
      </GridContent>
    );
  };
  return render();
};

export default connect(
  ({
    dashboard,
    loading,
  }: {
    dashboard: any;
    loading: {
      effects: { [key: string]: boolean };
    };
  }) => ({
    dashboard,
    loading: loading.effects['dashboard/getUsers'],
  }),
)(Dashboard);
