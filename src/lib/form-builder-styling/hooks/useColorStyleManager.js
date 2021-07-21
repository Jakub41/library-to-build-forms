function useColorStyleManager(theme, onChange) {
  function onColorUpdate(colorScope, color) {
    const updatedColor = {
      [colorScope]: {
        main: color,
      },
    };
    const buttonColorUpdate = {
      MuiButton: {
        containedPrimary: {
          '&:hover': {
            backgroundColor: `${color}4D`
          }
        }
      },
    }
    onChange({ palette: updatedColor, overrides: buttonColorUpdate });
  }
  
  const onColorChange = (colorScope, color) => {
    onColorUpdate(colorScope, color);
  };
  
  return { onColorChange };
}

export default useColorStyleManager;
