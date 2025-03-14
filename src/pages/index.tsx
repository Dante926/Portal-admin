import Analysis from '@/components/Analysis';
import { fakeChartData } from '@/components/Analysis/service';
import CarouselPage from '@/components/Carousel';
import {
  AppstoreAddOutlined,
  BarChartOutlined,
  ClusterOutlined,
  ContactsOutlined,
  EllipsisOutlined,
  HomeOutlined,
} from '@ant-design/icons';
import { useModel, useRequest } from '@umijs/max';
import { Card, Divider, Dropdown } from 'antd';
import { createStyles } from 'antd-style';
import React from 'react';

/**
 * 每个单独的卡片，为了复用样式抽成了组件
 * @param param0
 * @returns
 */

export type NoticeType = {
  id: string;
  title: string;
  logo: string;
  description: string;
  updatedAt: string;
  member: string;
  href: string;
  memberLink: string;
};

export interface TagType {
  key: string;
  label: string;
}

export type GeographicType = {
  province: {
    label: string;
    key: string;
  };
  city: {
    label: string;
    key: string;
  };
};

export type CurrentUser = {
  name: string;
  avatar: string;
  userid: string;
  notice: NoticeType[];
  email: string;
  signature: string;
  title: string;
  group: string;
  tags: TagType[];
  notifyCount: number;
  unreadCount: number;
  country: string;
  geographic: GeographicType;
  address: string;
  phone: string;
};

const useStyles = createStyles(({ token }) => {
  return {
    avatarHolder: {
      marginBottom: '24px',
      textAlign: 'center',
      '& > img': { width: '104px', height: '104px', marginBottom: '20px' },
    },
    name: {
      marginBottom: '4px',
      color: token.colorTextHeading,
      fontWeight: '500',
      fontSize: '20px',
      lineHeight: '28px',
    },
    detail: {
      p: {
        position: 'relative',
        marginBottom: '8px',
        paddingLeft: '26px',
        '&:last-child': {
          marginBottom: '0',
        },
      },
      i: {
        position: 'absolute',
        top: '4px',
        left: '0',
        width: '14px',
        height: '14px',
      },
    },
    tagsTitle: {
      marginBottom: '12px',
      color: token.colorTextHeading,
      fontWeight: '500',
    },
    teamTitle: {
      marginBottom: '12px',
      color: token.colorTextHeading,
      fontWeight: '500',
    },
    tags: {
      '.ant-tag': { marginBottom: '8px' },
    },
    team: {
      marginLeft: '24px',
      marginBottom: '24px',
      div: {
        fontSize: '18px',
        marginBottom: '4px',
      },
      // maxWidth: '740px',
      // margin: '0 auto',
      '.ant-avatar': { marginRight: '12px' },
      a: {
        display: 'block',
        marginBottom: '24px',
        overflow: 'hidden',
        color: token.colorText,
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        wordBreak: 'break-all',
        transition: 'color 0.3s',
        '&:hover': {
          color: token.colorPrimary,
        },
      },
    },
    tabsCard: {
      '.ant-card-head': { padding: '0 16px' },
    },
    iconGroup: {
      'span.anticon': {
        marginLeft: '16px',
        color: token.colorTextSecondary,
        cursor: 'pointer',
        transition: 'color 0.32s',
        '&:hover': {
          color: token.colorText,
        },
      },
    },
  };
});

const Index: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  const { styles } = useStyles();

  const currentUser: CurrentUser = initialState?.currentUser;
  const { loading, data } = useRequest(fakeChartData);

  const dropdownGroup = (
    <span className={styles.iconGroup}>
      <Dropdown
        menu={{
          items: [
            {
              key: '1',
              label: '操作一',
            },
            {
              key: '2',
              label: '操作二',
            },
          ],
        }}
        placement="bottomRight"
      >
        <EllipsisOutlined />
      </Dropdown>
    </span>
  );
  //  渲染用户信息
  const renderUserInfo = ({ title, group, geographic }: Partial<CurrentUser>) => {
    return (
      <div className={styles.detail}>
        <p>
          <ContactsOutlined
            style={{
              marginRight: 8,
            }}
          />
          {title}
        </p>
        <p>
          <ClusterOutlined
            style={{
              marginRight: 8,
            }}
          />
          {group}
        </p>
        <p>
          <HomeOutlined
            style={{
              marginRight: 8,
            }}
          />
          {
            (
              geographic || {
                province: {
                  label: '',
                },
              }
            ).province.label
          }
          {
            (
              geographic || {
                city: {
                  label: '',
                },
              }
            ).city.label
          }
        </p>
      </div>
    );
  };

  return (
    <>
      {!!currentUser && (
        <Card
          style={{
            marginBottom: 24,
          }}
        >
          <div className={styles.avatarHolder}>
            <img alt="" src={currentUser.avatar} />
            <div className={styles.name}>{currentUser.name}</div>
            <div>{currentUser?.signature}</div>
          </div>
          {renderUserInfo(currentUser)}
          <Divider dashed />
          {/* 服务产品 */}
          <div className={styles.team}>
            <div>
              <AppstoreAddOutlined /> 服务产品
            </div>
            <CarouselPage dotPosition="right" />
          </div>
          <Divider dashed />
          <div className={styles.team}>
            <div>
              <BarChartOutlined /> 数据分析
            </div>
            <Analysis
              loading={loading}
              visitData2={data?.visitData2 || []}
              searchData={data?.searchData || []}
              dropdownGroup={dropdownGroup}
            />
          </div>
        </Card>
      )}
    </>
  );
};

export default Index;
