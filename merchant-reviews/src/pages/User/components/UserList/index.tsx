import React from 'react';
import { history } from 'umi';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem, { ListItemProps } from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import AssignmentIcon from '@material-ui/icons/Assignment';
import InboxIcon from '@material-ui/icons/Inbox';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import HowToRegIcon from '@material-ui/icons/HowToReg';
import StorefrontIcon from '@material-ui/icons/Storefront';
import ChatIcon from '@material-ui/icons/Chat';
import Modal from '@material-ui/core/Modal';
import ChangePassword from '../ChangePassword';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 500,
      backgroundColor: theme.palette.background.paper,
    },
  }),
);

export default function SimpleList() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const ModalChildren = () => {
    return React.cloneElement(<ChangePassword handleClose={handleClose} />, {});
  };

  const toShow = (path: string) => {
    console.log(path);
    history.push(path);
  };

  return (
    <div className={classes.root}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {ModalChildren()}
      </Modal>
      <List component="nav" aria-label="main mailbox folders">
        <ListItem button onClick={() => toShow('/order')}>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="????????????" />
          <ListItemSecondaryAction onClick={() => toShow('/order')}>
            <IconButton edge="end" aria-label="order">
              <ArrowForwardIosIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem button onClick={() => toShow('/selfComment')}>
          <ListItemIcon>
            <ChatIcon />
          </ListItemIcon>
          <ListItemText primary="??????" />
          <ListItemSecondaryAction onClick={() => toShow('/selfComment')}>
            <IconButton edge="end" aria-label="comment">
              <ArrowForwardIosIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem button onClick={handleOpen}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="????????????" />
          <ListItemSecondaryAction onClick={handleOpen}>
            <IconButton edge="end" aria-label="change">
              <ArrowForwardIosIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>

        {localStorage.getItem('role') === '1' ? (
          <ListItem button onClick={() => toShow('/shopList')}>
            <ListItemIcon>
              <HowToRegIcon />
            </ListItemIcon>
            <ListItemText primary="????????????" />
            <ListItemSecondaryAction onClick={() => toShow('/shopList')}>
              <IconButton edge="end" aria-label="addShop">
                <ArrowForwardIosIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ) : (
          <ListItem button onClick={() => toShow('/shop/settle')}>
            <ListItemIcon>
              <HowToRegIcon />
            </ListItemIcon>
            <ListItemText primary="????????????" />
            <ListItemSecondaryAction onClick={() => toShow('/shop/settle')}>
              <IconButton edge="end" aria-label="addShop">
                <ArrowForwardIosIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        )}
        {localStorage.getItem('role') === '1' && (
          <ListItem button onClick={() => toShow('/product')}>
            <ListItemIcon>
              <StorefrontIcon />
            </ListItemIcon>
            <ListItemText primary="??????????????????" />
            <ListItemSecondaryAction onClick={() => toShow('/product')}>
              <IconButton edge="end" aria-label="product">
                <ArrowForwardIosIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        )}
      </List>
    </div>
  );
}
