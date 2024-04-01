import { Button, Divider, List, ListItem, styled } from '@mui/material';

import { COLOR } from '@/constant';

export const Container = styled(List)({
  width: '100%',
  backgroundColor: COLOR.whiteAlpha(0.1),
});

export const CustomDivider = styled(Divider)({
  backgroundColor: COLOR.whiteAlpha(0.5),
});

export const PostContainer = styled(ListItem)({
  width: '100%',
  padding: '0.5rem 1rem !important',
});

export const PostUserImageContainer = styled('div')({
  position: 'relative',
  width: '2.5rem',
  height: '2.5rem',
  marginRight: '1rem',
});

export const PostTextItemContainer = styled('div')({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '1rem',
});

export const PostTitleContainer = styled('div')({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-end',
});

export const PostTitle = styled('div')({
  width: '80%',
  color: COLOR.white,
  fontSize: '1.5rem',
  fontWeight: '700',
  whiteSpace: 'pre-wrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: 1,
  WebkitBoxOrient: 'vertical',
});

export const PostDate = styled('div')({
  color: COLOR.white,
  fontSize: '0.5rem',
  fontWeight: '400',
});

export const PostContent = styled('div')({
  color: COLOR.white,
  fontSize: '1rem',
  fontWeight: '400',
  whiteSpace: 'pre-wrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
});

export const PostHandleButtonContainer = styled('div')({
  display: 'flex',
  gap: '1.5rem',
  width: '100%',
});

export const PostNextButton = styled(Button)({
  color: COLOR.white,
  backgroundColor: COLOR.button,
  padding: '0.5rem 1rem',
  boxSizing: 'border-box',
  borderRadius: '0.25rem',
  '&:hover': {
    backgroundColor: COLOR.buttonHover,
  },
});

export const PostRrevButton = styled(Button)({
  color: COLOR.white,
  backgroundColor: COLOR.button,
  padding: '0.5rem 1rem',
  boxSizing: 'border-box',
  borderRadius: '0.25rem',
  '&:hover': {
    backgroundColor: COLOR.buttonHover,
  },
});
