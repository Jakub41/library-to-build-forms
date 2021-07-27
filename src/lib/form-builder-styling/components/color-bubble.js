import React from 'react';
import { withStyles } from '@material-ui/styles';
import DoneRoundedIcon from '@material-ui/icons/DoneRounded';
const styles = (theme) => ({
  root: {
    borderColor: theme.palette.grey['300'],
    borderRadius: '200px',
    margin: theme.spacing(0.5),
  },
});

const ColorBubble = ({ classes, color, checked, ...rest }) => {
  const getStyle = () => {
    return { backgroundColor: color, width: rest.size, height: rest.size };
  };
  const renderIcon = () => {
    return checked ? (
      <DoneRoundedIcon
        style={{ color: '#fff', width: rest.size - 1, height: rest.size - 1 }}
      />
    ) : null;
  };

  return (
    <div {...rest} className={classes.root} style={getStyle()}>
      {renderIcon()}
    </div>
  );
};

export default withStyles(styles)(ColorBubble);
