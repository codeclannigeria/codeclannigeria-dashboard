import { Card } from 'antd';
import React from 'react';

import { GraphData } from '../data.d';
import styles from '../style.less';
import { Pie } from './Charts';

const ProportionSales = ({
  loading,
  salesPieData,
}: {
  loading: boolean;
  salesPieData: GraphData[];
}) => (
  <Card
    loading={loading}
    className={styles.salesCard}
    bordered={false}
    title="Enrollment Ratio"
    style={{
      height: '100%',
    }}
  >
    <div>
      <h4 style={{ marginTop: 8, marginBottom: 32 }}>Track Enrollments</h4>
      <Pie
        hasLegend
        subTitle="Total"
        total={() => salesPieData.reduce((pre, now) => now.y + pre, 0)}
        data={salesPieData}
        valueFormat={(value) => value}
        height={248}
        lineWidth={4}
        animate
      />
    </div>
  </Card>
);

export default ProportionSales;
