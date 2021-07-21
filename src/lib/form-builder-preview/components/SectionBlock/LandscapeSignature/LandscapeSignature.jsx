import { Typography, withStyles } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useIntl } from 'react-intl';
import Visible from '../../Visible';
import Signature from '../Signature';
import styles from './LandscapeSignature.styles';

const LandscapeSignature = ({
  classes,
  block,
  onChange,
  readOnly,
  currentUser,
}) => {
  const intl = useIntl();
  const [orientation, setOrientation] = React.useState(
    window.innerHeight > window.innerWidth ? 'portrait' : 'lanscape'
  );

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [block]);

  const getOrientation = () => {
    if (window.innerHeight > window.innerWidth) {
      return 'portrait';
    }

    return 'landscape';
  };

  const handleWindowResize = (e) => {
    setOrientation(getOrientation());
  };

  return (
    <>
      <Visible when={orientation === 'portrait' && !block.answer}>
        <Typography variant="subtitle1">
          {intl.formatMessage({
            defaultMessage: 'Please turn your phone in landscape mode to sign',
          })}{' '}
        </Typography>
      </Visible>

      <Visible when={orientation === 'portrait' && block.answer}>
        <Typography variant="subtitle1">
          {intl.formatMessage({
            defaultMessage:
              'turn your phone in landscape mode to edit or reset your signature',
          })}{' '}
        </Typography>
        <div className={classes.imgContainer}>
          <img
            className={classes.img}
            src={block.answer.signatureData}
            alt="signature"
          />
        </div>
      </Visible>

      <Visible when={orientation === 'landscape'}>
        <Signature
          block={block}
          onChange={onChange}
          currentUser={currentUser}
          readOnly={readOnly}
        />
      </Visible>
    </>
  );
};

export default withStyles(styles, { withTheme: true })(LandscapeSignature);
