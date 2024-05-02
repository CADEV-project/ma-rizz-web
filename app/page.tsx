import { Typography } from '@mui/material';

import { TestComponent } from './(client)/components/TestComponent';

const Page: React.FC = async () => {
  return (
    <div>
      <Typography variant='h1'>Home Page</Typography>
      <TestComponent />
    </div>
  );
};

export default Page;
