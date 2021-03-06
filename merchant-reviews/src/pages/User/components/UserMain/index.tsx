import React, { memo, useEffect, useState } from 'react';
import { history, UserModelState, useSelector, useDispatch } from 'umi';
import {
  makeStyles,
  Theme,
  createStyles,
  withStyles,
} from '@material-ui/core/styles';
import { Modal, List, Button as ANTButton, InputItem, Toast } from 'antd-mobile';
import Card from '@material-ui/core/Card';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PaymentIcon from '@material-ui/icons/Payment';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { userWithdraw } from '@/services/user';
import './style.css';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 500,
    },
    avatar: {
      backgroundColor: red[500],
    },
  }),
);

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

const ITEM_HEIGHT = 48;

const index = memo(() => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector(({ user }: { user: UserModelState }) => user.user);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [modal, setModal] = useState(false);
  const [paypalName, setUsername] = useState('');
  const [name, setName] = useState('');
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toShow = (path: string) => {
    history.push({ pathname: path });
  };

  const withdraw = async () => {
    if (!name) {
      Toast.fail('?????????????????????');
    } else if (!paypalName) {
      Toast.fail('paypal??????????????????');
    } else {
      setModal(() => false);
      const res = await userWithdraw({
        paypalName,
        username: localStorage.getItem('username') || '',
        name,
      });
      if (res?.msg === '????????????') {
        Toast.success('??????????????????');
      } else {
        Toast.fail('????????????');
      }
    }
  };

  useEffect(() => {
    dispatch({
      type: 'user/getUser',
      payload: {
        username: localStorage.getItem('username'),
      },
    });
  }, []);

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar
            aria-label="recipe"
            className={classes.avatar}
            src={user?.avar}
          />
        }
        action={
          <IconButton
            aria-label="more"
            aria-controls="long-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MoreVertIcon />
          </IconButton>
        }
        title={localStorage.getItem('name')}
        subheader={`?????????${user?.money.toFixed(2)}`}
      />
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        <StyledMenuItem
          onClick={() => {
            setModal(() => true);
            setAnchorEl(null);
          }}
        >
          <ListItemIcon>
            <PaymentIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="??????" />
        </StyledMenuItem>
        <StyledMenuItem onClick={() => toShow('/updateSetting')}>
          <ListItemIcon>
            <AccountCircleIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="????????????" />
        </StyledMenuItem>
      </Menu>
      <Modal
        popup
        visible={modal}
        onClose={() => setModal(() => false)}
        animationType="slide-up"
      >
        <List renderHeader={() => <div>??????</div>} className="popup-list">
          <List.Item>
            <InputItem
              onChange={(value) => setName(() => value)}
              value={name}
              placeholder="??????????????????"
            >
              ?????????
            </InputItem>
          </List.Item>
          <List.Item>
            <InputItem
              onChange={(value) => setUsername(() => value)}
              value={paypalName}
              placeholder="???????????????"
            >
              PayPal??????
            </InputItem>
          </List.Item>
          <List.Item>
            <ANTButton type="primary" onClick={withdraw}>
              ??????
            </ANTButton>
          </List.Item>
        </List>
      </Modal>
    </Card>
  );
});

export default index;
