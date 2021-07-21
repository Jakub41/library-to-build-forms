import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  Grid,
  Slide,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
  withStyles,
} from '@material-ui/core';
import HelpIcon from '@material-ui/icons/ContactSupport';
import SendIcon from '@material-ui/icons/Send';
import React, { forwardRef, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { conversationMemberTypes, conversationMessageStatuses, modes } from '../../constants/constants';
import HelpAppBar from '../HelpAppBar/HelpAppBar';
import Visible from '../Visible';
import styles from './Conversation.styles';
import Message from './Message';
import NewMessagePrompt from './NewMessagePrompt';
import NoMessages from './NoMessages';
import ResolvedPrompt from './ResolvedPrompt';

const MARK_READ_TIMEOUT = 3000; // Time to read the whole conversation before is marked as read

const Transition = forwardRef((props, ref) => <Slide direction="down" ref={ref} {...props} />);

/**
 * Wrte, send and receive a message
 */
const useBasicHandlers = ({ conversation, onAddMessage }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [sending, setSending] = useState(false);
  const [sendingError, setSendingError] = useState(false);

  useEffect(() => {
    setMessages(conversation?.messages?.nodes || []);
  }, [conversation?.messages?.nodes]);

  const markAsRead = useCallback(() => {
    setMessages((current) =>
      current.map((message) => ({
        ...message,
        status: message.author.memberType === conversationMemberTypes.user ? conversationMessageStatuses.default : message.status,
      }))
    );
  }, [setMessages]);

  const handleSendMessage = useCallback(
    (text) => {
      const content = (typeof text === 'string' && text.trim().length ? text : message).trim();
      setSendingError(false);

      if (content.length) {
        setSending(true);
        setMessage('');
        onAddMessage(content)
          .then(() => {
            setSendingError(false);
            setMessages((current) => [
              ...current,
              { content, status: conversationMessageStatuses.default, author: { memberType: conversationMemberTypes.recipient } },
            ]);
            markAsRead();
          })
          .catch((err) => {
            setSendingError(err || true);
            setMessage(content);
          })
          .finally(() => {
            setSending(false);
          });
      }
    },
    [onAddMessage, message, setMessages, setMessage, markAsRead, setSending, setSendingError]
  );

  const handleMessageChange = useCallback(
    ({ target }) => {
      setSendingError(false);
      setMessage(target.value);
    },
    [setSendingError, setMessage]
  );

  // Enter = send message, CTRL + Enter = new line
  const handleMessageKeyDown = useCallback(
    ({ keyCode, ctrlKey }) => {
      setSendingError(false);
      if (keyCode == 13) {
        if (ctrlKey) setMessage((original) => `${original}\n`);
        else handleSendMessage();
      }
    },
    [handleSendMessage, setSendingError, setMessage]
  );

  const resetMessage = useCallback(() => {
    setMessage('');
    setSending(false);
    setSendingError(false);
  }, [setMessage, setSending, setSendingError]);

  return { message, setMessage, messages, sending, sendingError, resetMessage, handleMessageChange, handleMessageKeyDown, handleSendMessage, markAsRead };
};

/**
 * Modal dialog handlers
 */
const useDialogHandlers = ({ mode, messages, setMode, resetMessage }) => {
  const ref = useRef();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  const handleOpen = useCallback(() => {
    setMode(modes.MESSENGER);
  }, [setMode]);

  const handleClose = useCallback(() => {
    resetMessage();
    setMode(modes.NONE);
  }, [setMode, resetMessage]);

  // Scroll to the last message
  const scrollToBottom = useCallback(() => {
    if (ref.current) {
      ref.current.scrollTo(0, ref.current.scrollHeight);
    }
  }, [mode, ref]);

  // Set messagePaneRef and use it for scrollToBottom
  const dialogContentRef = useCallback(
    (node) => {
      ref.current = node;
      scrollToBottom();
    },
    [ref]
  );

  // Scroll to bottom when new message received
  useEffect(scrollToBottom, [messages, scrollToBottom]);

  return { fullScreen, dialogContentRef, handleOpen, handleClose, scrollToBottom };
};

/**
 * Mark conversation as read
 */
const useMarkAsRead = ({ mode, messages, onViewConversation, markAsRead, scrollToBottom, handleSendMessage }) => {
  const timeoutRef = useRef();
  const [displayNotification, setDisplayNotification] = useState(false);
  const [displayResolvedPrompt, setDisplayResolvedPrompt] = useState(false);

  const someUnread = useMemo(
    () => messages.some((message) => message.author.memberType === conversationMemberTypes.user && message.status === conversationMessageStatuses.pending),
    [messages]
  );

  useEffect(() => {
    setDisplayNotification(mode === modes.NONE && someUnread);
    if (someUnread) setDisplayResolvedPrompt(false);
  }, [mode, someUnread]);

  const restartTimeout = useCallback(() => {
    clearTimeout(timeoutRef.current);
    if (mode === modes.MESSENGER && someUnread) {
      timeoutRef.current = setTimeout(() => {
        const lastMessage = messages.length ? messages[messages.length - 1] : null;
        const showPrompt =
          messages.some((message) => message.author.memberType === conversationMemberTypes.recipient) &&
          lastMessage?.author.memberType === conversationMemberTypes.user &&
          lastMessage?.status === conversationMessageStatuses.pending;
        setDisplayResolvedPrompt(showPrompt);
        if (showPrompt) scrollToBottom();

        markAsRead();
        onViewConversation();
      }, MARK_READ_TIMEOUT);
    }
  }, [timeoutRef, mode, messages, onViewConversation, markAsRead, someUnread, setDisplayResolvedPrompt]);

  useEffect(() => {
    restartTimeout();
  }, [mode, messages, restartTimeout]);

  const handleResolvedPrompt = useCallback(
    (content) => () => {
      setDisplayResolvedPrompt(false);
      if (content) handleSendMessage(content);
    },
    []
  );

  return { displayNotification, displayResolvedPrompt, handleResolvedPrompt };
};

/**
 * Handlers for "Add qoute from consent form"
 */
const useQuoteFromForm = ({ mode, setMessage, subscribeQuoteChosen, openChooseQuote }) => {
  const inputRef = useRef();
  const [selectionStart, setSelectionStart] = useState(0);
  const [selectionEnd, setSelectionEnd] = useState(0);

  // Place cursor at the end of text in text-area after a quote is inserted
  useEffect(() => {
    if (mode === modes.MESSENGER && inputRef.current) {
      inputRef.current.selectionStart = inputRef.current.value.length;
      inputRef.current.selectionEnd = inputRef.current.value.length;
    }
  }, [mode, inputRef.current]);

  // Subscription is triggered once a quote is setected and confirmed
  useEffect(() => {
    subscribeQuoteChosen((quote) => {
      if (quote) setMessage((msg) => `${msg.substr(0, selectionStart)}\`${quote.replace(/\W+/gm, ' ')}\`${msg.substr(selectionEnd)}`);
    });
  }, [setMessage, selectionStart, selectionEnd]);

  const handleAddQuote = useCallback(() => {
    setSelectionStart(inputRef?.current?.selectionStart || 0);
    setSelectionEnd(inputRef?.current?.selectionEnd || 0);
    openChooseQuote();
  }, [openChooseQuote, inputRef.current]);

  return { inputRef, handleAddQuote };
};

const Conversation = ({ classes, mode, setMode, conversation, onAddMessage, onViewConversation, openChooseQuote, subscribeQuoteChosen }) => {
  const {
    message,
    messages,
    sending,
    sendingError,
    setMessage,
    resetMessage,
    handleMessageChange,
    handleMessageKeyDown,
    handleSendMessage,
    markAsRead,
  } = useBasicHandlers({ conversation, onAddMessage });
  const { fullScreen, dialogContentRef, handleOpen, handleClose, scrollToBottom } = useDialogHandlers({ mode, messages, setMode, resetMessage });
  const { displayNotification, displayResolvedPrompt, handleResolvedPrompt } = useMarkAsRead({
    mode,
    messages,
    onViewConversation,
    markAsRead,
    scrollToBottom,
    handleSendMessage,
  });
  const { inputRef, handleAddQuote } = useQuoteFromForm({ mode, setMessage, subscribeQuoteChosen, openChooseQuote });

  return (
    <>
      <Visible when={mode === modes.NONE || mode === modes.MESSENGER}>
        <Fab color="primary" size="medium" aria-label="conversation" id="help-icon" className={classes.infoIcon} disabled={mode === modes.MESSENGER} onClick={handleOpen}>
          <HelpIcon fontSize="large" />
        </Fab>
      </Visible>

      <Visible when={displayNotification}>
        <NewMessagePrompt onOpen={handleOpen} />
      </Visible>


      <Dialog open={mode === modes.MESSENGER} fullWidth fullScreen={fullScreen} classes={{paper: classes.dialogPaper}} TransitionComponent={Transition}>
        <DialogTitle className={classes.dialogTitle}>
          <HelpAppBar onClose={handleClose} />
        </DialogTitle>
        <DialogContent ref={dialogContentRef} className={classes.dialogContent}>
          <Visible when={messages.length} fallBack={<NoMessages />}>
            {messages.map((message, index) => (
              <Message key={`msg${index}`} message={message} />
            ))}
          </Visible>
          <Visible when={displayResolvedPrompt}>
            <ResolvedPrompt onConfirm={handleResolvedPrompt} onCancel={handleResolvedPrompt} />
          </Visible>
        </DialogContent>
        <DialogActions>
          <Grid container direction="column" alignItems="center" spacing={1}>
            <Grid item>
              <Button variant="text" color="secondary" disabled={sending} onClick={handleAddQuote}>
                <Typography variant="button">Add quote from consent form</Typography>
              </Button>
            </Grid>
            <Visible when={sendingError}>
              <Grid item>
                <Typography variant="subtitle2" color="error">
                  Message was not sent. Please try again later ...
                </Typography>
              </Grid>
            </Visible>
            <Grid item container direction="row" alignItems="flex-end" spacing={1}>
              <Grid item xs>
                <TextField
                  inputRef={inputRef}
                  autoFocus
                  value={message}
                  placeholder={sending ? 'Sending message ...' : undefined}
                  onChange={handleMessageChange}
                  onKeyDown={handleMessageKeyDown}
                  disabled={sending}
                  multiline
                  rowsMax={3}
                  fullWidth
                  InputProps={{ disableUnderline: true, classes: { root: classes.multiLineInput } }}
                />
              </Grid>
              <Grid item>
                <Fab color="primary" size="medium" aria-label="send" disabled={sending || message.length < 1} onClick={handleSendMessage}>
                  <SendIcon />
                </Fab>
              </Grid>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default withStyles(styles)(Conversation);
