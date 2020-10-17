import { InfoCircleOutlined } from '@ant-design/icons';
import { Card, Col, Row, Table, Tooltip } from 'antd';
import moment from 'moment';
import numeral from 'numeral';
import React from 'react';

import { SearchDataType } from '../data.d';
import styles from '../style.less';
import { MiniArea } from './Charts';
import NumberInfo from './NumberInfo';
import Trend from './Trend';

const columns = [
  {
    title: 'Rank',
    dataIndex: 'index',
    key: 'index',
  },
  {
    title: 'Mentee',
    dataIndex: 'keyword',
    key: 'keyword',
    render: (text: React.ReactNode) => <a href="/">{text}</a>,
  },
  {
    title: 'Tasks',
    dataIndex: 'count',
    key: 'count',
    sorter: (
      a: {
        count: number;
      },
      b: {
        count: number;
      },
    ) => a.count - b.count,
    className: styles.alignRight,
  },
  {
    title: 'Monthly trend',
    dataIndex: 'range',
    key: 'range',
    sorter: (
      a: {
        range: number;
      },
      b: {
        range: number;
      },
    ) => a.range - b.range,
    render: (
      text: React.ReactNode,
      record: {
        status: number;
      },
    ) => (
      <Trend flag={record.status === 1 ? 'down' : 'up'} reverseColor colorful={!!text && text > 0}>
        <span
          style={{
            marginRight: 4,
          }}
        >
          {numeral(text).format('0,0')}%
        </span>
      </Trend>
    ),
  },
];
type Paged<T> = API.PagedList<T>;

const TopSearch = ({
  loading,
  submissionsData,
  searchData,
}: {
  loading: boolean;
  submissionsData: Paged<API.SubmissionDto>;
  searchData: SearchDataType[];
}) => {
  const graphData = ({
    items,
    nodes = 2,
    goBack = 1,
    duration = 'days',
  }: {
    items: any[];
    nodes?: number;
    goBack?: number;
    duration?: 'days' | 'weeks' | 'months';
  }) => {
    const data: {
      x: string;
      y: number;
    }[] = [];
    if (!items) return data;
    const now = new Date();

    for (let i = nodes; i >= 0; i -= 1) {
      const toDate = moment(now).subtract(goBack * i, duration);
      const fromDate = moment(toDate).subtract(goBack, duration);
      const res = items.filter((item) => {
        const date = new Date(item.createdAt);
        return date >= fromDate.toDate() && date <= toDate.toDate();
      });
      data.push({
        x: `${toDate.format('YY/MM/DD')}`,
        y: res.length,
      });
    }

    return data;
  };

  const { items } = submissionsData;

  const dateData = (duration: 'months' | 'weeks', goBack = 0) => {
    const toDate = moment(new Date()).subtract(goBack, duration).toDate();
    const fromDate = moment(toDate).subtract(1, duration).toDate();
    return items.filter((item) => {
      const date = new Date(item.createdAt);
      return date >= fromDate && date <= toDate;
    });
  };

  const diffData = (
    d1: any[],
    d2: any[],
  ): {
    status: 'up' | 'down';
    diff: number;
  } => ({
    status: d1.length > d2.length ? 'up' : 'down',
    diff: Math.abs(d1.length - d2.length),
  });

  const weekData = [
    dateData('weeks'),
    dateData('weeks', 1),
    dateData('weeks', 2),
    dateData('weeks', 3),
  ];
  const weekDiff = diffData(weekData[0], weekData[1]);
  const monthData = [
    dateData('months'),
    dateData('months', 1),
    dateData('months', 2),
    dateData('months', 3),
  ];
  const monthDiff = diffData(monthData[0], monthData[1]);
  return (
    <Card
      loading={loading}
      bordered={false}
      title="Tasks Engagement"
      style={{
        height: '100%',
      }}
    >
      <Row gutter={68} itemType="flex">
        <Col
          sm={12}
          xs={24}
          style={{
            marginBottom: 24,
          }}
        >
          <NumberInfo
            subTitle={
              <span>
                Weekly Submissions
                <Tooltip title="Weekly completion trend">
                  <InfoCircleOutlined
                    style={{
                      marginLeft: 8,
                    }}
                  />
                </Tooltip>
              </span>
            }
            gap={8}
            total={numeral(weekData[0].length || 0).format('0,0')}
            status={weekDiff.status}
            subTotal={weekDiff.diff}
          />
          <MiniArea
            line
            height={45}
            data={graphData({
              items: [...weekData[0], ...weekData[1], ...weekData[2], ...weekData[3]],
              nodes: 4,
              duration: 'weeks',
            })}
          />
        </Col>
        <Col
          sm={12}
          xs={24}
          style={{
            marginBottom: 24,
          }}
        >
          <NumberInfo
            subTitle={
              <span>
                Monthly Submissions
                <Tooltip title="Monthly task completion trend">
                  <InfoCircleOutlined
                    style={{
                      marginLeft: 8,
                    }}
                  />
                </Tooltip>
              </span>
            }
            total={numeral(monthData[0].length || 0).format('0,0')}
            status={monthDiff.status}
            subTotal={monthDiff.diff}
            gap={8}
          />
          <MiniArea
            line
            height={45}
            data={graphData({
              items: [...monthData[0], ...monthData[1], ...monthData[2], ...monthData[3]],
              nodes: 4,
              duration: 'months',
            })}
          />
        </Col>
      </Row>
      <Table<any>
        rowKey={(record) => record.index}
        size="small"
        columns={columns}
        dataSource={searchData}
        pagination={{
          style: {
            marginBottom: 0,
          },
          pageSize: 5,
        }}
      />
    </Card>
  );
};

export default TopSearch;
