import { PageContainer } from '@ant-design/pro-components';
import { useParams } from '@umijs/max';

const UserDetail = () => {
  const { user } = useParams();
  return (
    <>
      <PageContainer>
        <div>{user}</div>
      </PageContainer>
    </>
  );
};

export default UserDetail;
