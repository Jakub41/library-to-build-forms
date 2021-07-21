import { IconButton, Menu, MenuItem } from '@material-ui/core';
import MoreIcon from '@material-ui/icons/MoreVert';
import React from 'react';
import { useIntl } from 'react-intl';
import { useMenu } from '../../hooks';

const BlockMenu = ({ onDelete, onDuplicate }) => {
  const { anchorEl, handleClick, handleClose } = useMenu();
  const intl = useIntl();

  const handleDuplicate = (block) => {
    handleClose();
    onDuplicate(block);
  };

  const handleDelete = (block) => {
    handleClose();
    onDelete(block);
  };

  return (
    <>
      <IconButton
        aria-controls="simple-menu"
        aria-haspopup="true"
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
        <MenuItem onClick={handleDuplicate}>
          {intl.formatMessage({ defaultMessage: 'Duplicate' })}
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          {intl.formatMessage({ defaultMessage: 'Delete' })}
        </MenuItem>
      </Menu>
    </>
  );
};

export default BlockMenu;
