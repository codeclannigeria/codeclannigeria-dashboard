import { EllipsisOutlined } from '@ant-design/icons';
import { GridContent } from '@ant-design/pro-layout';
import { Col, Dropdown, Menu, Row } from 'antd';
import { RangePickerProps } from 'antd/es/date-picker/generatePicker';
import { RadioChangeEvent } from 'antd/es/radio';
import { Moment } from 'moment';
import React, { Suspense, useEffect, useState } from 'react';
import { connect, Dispatch } from 'umi';

import PageLoading from './components/PageLoading';
import { AnalysisData } from './data.d';
import styles from './style.less';
import { getTimeDistance } from './utils/utils';

const IntroduceRow = React.lazy(() => import('./components/IntroduceRow'));
const SalesCard = React.lazy(() => import('./components/SalesCard'));
const TopSearch = React.lazy(() => import('./components/TopSearch'));
const ProportionSales = React.lazy(() => import('./components/ProportionSales'));
const OfflineData = React.lazy(() => import('./components/OfflineData'));

type RangePickerValue = RangePickerProps<Moment>['value'];

interface DashboardProps {
  dashboard: AnalysisData;
  dispatch: Dispatch;
  loading: boolean;
}

interface DashboardState {
  salesType: 'all' | 'online' | 'stores';
  currentTabKey: string;
  rangePickerValue: RangePickerValue;
}

const Dashboard: React.FC<DashboardProps> = ({ dashboard, dispatch, loading }) => {
  const [state, setState] = useState<DashboardState>({
    salesType: 'all',
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
    });
    return () => {
      dispatch<API.QueryParams>({
        type: 'dashboard/clear',
      });
      cancelAnimationFrame(reqRef);
      clearTimeout(0);
    };
  }, []);

  const handleChangeSalesType = (e: RadioChangeEvent) => {
    setState({ ...state, salesType: e.target.value });
  };

  const handleTabChange = (key: string) => {
    setState({ ...state, currentTabKey: key });
  };

  const handleRangePickerChange = (rangePickerValue: RangePickerValue) => {
    setState({ ...state, rangePickerValue });

    dispatch({
      type: 'dashboard/fetchSalesData',
    });
  };

  const selectDate = (type: 'today' | 'week' | 'month' | 'year') => {
    setState({ ...state, rangePickerValue: getTimeDistance(type) });

    dispatch({
      type: 'dashboard/fetchSalesData',
    });
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

  const render = () => {
    const { rangePickerValue, salesType, currentTabKey } = state;

    const {
      submissionsData,
      visitData2,
      salesData,
      searchData,
      offlineData,
      offlineChartData,
      salesTypeData,
      salesTypeDataOnline,
      salesTypeDataOffline,
      usersData,
    } = dashboard;
    let salesPieData;
    if (salesType === 'all') {
      salesPieData = salesTypeData;
    } else {
      salesPieData = salesType === 'online' ? salesTypeDataOnline : salesTypeDataOffline;
    }
    const menu = (
      <Menu>
        <Menu.Item>Option 1</Menu.Item>
        <Menu.Item>Option 2</Menu.Item>
      </Menu>
    );

    const dropdownGroup = (
      <span className={styles.iconGroup}>
        <Dropdown overlay={menu} placement="bottomRight">
          <EllipsisOutlined />
        </Dropdown>
      </span>
    );

    const activeKey = currentTabKey || (offlineData[0] && offlineData[0].name);
    return (
      <GridContent>
        <React.Fragment>
          <Suspense fallback={<PageLoading />}>
            <IntroduceRow
              loading={loading}
              submissionsData={submissionsData}
              usersData={usersData}
            />
          </Suspense>
          <Suspense fallback={null}>
            <SalesCard
              rangePickerValue={rangePickerValue}
              salesData={salesData}
              isActive={isActive}
              handleRangePickerChange={handleRangePickerChange}
              loading={loading}
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
                  visitData2={visitData2}
                  searchData={searchData}
                  dropdownGroup={dropdownGroup}
                />
              </Suspense>
            </Col>
            <Col xl={12} lg={24} md={24} sm={24} xs={24}>
              <Suspense fallback={null}>
                <ProportionSales
                  dropdownGroup={dropdownGroup}
                  salesType={salesType}
                  loading={loading}
                  salesPieData={salesPieData}
                  handleChangeSalesType={handleChangeSalesType}
                />
              </Suspense>
            </Col>
          </Row>
          <Suspense fallback={null}>
            <OfflineData
              activeKey={activeKey}
              loading={loading}
              offlineData={offlineData}
              offlineChartData={offlineChartData}
              handleTabChange={handleTabChange}
            />
          </Suspense>
        </React.Fragment>
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
    loading: loading.effects['dashboard/fetch'],
  }),
)(Dashboard);
