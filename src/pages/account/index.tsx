import { UploadOutlined } from '@ant-design/icons';
import {
  ProForm,
  ProFormFieldSet,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Button, Card, Divider, Input, message, Upload } from 'antd';
import useStyles from './index.style';

const Account = () => {
  const { initialState } = useModel('@@initialState');
  const currentUser = initialState?.currentUser;
  const { styles } = useStyles();

  const AvatarView = ({ avatar }: { avatar: string }) => (
    <>
      <div className={styles.avatar_title}>头像</div>
      <div className={styles.avatar}>
        <img src={avatar} alt="avatar" />
      </div>
      <Upload showUploadList={false}>
        <div className={styles.button_view}>
          <Button>
            <UploadOutlined />
            更换头像
          </Button>
        </div>
      </Upload>
    </>
  );

  const getAvatarURL = () => {
    if (currentUser) {
      if (currentUser.avatar) {
        return currentUser.avatar;
      }
      const url = 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png';
      return url;
    }
    return '';
  };
  const handleFinish = async () => {
    message.success('更新基本信息成功');
  };
  return (
    <>
      <Card>
        <div className={styles.baseView}>
          <div className={styles.right}>
            <AvatarView avatar={getAvatarURL()} />
            <Divider dashed />
          </div>
          <div className={styles.left}>
            <ProForm
              layout="vertical"
              onFinish={handleFinish}
              submitter={{
                searchConfig: {
                  submitText: '更新基本信息',
                },
                render: (_, dom) => dom[1],
              }}
              initialValues={{
                ...currentUser,
                phone: currentUser?.phone.split('-'),
                password: 'admin942',
              }}
              hideRequiredMark
            >
              <ProFormText.Password
                width="md"
                name="password"
                label="密码"
                rules={[
                  {
                    required: true,
                    message: '请输入您的邮箱!',
                  },
                ]}
              />
              <ProFormText
                width="md"
                name="name"
                label="昵称"
                rules={[
                  {
                    required: true,
                    message: '请输入您的昵称!',
                  },
                ]}
              />
              <ProFormTextArea
                name="profile"
                label="个人简介"
                rules={[
                  {
                    required: true,
                    message: '请输入个人简介!',
                  },
                ]}
                placeholder="个人简介"
              />
              <ProFormSelect
                width="sm"
                name="country"
                label="国家/地区"
                rules={[
                  {
                    required: true,
                    message: '请输入您的国家或地区!',
                  },
                ]}
                options={[
                  {
                    label: '中国',
                    value: 'China',
                  },
                ]}
              />

              <ProFormText
                width="md"
                name="address"
                label="街道地址"
                rules={[
                  {
                    required: true,
                    message: '请输入您的街道地址!',
                  },
                ]}
              />
              <ProFormFieldSet
                name="phone"
                label="联系电话"
                rules={[
                  {
                    required: true,
                    message: '请输入您的联系电话!',
                  },
                  //   {
                  //     validator: validatorPhone,
                  //   },
                ]}
              >
                <Input className={styles.area_code} />
                <Input className={styles.phone_number} />
              </ProFormFieldSet>
            </ProForm>
          </div>
        </div>
      </Card>
    </>
  );
};

export default Account;
