const arrowHeight = 19;

const styles = (theme) => ({
  backdrop: {
    zIndex: 9,
  },
  transparentPopover: {
    background: 'transparent',
  },
  noteContainer: {
    background: 'transparent',
    display: 'flex',
    flexDirection: 'column',
  },
  arrowContainer: {
    display: 'flex',
    flexDirection: 'row-reverse',
  },
  arrow: {
    width: 0,
    height: 0,
    background: 'transparent',
    borderWidth: arrowHeight,
    borderStyle: 'solid',
    borderColor: 'transparent',
    borderRightColor: 'white',
    marginBottom: -arrowHeight,
  },
  messageContainer: {
    display: 'flex',
    borderRadius: 7,
    flexDirection: 'column',
    maxWidth: 295,
    backgroundColor: 'white',
    padding: theme.spacing(2),
  },
  message: {
    textAlign: 'left',
    width: '100%',
    ...theme.typography.subtitle1,
    letterSpacing: 0.6,
    fontWeight: 300,
  },
  buttonContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row-reverse',
    paddingTop: theme.spacing(2),
  },
  button: {
    color: '#005B86',
    padding: theme.spacing(1),
    ...theme.typography.button,
    textTransform: 'capitalize',
    cursor: 'pointer',
  },
});

export default styles;
