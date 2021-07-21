const styles = (theme) => ({
  textContainer: {
    paddingTop: theme.spacing(2),
  },
  canvasContainer: {
    position: 'relative',
    marginTop: theme.spacing(2),
    background: '#E1E1E1',
    // height: theme.spacing(38),
  },
  signatureContainer: {
    textAlign: 'center',
    position: 'relative',
    width: '100%',
    height: theme.spacing(38),
    backgroundColor: '#0000000A',
    marginTop: theme.spacing(2),
  },
  signature: {
    width: '100%',
    height: '100%',
  },
  instructionContainer: {
    position: 'absolute',
    bottom: theme.spacing(1),
    left: theme.spacing(1),
    color: '#393939',
  },
  redoContainer: {
    paddingTop: theme.spacing(6),
  },
});

export default styles;
