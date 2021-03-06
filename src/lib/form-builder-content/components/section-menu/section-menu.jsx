import { IconButton, Menu, MenuItem } from '@material-ui/core';
import MoreIcon from '@material-ui/icons/MoreVert';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useMenu } from '../../hooks';

const SectionMenu = ({ onDelete }) => {
  const { anchorEl, handleClick, handleClose } = useMenu();

  const handleDelete = () => {
    handleClose();
    onDelete();
  };

  return (
    <>
      <IconButton
        aria-controls="simple-menu"
        aria-haspopup="true"
        style={{ padding: 0 }}
        onClick={handleClick}
      >
        <MoreIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleDelete}>
          <FormattedMessage defaultMessage="Delete" />
        </MenuItem>
      </Menu>
    </>
  );
};

export default SectionMenu;
