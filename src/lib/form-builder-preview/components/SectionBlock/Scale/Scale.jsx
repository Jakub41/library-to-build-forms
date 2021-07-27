import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import React, { useEffect } from 'react';
import styles from './Scale.styles';

const ScaleBlock = ({ block, onChange, readOnly, classes }) => {
  const [buttonStyle, setButtonStyle] = React.useState({});
  const containerRef = React.useRef(null);

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize);
    updateButtonsSize();
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  const updateButtonsSize = () => {
    const containerWidth = containerRef.current.clientWidth;
    const count = block.options.maxValue - block.options.minValue + 1;
    const buttonWidth = containerWidth / count;
    const size = Math.round(buttonWidth);
    const width = size;
    const height = Math.min(46, size);
    setButtonStyle({
      maxWidth: width,
      maxHeight: height,
      minWidth: width,
      minHeight: height,
      padding: 0,
    });
  };

  const handleWindowResize = (e) => {
    updateButtonsSize();
  };

  const handleButtonClick = (e) => {
    const blockCopy = { ...block };
    blockCopy.answer = Number(e.target.innerText);
    onChange(blockCopy);
  };

  const renderButtons = (min, max) => {
    const buttons = [];

    for (let index = min; index <= max; index++) {
      if (block.answer === index) {
        buttons.push(
          <Button
            variant="contained"
            color="primary"
            style={buttonStyle}
            key={index}
            disabled={readOnly}
          >
            {index}
          </Button>
        );
      } else {
        buttons.push(
          <Button
            onClick={handleButtonClick}
            variant="outlined"
            color="primary"
            style={buttonStyle}
            key={index}
            disabled={readOnly}
          >
            {index}
          </Button>
        );
      }
    }

    return (
      <ButtonGroup color="primary" aria-label="outlined primary button group">
        {buttons}
      </ButtonGroup>
    );
  };

  return (
    <div className={classes.root}>
      <div ref={containerRef} className={classes.buttonsContainer}>
        {renderButtons(block.options.minValue, block.options.maxValue)}
      </div>
      <div className={classes.minMaxTextContainer}>
        <div className={classes.minTextContainer}>
          <Typography variant="body2">{block.options.minValueText}</Typography>
        </div>
        <div className={classes.maxTextContainer}>
          <Typography variant="body2">{block.options.maxValueText}</Typography>
        </div>
      </div>
    </div>
  );
};

export default withStyles(styles, { withTheme: true })(ScaleBlock);
