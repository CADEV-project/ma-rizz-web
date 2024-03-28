import { Skeleton, Typography } from '@mui/material';
import { TypographyOptions } from '@mui/material/styles/createTypography';

type SmartTextProps = { text: string } & TypographyOptions;

export const SmartText: React.FC<SmartTextProps> = ({ text, ...props }) => {
  if (!text) return <Skeleton variant='text' />;

  return <Typography {...props}>{text}</Typography>;
};
