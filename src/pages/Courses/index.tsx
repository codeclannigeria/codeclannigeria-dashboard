import { PlusOutlined } from '@ant-design/icons';
import ProDescriptions from '@ant-design/pro-descriptions';
import { FooterToolbar, PageContainer } from '@ant-design/pro-layout';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { Button, Divider, Drawer, message } from 'antd';
import React, { useRef, useState } from 'react';

import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
import { courseService } from './service';

const TableList: React.FC<{}> = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const actionRef = useRef<ActionType>();
  const [row, setRow] = useState<API.CourseDto>();
  const [selectedRowsState, setSelectedRows] = useState<API.CourseDto[]>([]);

  const handleAdd = async (course: API.CreateCourseDto) => {
    setLoading(true);
    let isCompleted = false;
    const hide = message.loading('Please wait...');
    try {
      await courseService.createCourse(course);
      hide();
      message.success('Added successfully');
      isCompleted = true;
    } catch (error) {
      hide();
      message.error('Failed to add!');
    }
    setLoading(!isCompleted);
    return isCompleted;
  };

  const handleUpdate = async (course: Partial<API.CourseDto>) => {
    setLoading(true);
    let isCompleted = false;
    const hide = message.loading('Please wait...');
    try {
      await courseService.updateCourse(course?.id as string, course);
      hide();
      message.success('Updated successfully');
      isCompleted = true;
    } catch (error) {
      hide();
      message.error('Failed to update!');
    }
    setLoading(!isCompleted);

    return isCompleted;
  };

  const handleRemove = async (selectedRows: API.CourseDto[]) => {
    setLoading(true);
    let isCompleted = false;
    const hide = message.loading('Please wait...');
    if (!selectedRows) {
      setLoading(false);
      return true;
    }
    try {
      await courseService.deleteCourses(selectedRows.map((r) => r.id));
      hide();
      message.success('Deleted successfully');
      isCompleted = true;
    } catch (error) {
      hide();
      message.error('Failed to delete!');
    }
    setLoading(!isCompleted);
    return isCompleted;
  };

  const columns: ProColumns<API.CourseDto>[] = [
    {
      title: 'Title',
      dataIndex: 'title',
      sorter: true,
      formItemProps: {
        rules: [
          {
            required: true,
            max: 64,
          },
        ],
      },
      render: (dom, entity) => {
        return <a onClick={() => setRow(entity)}>{dom}</a>;
      },
    },
    {
      title: 'Description',
      dataIndex: 'description',
      valueType: 'textarea',
      sorter: true,
      hideInTable: true,
      formItemProps: {
        rules: [
          {
            required: true,
          },
        ],
      },
      renderText: (val: string) => (val.length > 20 ? `${val.substring(0, 20)}...` : val),
    },

    {
      title: 'Created',
      dataIndex: 'createdAt',
      sorter: true,
      hideInForm: true,
      defaultSortOrder: 'descend',
    },
    {
      title: 'Updated',
      dataIndex: 'updatedAt',
      sorter: true,
      hideInForm: true,
      defaultSortOrder: 'descend',
    },
    {
      title: 'Action',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              handleUpdateModalVisible(true);
              setStepFormValues(record);
            }}
          >
            Edit
          </a>
          <Divider type="vertical" />
        </>
      ),
    },
  ];

  const handleCreateCourse = async (course: API.CreateCourseDto): Promise<void> => {
    setLoading(true);
    const success = await handleAdd(course);
    if (success) {
      setLoading(false);
      handleModalVisible(false);
      if (actionRef.current) {
        actionRef.current.reload();
      }
    } else {
      setLoading(false);
    }
  };
  return (
    <PageContainer>
      <ProTable<API.CourseDto>
        headerTitle="Course List"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button key="addButton" type="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined /> Add
          </Button>,
        ]}
        request={async (params, sorter, filter) => {
          let skip = params.current || 0;
          skip = skip > 0 ? skip - 1 : skip;
          skip *= params.pageSize || 1;

          // eslint-disable-next-line no-param-reassign
          if (Object.keys(sorter).length === 0) sorter = { createdAt: 'descend' };
          const result = await courseService.getCourses({
            limit: params.pageSize,
            skip,
            search: { ...filter },
            opts: { sort: { ...sorter } },
          });
          const res = {
            data: result.items,
            total: result.totalCount,
            success: true,
            pageSize: params.pageSize,
            current: params.current,
          };
          return res;
        }}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => setSelectedRows(selectedRows),
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              Selected <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a>{' '}
              item&nbsp;&nbsp;
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            Delete selected
          </Button>
        </FooterToolbar>
      )}
      <CreateForm
        loading={loading}
        onCancel={() => handleModalVisible(false)}
        modalVisible={createModalVisible}
        onSubmit={handleCreateCourse}
      />
      {stepFormValues && Object.keys(stepFormValues).length ? (
        <UpdateForm
          onSubmit={async (value) => {
            const success = await handleUpdate(value);
            if (success) {
              handleUpdateModalVisible(false);
              setStepFormValues({});
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          onCancel={() => {
            handleUpdateModalVisible(false);
            setStepFormValues({});
          }}
          updateModalVisible={updateModalVisible}
          values={stepFormValues}
        />
      ) : null}

      <Drawer
        width={600}
        visible={!!row}
        onClose={() => {
          setRow(undefined);
        }}
        closable={false}
      >
        {row?.id && (
          <ProDescriptions<API.CourseDto>
            column={2}
            title={row?.title}
            request={async () => ({
              data: row || {},
            })}
            params={{
              id: row?.id,
              desc: row?.description,
              createdAt: row?.createdAt,
              updatedAt: row?.updatedAt,
            }}
            columns={columns}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default TableList;
