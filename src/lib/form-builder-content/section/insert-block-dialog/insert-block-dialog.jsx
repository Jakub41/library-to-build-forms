import { Menu, MenuItem, withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { blockTypes } from '../../../constants';
import Visible from '../../components/visible';
import modes from './insert-block-dialog.static';
import styles from './insert-block-dialog.styles';

const InsertBlockDialog = ({ classes, onInsertBlock, mode, blockIndex }) => {
  const intl = useIntl();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const showDialog = (e) => {
    setAnchorEl(e.currentTarget);
    setIsDialogOpen(true);
  };

  const hideDialog = () => {
    setIsDialogOpen(false);
  };

  const handleInsertBlock = (blockType) => () => {
    onInsertBlock(blockType, blockIndex);
    hideDialog();
  };

  return (
    <>
      <Menu
        className={classes.menu}
        id="simple-menu"
        anchorEl={anchorEl}
        onBackdropClick={hideDialog}
        onEscapeKeyDown={hideDialog}
        open={isDialogOpen}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Visible when={mode !== modes.top}>
          <MenuItem onClick={handleInsertBlock(blockTypes.textBlock)}>
            {intl.formatMessage({ defaultMessage: 'Text Block' })}
          </MenuItem>
        </Visible>

        <MenuItem onClick={handleInsertBlock('newPage')}>
          {intl.formatMessage({ defaultMessage: 'New Page' })}
        </MenuItem>

        <Visible when={mode !== modes.top}>
          <MenuItem onClick={handleInsertBlock(blockTypes.yesno)}>
            {intl.formatMessage({ defaultMessage: 'Question' })}
          </MenuItem>
          <MenuItem onClick={handleInsertBlock(blockTypes.media)}>
            {intl.formatMessage({ defaultMessage: 'Media' })}
          </MenuItem>
          <MenuItem onClick={handleInsertBlock(blockTypes.signature)}>
            {intl.formatMessage({ defaultMessage: 'Signature' })}
          </MenuItem>
        </Visible>
      </Menu>

      <Button
        onClick={showDialog}
        color="secondary"
        size="small"
        startIcon={<AddIcon />}
      >
        {intl.formatMessage({ defaultMessage: 'Add Block' })}
      </Button>
    </>
  );
};

export default withStyles(styles, { withTheme: true })(InsertBlockDialog);
