import { InfoCircleOutlined } from '@ant-design/icons';
import { Col, Row, Tooltip } from 'antd';
import moment from 'moment';
import numeral from 'numeral';
import React from 'react';

import styles from '../style.less';
import Naira from '../utils/Naira';
import { ChartCard, Field, MiniArea, MiniBar, MiniProgress } from './Charts';
import Trend from './Trend';

const topColResponsiveProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 6,
  style: { marginBottom: 24 },
};
type Page<T> = API.PagedList<T>;
const IntroduceRow = ({
  loading,
  submissionsData,
  usersData,
}: {
  loading: boolean;
  submissionsData: Page<API.SubmissionDto>;
  usersData: Page<API.UserDto>;
}) => {
  const getGraphData = (items: any[], pastWeek: number) => {
    const data: { x: string; y: number }[] = [];
    const today = new Date();
    for (let i = 0; i < pastWeek; i += 1) {
      const toDate = moment(today)
        .subtract(7 * i, 'days')
        .toDate();
      const fromDate = moment(toDate).subtract(7, 'days').toDate();

      const res = items.filter((item) => {
        const date = new Date(item.createdAt);
        return date >= fromDate && date <= toDate;
      });

      data.push({
        x: `${moment(toDate).subtract(7, 'days').format('YYYY-MM-DD')} to ${moment(toDate).format(
          'YYYY-MM-DD',
        )}`,
        y: res.length,
      });
    }
    return data;
  };
  const users = getGraphData(usersData.items, 10);
  const submissions = getGraphData(submissionsData.items, 4);
  const weekAvg = (
    data: {
      x: React.ReactText;
      y: number;
    }[],
    weekCount: number,
  ) => {
    const sum = data.map((item) => item.y).reduce((prev, curr) => prev + curr);
    return sum && sum > 0 ? sum / weekCount : 0;
  };
  const mentorPercentage = () => {
    const { items } = usersData;
    const mentors = items.filter((item) => item.role === 'MENTOR');

    return (mentors?.length * 100) / usersData.totalCount;
  };
  return (
    <Row gutter={24} itemType="flex">
      <Col {...topColResponsiveProps}>
        <ChartCard
          bordered={false}
          title="Funds"
          action={
            <Tooltip title="Total funds flow">
              <InfoCircleOutlined />
            </Tooltip>
          }
          loading={loading}
          total={() => <Naira>0</Naira>}
          footer={<Field label="Monthly Expense" value={`₦ ${numeral(0).format('0,0')}`} />}
          contentHeight={46}
        >
          <Trend flag="up" style={{ marginRight: 16 }}>
            Weekly Profit
            <span className={styles.trendText}>0%</span>
          </Trend>
          <Trend flag="down">
            Weekly Expense
            <span className={styles.trendText}>0%</span>
          </Trend>
        </ChartCard>
      </Col>

      <Col {...topColResponsiveProps}>
        <ChartCard
          bordered={false}
          loading={loading}
          title="Users"
          action={
            <Tooltip title="Last 10 weeks sign-ups">
              <InfoCircleOutlined />
            </Tooltip>
          }
          total={numeral(usersData.totalCount).format('0,0')}
          footer={
            <Field label="Signups" value={`${numeral(weekAvg(users, 10)).format('0,0')}/w`} />
          }
          contentHeight={46}
        >
          <MiniArea color="#975FE4" data={users} />
        </ChartCard>
      </Col>
      <Col {...topColResponsiveProps}>
        <ChartCard
          bordered={false}
          loading={loading}
          title="Submissions"
          action={
            <Tooltip title="Last 4 weeks submissions">
              <InfoCircleOutlined />
            </Tooltip>
          }
          total={numeral(submissionsData.totalCount).format('0,0')}
          footer={<Field label="Submission" value={`${weekAvg(submissions, 4)}/w`} />}
          contentHeight={46}
        >
          <MiniBar data={submissions} />
        </ChartCard>
      </Col>
      <Col {...topColResponsiveProps}>
        <ChartCard
          loading={loading}
          bordered={false}
          title="Mentor Ratio"
          action={
            <Tooltip title="Percentage mentors to users">
              <InfoCircleOutlined />
            </Tooltip>
          }
          total={`${(mentorPercentage() || 0).toFixed(2)}%`}
          footer={
            <Field
              label="Mentors"
              value={numeral(
                usersData.items.filter((item) => item.role === 'MENTOR')?.length,
              ).format('0,0')}
            />
          }
          contentHeight={46}
        >
          <MiniProgress percent={mentorPercentage()} strokeWidth={8} target={80} color="#13C2C2" />
        </ChartCard>
      </Col>
    </Row>
  );
};

export default IntroduceRow;
