import { Card, Col, DatePicker, Row, Tabs } from 'antd';
import { RangePickerProps } from 'antd/es/date-picker/generatePicker';
import _ from 'lodash';
import moment from 'moment';
import numeral from 'numeral';
import React from 'react';

import { GraphData } from '../data';
import styles from '../style.less';
import { Bar } from './Charts';

const { RangePicker } = DatePicker;
const { TabPane } = Tabs;

type RankingType = { title: string; total: number };

type RangePickerValue = RangePickerProps<moment.Moment>['value'];
type DateKey = 'today' | 'week' | 'month' | 'year';
const SalesCard = ({
  rangePickerValue,
  submissionsData,
  isActive,
  handleRangePickerChange,
  loading,
  submissionsRawData,
  selectDate,
}: {
  rangePickerValue: RangePickerValue;
  isActive: (key: DateKey) => string;
  submissionsData: GraphData[];
  loading: boolean;
  submissionsRawData: API.PagedList<API.SubmissionDto>;
  handleRangePickerChange: (dates: RangePickerValue, dateStrings: [string, string]) => void;
  selectDate: (key: DateKey) => void;
}) => {
  const rankMentees = () => {
    let rankings: RankingType[] = [];
    const { items } = submissionsRawData;
    const menteeGrp = _.groupBy(items, (item) => item.mentee.id);
    Object.keys(menteeGrp).forEach((key) => {
      const submissions = menteeGrp[key];
      const { firstName, lastName } = submissions[0].mentee;
      const menteeName = `${firstName} ${lastName}`;
      rankings.push({ title: menteeName, total: submissions.length });
    });
    rankings = _.orderBy(rankings, 'total', 'desc');
    return _.take(rankings, 8);
  };

  return (
    <Card loading={loading} bordered={false} bodyStyle={{ padding: 0 }}>
      <div className={styles.salesCard}>
        <Tabs
          tabBarExtraContent={
            <div className={styles.salesExtraWrap}>
              <div className={styles.salesExtra}>
                <a className={isActive('today')} onClick={() => selectDate('today')}>
                  All Day
                </a>
                <a className={isActive('week')} onClick={() => selectDate('week')}>
                  All Week
                </a>
                <a className={isActive('month')} onClick={() => selectDate('month')}>
                  All Month
                </a>
                <a className={isActive('year')} onClick={() => selectDate('year')}>
                  All Year
                </a>
              </div>
              <RangePicker
                value={rangePickerValue}
                onChange={handleRangePickerChange}
                style={{ width: 256 }}
              />
            </div>
          }
          size="large"
          tabBarStyle={{ marginBottom: 24 }}
          // onChange={handleTabChange}
        >
          <TabPane tab="Submissions" key="submissions">
            <Row>
              <Col xl={16} lg={12} md={12} sm={24} xs={24}>
                <div className={styles.salesBar}>
                  <Bar height={295} title="Task Completion Trend" data={submissionsData} />
                </div>
              </Col>
              <Col xl={8} lg={12} md={12} sm={24} xs={24}>
                <div className={styles.salesRank}>
                  <h4 className={styles.rankingTitle}>Mentee Ranking</h4>
                  <ul className={styles.rankingList}>
                    {rankMentees().map((item, i) => (
                      <li key={item.title}>
                        <span
                          className={`${styles.rankingItemNumber} ${i < 3 ? styles.active : ''}`}
                        >
                          {i + 1}
                        </span>
                        <span className={styles.rankingItemTitle} title={item.title}>
                          {item.title}
                        </span>
                        <span className={styles.rankingItemValue}>
                          {numeral(item.total).format('0,0')}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Col>
            </Row>
          </TabPane>
          {/* <TabPane tab="Grading" key="grades">
            <Row>
              <Col xl={16} lg={12} md={12} sm={24} xs={24}>
                <div className={styles.salesBar}>
                  <Bar height={292} title="Grade Trend" data={submissionsData} />
                </div>
              </Col>
              <Col xl={8} lg={12} md={12} sm={24} xs={24}>
                <div className={styles.salesRank}>
                  <h4 className={styles.rankingTitle}>Mentor Ranking</h4>
                  <ul className={styles.rankingList}>
                    {rankMentees().map((item, i) => (
                      <li key={item.title}>
                        <span
                          className={`${styles.rankingItemNumber} ${i < 3 ? styles.active : ''}`}
                        >
                          {i + 1}
                        </span>
                        <span className={styles.rankingItemTitle} title={item.title}>
                          {item.title}
                        </span>
                        <span>{numeral(item.total).format('0,0')}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Col>
            </Row>
          </TabPane> */}
        </Tabs>
      </div>
    </Card>
  );
};

export default SalesCard;
