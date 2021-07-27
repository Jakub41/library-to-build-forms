import { Grid, ThemeProvider } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import LinearProgress from '@material-ui/core/LinearProgress';
import { createTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import HomeIcon from '@material-ui/icons/Home';
import { withStyles } from '@material-ui/styles';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { pdfjs } from 'react-pdf';
import vhCheck from 'vh-check';
import { blockTypes } from '../constants.js';
import apiStyleSheet from '../data/mockApiStylesheet.json';
import emptyData from '../data/mockData.json';
import { previewActionTypes } from '../index.js';
import useGetObjectValueOrDefault from '../utils/useGetValueOrDefault';
import {
  mapICFStyleSheetToLocalStyle,
  stripAdditionalPropertiesFromData,
  stripGlossaryFromData,
} from '../utils/utils';
import { isInvalidBlockAnswer } from './answer-validator';
import Conversation from './components/Conversation/Conversation';
import FinalScreen from './components/FinalScreen/FinalScreen.js';
import InfoNote from './components/InfoNote/InfoNote';
import useInfoNote from './components/InfoNote/useInfoNote';
import Intro from './components/Intro';
import SectionBlock from './components/SectionBlock';
import SelectionWizard from './components/SelectionWizard/SelectionWizard';
import ViewWrapper from './components/ViewWrapper/ViewWrapper';
import Visible from './components/Visible';
import WarningDialog from './components/WarningDialog/WarningDialog.js';
import { conversationStatuses, modes, screens } from './constants/constants';
import './fonts.css';
import styles from './form-builder-preview-styles';
import FormBuilderPreviewTypes from './form-builder-preview-types';
import useSelectionWizard from './hooks/useHelp';
import baseTheme from './theme/theme';
import './tooltips.css';
import usePreview from './usePreview';

const vh = vhCheck();

// Enable pdf loading
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const FormBuilderPreview = ({
  initialData,
  reducer,
  theme,
  onSubmit,
  glossary = [],
  adminMode = false,
  readOnly = false,
  classes,
  currentUser,
  conversation,
  onAddMessage,
  onViewConversation,
  onPdfDownload,
}) => {
  const initData = useGetObjectValueOrDefault(initialData, emptyData);
  const currentTheme = useGetObjectValueOrDefault(theme, apiStyleSheet);
  const { data, dispatch } = usePreview(initData, glossary, reducer);
  const previewTheme = useMemo(
    () => createTheme(baseTheme, mapICFStyleSheetToLocalStyle(currentTheme)),
    [currentTheme]
  );
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [progress, setProgress] = useState(
    Math.floor(((currentSectionIndex + 1) / data.sections.length) * 100)
  );
  const [screen, setScreen] = useState(screens.intro);
  const { isNoteOpen, anchorEl, handleNoteClose } = useInfoNote(
    'help-icon',
    screen === screens.form,
    adminMode
  );
  const {
    isTextSelected,
    mode,
    setMode,
    handleSelectionComplete,
    handleSkipSelection,
    handleSelectQuote,
    subscribeQuoteChosen,
  } = useSelectionWizard();
  const [isWarningDialogOpen, setIsWarningDialogOpen] = useState(false);

  const modeRef = useRef();
  modeRef.current = mode;

  const onAnswer = useCallback(
    (block) => {
      dispatch({ type: previewActionTypes.response, block });
    },
    [dispatch]
  );

  const onPageChange = useCallback(
    (currentPage, newPage) => {
      dispatch({ type: previewActionTypes.nextPage, currentPage, newPage });
    },
    [dispatch]
  );

  const increaseProgress = () => {
    const page = currentSectionIndex + 1;
    const newProgress = Math.floor(((page + 1) / data.sections.length) * 100);
    onPageChange(currentSectionIndex, currentSectionIndex + 1);
    setProgress(newProgress);
  };

  const decreaseProgress = () => {
    const page = currentSectionIndex + 1;
    const newProgress = Math.floor(((page - 1) / data.sections.length) * 100);
    onPageChange(currentSectionIndex, currentSectionIndex - 1);
    setProgress(newProgress);
  };

  const nextSection = () => {
    increaseProgress();
    setCurrentSectionIndex(currentSectionIndex + 1);
  };

  const handleBack = () => {
    if (screen === screens.finalScreen) {
      setScreen(screens.form);
    } else {
      decreaseProgress();
      setCurrentSectionIndex(currentSectionIndex - 1);
    }
  };

  const showIntro = () => {
    setScreen(screens.intro);
  };

  const hideIntro = () => {
    setScreen(screens.form);
  };

  const shouldDisableNextButton = () => {
    for (const block of data.sections[currentSectionIndex].blocks) {
      const isInvalid = isInvalidBlockAnswer(block, currentUser);
      if (isInvalid) {
        return true;
      }
    }

    return false;
  };

  const handleConfirmSubmit = useCallback(async () => {
    setIsWarningDialogOpen(false);
    if (onSubmit) {
      const noGlossary = stripGlossaryFromData(data);
      const result = stripAdditionalPropertiesFromData(noGlossary);
      await onSubmit(result);
    }
    setScreen(screens.finalScreen);
  }, [data, onSubmit]);

  const handleSubmit = useCallback(async () => {
    if (readOnly) {
      return setScreen(screens.finalScreen);
    }

    if (conversation?.status === conversationStatuses.pending) {
      setIsWarningDialogOpen(true);
    } else {
      await handleConfirmSubmit();
    }
  }, [
    handleConfirmSubmit,
    setIsWarningDialogOpen,
    setScreen,
    conversation?.status,
    readOnly,
  ]);

  const renderButtons = () => {
    const isNextBtnDisabled = shouldDisableNextButton();
    const isLastSection = currentSectionIndex === data.sections.length - 1;
    if (isLastSection) {
      return (
        <Button
          disabled={isNextBtnDisabled || adminMode}
          fullWidth={true}
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          Sign consent form
        </Button>
      );
    }

    const isPreviousBtnDisabled = currentSectionIndex === 0;

    return (
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Button
          color="primary"
          disabled={isPreviousBtnDisabled}
          onClick={handleBack}
        >
          Previous
        </Button>
        <Button
          disabled={isNextBtnDisabled}
          variant="contained"
          color="primary"
          onClick={nextSection}
        >
          Next
        </Button>
      </Grid>
    );
  };

  let AppBarButton = (
    <IconButton
      onClick={showIntro}
      edge="start"
      className={classes.menuButton}
      color="inherit"
      aria-label="menu"
    >
      <HomeIcon />
    </IconButton>
  );

  let title = (
    <>
      {`${currentSectionIndex + 1}. `}
      {data.sections[currentSectionIndex].titleWithExplanations}
    </>
  );

  const isLastSection = currentSectionIndex === data.sections.length - 1;
  if (isLastSection) {
    if (screen === screens.finalScreen) {
      AppBarButton = null;
    } else {
      AppBarButton = (
        <IconButton
          onClick={handleBack}
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
        >
          <ArrowBackIcon />
        </IconButton>
      );
    }
  }

  if (data.sections.length === 1) {
    AppBarButton = null;
    title = data.sections[currentSectionIndex].titleWithExplanations;
  }

  if (screen === screens.finalScreen) {
    title = data.title;
  }

  const signaturePage = useMemo(() => {
    const pagesWithSignature = data.sections.filter((x) =>
      x.blocks.some((x) => x.type === blockTypes.signature)
    );
    return pagesWithSignature[0];
  }, [data]);

  return (
    <ThemeProvider theme={previewTheme}>
      <div className={classes.root}>
        <Visible when={screen === screens.intro}>
          <Intro form={data} onStart={hideIntro} />
        </Visible>
        <Visible
          when={screen === screens.form || screen === screens.finalScreen}
        >
          <div className={classes.main}>
            <Visible when={mode === modes.NONE || mode === modes.MESSENGER}>
              <div className={classes.appBar}>
                <div className={classes.appBarButtonContainer}>
                  {AppBarButton}
                </div>
                <div className={classes.appBarHeaderContainer}>
                  <Typography variant="h6" className={classes.title}>
                    {title}
                  </Typography>
                </div>
              </div>
              <InfoNote
                isOpen={isNoteOpen}
                handleClose={handleNoteClose}
                anchorEl={anchorEl}
              />
              <LinearProgress variant="determinate" value={progress} />
            </Visible>
            <Visible when={screen === screens.form}>
              <Conversation
                mode={mode}
                setMode={setMode}
                conversation={conversation}
                onAddMessage={onAddMessage}
                onViewConversation={onViewConversation}
                openChooseQuote={handleSelectQuote}
                subscribeQuoteChosen={subscribeQuoteChosen}
              />
            </Visible>
            <Visible when={mode === modes.SELECTION}>
              <SelectionWizard
                isTextSelected={isTextSelected}
                onClose={() => setMode(modes.NONE)}
                onSelectionComplete={handleSelectionComplete}
                onSkip={handleSkipSelection}
              />
            </Visible>
            <Visible when={screen === screens.form}>
              <div className={classes.subMain}>
                <ViewWrapper
                  previewTheme={previewTheme}
                  initialValue={
                    data.sections[currentSectionIndex].bodyWithExplanations
                  }
                  customClassName={'section-root'}
                  isSelectionMode={mode === modes.SELECTION}
                />
                {data.sections[currentSectionIndex].blocks.map(
                  (block, index) => {
                    let sectionContainerStyles = {};
                    const countOfBlocks =
                      data.sections[currentSectionIndex].blocks.length;
                    const isLastBlock = countOfBlocks - 1 === index;

                    return (
                      <div
                        className={!isLastBlock ? sectionContainerStyles : null}
                        key={block.previewId}
                      >
                        <SectionBlock
                          block={block}
                          onChange={onAnswer}
                          currentUser={currentUser}
                          readOnly={readOnly}
                        />
                      </div>
                    );
                  }
                )}
              </div>
            </Visible>
            <Visible when={screen === screens.finalScreen}>
              <FinalScreen
                signaturePage={signaturePage}
                currentUser={currentUser}
                onPdfDownload={onPdfDownload}
              />
            </Visible>
          </div>
          <Visible when={screen === screens.form}>
            <div className={classes.footer}>{renderButtons()}</div>
          </Visible>
        </Visible>
      </div>
      <WarningDialog
        isOpen={isWarningDialogOpen}
        onClose={() => setIsWarningDialogOpen(false)}
        onConfirm={handleConfirmSubmit}
      />
    </ThemeProvider>
  );
};

FormBuilderPreview.propTypes = FormBuilderPreviewTypes;

export default withStyles(styles)(FormBuilderPreview);
