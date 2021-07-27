import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import React, { useMemo } from 'react';
import {
  conversationMemberTypes,
  conversationMessageStatuses,
} from '../../constants/constants';
import HtmlRender from '../HtmlRender/HtmlRender';
import styles from './Message.styles';

const toHtml = (text) =>
  text
    .split('\n')
    .join('<br />')
    .split('`')
    .reduce(
      (acc, fragment, index, fragments) =>
        `${acc}${
          index % 2 === 0
            ? `${index > 0 ? '`</mark>' : ''}${fragment}`
            : `${fragments.length > index + 1 ? '<mark>' : ''}\`${fragment}`
        }`,
      ''
    );

const Message = ({ classes, message }) => {
  const classNames = useMemo(
    () =>
      [
        classes.root,
        message.author.memberType === conversationMemberTypes.user
          ? classes.fromUser
          : classes.fromRecipient,
        message.author.memberType === conversationMemberTypes.user &&
        message.status === conversationMessageStatuses.pending
          ? classes.unread
          : '',
      ].join(' '),
    [message.status, message.author.memberType]
  );

  const content = useMemo(() => toHtml(message.content), [message.content]);

  return (
    <div className={classNames}>
      <Typography variant="body1">
        <HtmlRender>{content}</HtmlRender>
      </Typography>
    </div>
  );
};

export default withStyles(styles)(Message);
