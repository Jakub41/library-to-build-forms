import { withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Viewer } from '@toast-ui/react-editor';
import React from 'react';
import { useIntl } from 'react-intl';
import Visible from '../../../form-builder-content/components/visible';
import { getMarkdownCss } from '../../theme/helper';
import styles from './Intro.styles';

const Intro = ({ classes, form, onStart, theme }) => {
  const isTableOfContentsVisible =
    form?.options?.excludeTableOfContents === false;
  const intl = useIntl();

  return (
    <>
      <style>{getMarkdownCss('intro-root', theme)}</style>
      <div className={classes.main + ` intro-root`}>
        <div className={classes.titleContainer}>
          <Typography variant="h4">{form.title}</Typography>
        </div>
        <div className={classes.bodyContainer}>
          <Viewer
            frontMatter={true}
            initialValue={form.body}
            initialEditType="markdown"
          />
        </div>
        <Visible when={isTableOfContentsVisible}>
          <Typography variant="h6" className={classes.title}>
            {intl.formatMessage({ defaultMessage: 'Content' })}
          </Typography>
          <div className={classes.headersContainer}>
            {form.sections.map((section, index) => {
              return (
                <div
                  key={section.previewId}
                  className={classes.headerContainer}
                >
                  <Typography variant="subtitle1">
                    {`${index + 1}. `}
                    {section.title}
                  </Typography>
                </div>
              );
            })}
          </div>
        </Visible>
      </div>
      <div className={classes.footer + ` intro-root`}>
        <Button
          onClick={onStart}
          fullWidth={true}
          variant="contained"
          color="primary"
        >
          {intl.formatMessage({ defaultMessage: 'Next' })}
        </Button>
      </div>
    </>
  );
};

export default withStyles(styles, { withTheme: true })(Intro);
