import { PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import { Avatar, Button, Card, Col, Input, List, Modal, Row } from 'antd';
import moment from 'moment';
import React, { FC, useEffect, useRef, useState } from 'react';
import { findDOMNode } from 'react-dom';
import { connect, Dispatch } from 'umi';

import OperationModal from './components/OperationModal';
import { StateType } from './model';
import styles from './style.less';

const { Search } = Input;

interface TracksProps {
  tracks: StateType;
  dispatch: Dispatch;
  loading: boolean;
}

const Info: FC<{
  title: React.ReactNode;
  value: React.ReactNode;
  bordered?: boolean;
}> = ({ title, value, bordered }) => (
  <div className={styles.headerInfo}>
    <span>{title}</span>
    <p>{value}</p>
    {bordered && <em />}
  </div>
);

const ListContent = ({ data: { createdAt, updatedAt } }: { data: API.TrackDto }) => (
  <div className={styles.listContent}>
    <div className={styles.listContentItem}>
      <span>Updated</span>
      <p>{moment(updatedAt).format('DD/MM/YY HH:mm')}</p>
    </div>
    <div className={styles.listContentItem}>
      <span>Created</span>
      <p>{moment(createdAt).format('DD/MM/YY HH:mm')}</p>
    </div>
    <div className={styles.listContentItem}>
      {/* <Progress percent={percent} status={status} strokeWidth={6} style={{ width: 180 }} /> */}
    </div>
  </div>
);

export const Tracks: FC<TracksProps> = (props) => {
  const addBtn = useRef(null);
  const {
    loading,
    dispatch,
    tracks: {
      tracksData: { items, totalCount },
      tasksData: { totalCount: taskTotalCount },
    },
  } = props;
  const [done, setDone] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [current, setCurrent] = useState<Partial<API.TrackDto>>();
  const [editId, setEditId] = useState('');

  useEffect(() => {
    dispatch<API.SMQuery<API.TrackDto>>({
      type: 'tracks/fetch',
      payload: {
        params: { opts: { sort: { updatedAt: -1 } } },
        responseProp: 'tracksData',
        url: '/api/tracks',
      },
    });
    dispatch<API.SMQuery<API.TaskDto>>({
      type: 'tracks/fetch',
      payload: { params: { limit: 1 }, responseProp: 'tasksData', url: '/api/tasks' },
    });
  }, []);

  const paginationProps = {
    showSizeChanger: true,
    showQuickJumper: true,
    pageSize: 5,
    total: totalCount,
  };

  const showModal = () => {
    setVisible(true);
    setCurrent(undefined);
  };

  const showEditModal = (item: API.TrackDto) => {
    setVisible(true);
    setCurrent(item);
    setEditId(item.id);
  };

  const deleteItem = (id: string) => {
    dispatch({
      type: 'tracks/delete',
      payload: { id },
    });
  };

  const setAddBtnBlur = () => {
    if (addBtn.current) {
      // eslint-disable-next-line react/no-find-dom-node
      const addBtnDom = findDOMNode(addBtn.current) as HTMLButtonElement;
      setTimeout(() => addBtnDom.blur(), 0);
    }
  };

  const handleDone = () => {
    setAddBtnBlur();

    setDone(false);
    setVisible(false);
  };

  const handleCancel = () => {
    setAddBtnBlur();
    setVisible(false);
  };

  const handleSubmit = (values: API.CreateTrackDto) => {
    setAddBtnBlur();
    setDone(true);

    if (editId)
      dispatch({
        type: 'tracks/update',
        payload: { createTrackDto: values, id: editId },
      });
    else
      dispatch<API.CreateTrackDto>({
        type: 'tracks/create',
        payload: values,
      });
  };

  return (
    <div>
      <PageContainer>
        <div className={styles.standardList}>
          <Card bordered={false}>
            <Row>
              <Col sm={12} xs={24}>
                <Info title="Track Count" value={`${totalCount} Tracks`} bordered />
              </Col>
              <Col sm={12} xs={24}>
                <Info title="Tasks Count" value={`${taskTotalCount} Tasks`} bordered />
              </Col>
            </Row>
          </Card>

          <Card
            className={styles.listCard}
            bordered={false}
            title="Track List"
            style={{ marginTop: 24 }}
            bodyStyle={{ padding: '0 32px 40px 32px' }}
            extra={
              <div className={styles.extraContent}>
                <Search
                  className={styles.extraContentSearch}
                  placeholder="Please enter"
                  onSearch={() => ({})}
                />
              </div>
            }
          >
            <Button
              type="dashed"
              style={{ width: '100%', marginBottom: 8 }}
              onClick={showModal}
              ref={addBtn}
            >
              <PlusOutlined />
              Add Track
            </Button>
            <List
              size="large"
              rowKey="id"
              loading={loading}
              pagination={paginationProps}
              dataSource={items}
              renderItem={(item) => (
                <List.Item
                  actions={[
                    <a
                      key="edit"
                      onClick={(e) => {
                        e.preventDefault();
                        showEditModal(item);
                      }}
                    >
                      Edit
                    </a>,
                    <a
                      key="delete"
                      onClick={(e) => {
                        e.preventDefault();
                        Modal.confirm({
                          title: 'Delete track',
                          content: 'Are you sure to delete this track?',
                          okText: 'Okay',
                          cancelText: 'Cancel',
                          onOk: () => deleteItem(item.id),
                        });
                      }}
                    >
                      Delete
                    </a>,
                  ]}
                >
                  <List.Item.Meta
                    avatar={<Avatar src={item.thumbnailUrl} shape="square" size="large" />}
                    title={item.title}
                    description={item.description}
                  />
                  <ListContent data={item} />
                </List.Item>
              )}
            />
          </Card>
        </div>
      </PageContainer>

      <OperationModal
        done={done}
        current={current}
        visible={visible}
        onDone={handleDone}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default connect(
  ({
    tracks,
    loading,
  }: {
    tracks: StateType;
    loading: {
      models: { [key: string]: boolean };
    };
  }) => ({
    tracks,
    loading: loading.models.tracks,
  }),
)(Tracks);
