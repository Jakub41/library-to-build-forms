import { Box, Checkbox, FormControlLabel, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/styles';
import React, { useEffect, useMemo } from 'react';
import { useIntl } from 'react-intl';
import SigPad from 'signature_pad';
import Visible from '../../Visible';
import styles from './Signature.styles';

const emptySignature =
  'data:image/png;base64,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';

const Signature = ({ classes, block, onChange, readOnly, currentUser }) => {
  const intl = useIntl();
  const [disclaimerChecked, setDisclaimerChecked] = React.useState(false);
  let sigPad = null;
  let canvasRef = React.useRef();
  let canvasContainerRef = React.useRef();
  let timeOutId = null;

  useEffect(() => {
    if (canvasContainerRef.current && canvasRef.current) {
      resizeCanvas();
      window.addEventListener('resize', handleWindowResize);
      sigPad = new SigPad(canvasRef.current);
      sigPad.onEnd = handleSigPadOnEnd;
      sigPad.onBegin = handleSigPadOnBegin;

      if (block.answer) {
        sigPad.fromDataURL(block.answer.signatureData, {
          width: canvasContainerRef.current.clientWidth,
          ratio: 1,
        });
      }

      return () => {
        sigPad.onEnd = null;
        sigPad.onBegin = null;
        window.removeEventListener('resize', handleWindowResize);
      };
    }
  }, [block]);

  const resizeCanvas = () => {
    canvasRef.current.width = canvasContainerRef.current.clientWidth;
    canvasRef.current.height = 300;
  };

  const clear = () => {
    const blockCopy = { ...block };
    blockCopy.answer.signatureData = null;

    if (sigPad !== null) sigPad.clear();

    onChange(blockCopy);
  };

  const save = () => {
    const blockCopy = { ...block };
    blockCopy.answer = {
      signatureData: sigPad.toDataURL(),
      disclaimerChecked,
    };
    blockCopy.user = currentUser;
    blockCopy.answerTimestamp = new Date().toISOString();
    onChange(blockCopy);
  };

  const onCheckDisclaimer = ({ target }) => {
    setDisclaimerChecked(target.checked);
    onChange({ ...block, disclaimerChecked: target.checked });
  };

  const handleWindowResize = (e) => {
    resizeCanvas();
    if (block.answer) {
      sigPad.fromDataURL(block.answer.signatureData, {
        width: canvasContainerRef.current.clientWidth,
        ratio: 1,
      });
    }
  };

  const handleSigPadOnEnd = (e) => {
    timeOutId = setTimeout(() => {
      save();
    }, 1000);
  };

  const handleSigPadOnBegin = (e) => {
    if (timeOutId) {
      clearTimeout(timeOutId);
    }
  };

  const isOwnSignature = useMemo(
    () => currentUser?.id === block.recipient?.id,
    [currentUser, block]
  );

  const isCheckboxDisabled = useMemo(
    () => !isOwnSignature || readOnly,
    [isOwnSignature, readOnly]
  );

  const isSignatureEnabled = useMemo(() => {
    return (
      !readOnly &&
      !isCheckboxDisabled &&
      ((block.options?.disclaimer && disclaimerChecked) ||
        !block.options?.disclaimer)
    );
  }, [isCheckboxDisabled, block, readOnly, disclaimerChecked]);

  return (
    <>
      <Visible when={block.options?.disclaimer && !isCheckboxDisabled}>
        <div className={classes.textContainer}>
          <FormControlLabel
            control={
              <Checkbox
                disabled={isCheckboxDisabled}
                checked={block.disclaimerChecked}
                onChange={onCheckDisclaimer}
                name="disclaimerChecked"
              />
            }
            label={
              <Typography variant="body1">
                {block.options?.disclaimer}
              </Typography>
            }
          />
        </div>
      </Visible>
      <Visible
        when={isSignatureEnabled}
        fallBack={
          <Box className={classes.signatureContainer}>
            <Visible
              when={block.answer}
              fallBack={
                <Visible
                  when={isOwnSignature}
                  fallBack={
                    <img
                      src={emptySignature}
                      className={classes.signature}
                      alt="Signature"
                    />
                  }
                >
                  <div className={classes.signature} />
                </Visible>
              }
            >
              <img
                src={block?.answer?.signatureData}
                className={classes.signature}
                alt="Signature"
              />
            </Visible>
          </Box>
        }
      >
        <div ref={canvasContainerRef} className={classes.canvasContainer}>
          <canvas ref={canvasRef} />
          <div className={classes.instructionContainer}>
            <Typography variant="caption">
              {intl.formatMessage({
                defaultMessage: 'Sign using your finger or a stylus pen.',
              })}
            </Typography>
          </div>
        </div>
      </Visible>
      <Visible when={block.options?.reason}>
        <div className={classes.textContainer}>
          <Typography variant="body1">{block.options?.reason}</Typography>
        </div>
      </Visible>
      <Visible when={isSignatureEnabled}>
        <div className={classes.redoContainer}>
          <Button
            disabled={!block.answer}
            color="primary"
            fullWidth={true}
            onClick={clear}
          >
            {intl.formatMessage({ defaultMessage: 'Redo signature' })}
          </Button>
        </div>
      </Visible>
    </>
  );
};

export default withStyles(styles, { withTheme: true })(Signature);
