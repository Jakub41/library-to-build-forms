const styles = ({ spacing, palette }) => ({
  root: {
    width: '100%',
  },
  rowLayout: {
    justifyContent: 'space-between',
    alignItems: 'baseline', // To be vertically aligned
    marginRight: 'auto',
    paddingBottom: spacing(2)
  },
  gridContainer: {
    minHeight: '100vh',
    textAlign: 'center',
  },
  header: {
    paddingBottom: spacing(3),
  },
  termTextStyle: {
    width: 180,
    minHeight: 48,
    textAlign: 'right',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
  explanationTextStyle: {
    width: 260,
    textAlign: 'left',
    wordWrap: "break-word"
  
  },
  textField: {
    width: 220,
    backgroundColor: '#0000000A',
    '& .MuiInput-inputMultiline': {
      padding: spacing(1),
    },
  },
  icons: {
    '& > svg': {
      margin: spacing(2),
    },
  }
});

export default styles;
