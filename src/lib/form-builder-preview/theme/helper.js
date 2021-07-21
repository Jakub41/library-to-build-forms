export const getMarkdownCss = (rootClassName, theme) => {
  return (
    `.${rootClassName} .tui-editor-contents {
      font-family: ${theme.typography.body1.fontFamily};
      font-size: ${theme.typography.body1.fontSize};
      font-weight: ${theme.typography.body1.fontWeight};
      line-Height: ${theme.typography.body1.lineHeight};
    }

    .${rootClassName} .tui-editor-contents * {
      color: ${theme.typography.body1.color};
    }
    `
  );
};