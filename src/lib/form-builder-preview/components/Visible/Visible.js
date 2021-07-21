const Visible = ({ when, fallBack, children }) => {
  if (when) {
    return children;
  } else {
    return fallBack ? fallBack : null;
  }
};

export default Visible;
