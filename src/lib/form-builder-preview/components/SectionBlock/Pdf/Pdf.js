import { Grid, withStyles } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import Typography from '@material-ui/core/Typography';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import React, { useEffect, useRef, useState } from 'react';
import { Document, Page } from 'react-pdf';
import Visible from '../../Visible';
import styles from './Pdf.styles';

const Pdf = ({ block, onChange, classes }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pagesCount, setPagesCount] = useState(1);
  const [pdfWidth, setPdfWidth] = useState();
  const containerRef = useRef();
  const pageRef = useRef();

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize);
    handleWindowResize();

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [block]);

  const onDocumentLoadSuccess = (pdf) => {
    if (pdf.numPages === 1) {
      onChange({ ...block, answer: true });
    }
    setPagesCount(pdf.numPages);
    setCurrentPage(1);
  };

  const handleWindowResize = (e) => {
    if (containerRef.current) {
      const width = containerRef.current.getBoundingClientRect().width;
      setPdfWidth(width);
    }
  };

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
    containerRef.current.scrollIntoView();
  };

  const handleNextPage = () => {
    if (pagesCount === currentPage + 1) {
      onChange({ ...block, answer: true });
    }
    setCurrentPage(currentPage + 1);
    containerRef.current.scrollIntoView();
  };

  if (block.items?.length && block.items[0].source) {
    return (
      <div ref={containerRef}>
        <div>
          <Visible when={block.items[0].source} fallBack="Loading PDF">
            <Document file={block.items[0].source} onLoadSuccess={onDocumentLoadSuccess}>
              <Page ref={pageRef} pageNumber={currentPage} width={pdfWidth} height={220} />
            </Document>
          </Visible>
        </div>
        <div className={classes.footer}>
          <Grid container direction="row" justify="space-between" alignItems="center">
            <Fab onClick={handlePreviousPage} disabled={currentPage === 1}>
              <ChevronLeftIcon />
            </Fab>
            <div className="pages-count-container">
              <Typography variant="body2">{`${currentPage}/${pagesCount}`}</Typography>
            </div>
            <Fab onClick={handleNextPage} disabled={currentPage === pagesCount}>
              <ChevronRightIcon />
            </Fab>
          </Grid>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default withStyles(styles)(Pdf);
