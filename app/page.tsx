import { CommonLayout } from '@/(client)/component';

const Page: React.FC = async () => {
  return (
    <CommonLayout>
      <h1>/</h1>
      <h3>Home Page</h3>
      <h5>홈 페이지</h5>
      <div>User Data</div>
    </CommonLayout>
  );
};

export default Page;
