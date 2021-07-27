import { Button, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Document, Page } from 'react-pdf';
import styles from './pdf-content.styles';

const PdfContent = ({ classes, block, onChange }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pagesCount, setPagesCount] = useState(1);
  const handleRemoveVideo = () => {
    const updated = { ...block, items: [] };
    onChange(updated);
  };

  const onDocumentLoadSuccess = (someObj) => {
    setPagesCount(someObj.numPages);
    setCurrentPage(1);
  };

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <Grid container direction="column">
      <Grid item className={classes.pdfContainer}>
        <Document
          file={block.items[0].source}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <Page pageNumber={currentPage} width={640} />
        </Document>
      </Grid>
      <Grid item>
        <Grid container>
          <Grid item>
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              size="medium"
              title="Previous"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              text={<FormattedMessage defaultMessage="Remove Photo" />}
            />
          </Grid>
          <Grid item>
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              size="medium"
              title="Next"
              onClick={handleNextPage}
              disabled={currentPage === pagesCount}
              text={<FormattedMessage defaultMessage="Next" />}
            />
          </Grid>
          <Grid item>
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              onClick={handleRemoveVideo}
              title="Remove File"
              text={<FormattedMessage defaultMessage="Remove file" />}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default withStyles(styles, { withTheme: true })(PdfContent);
