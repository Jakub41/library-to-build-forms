import { createTheme } from '@material-ui/core/styles';
import React, { useMemo, useState } from 'react';
import defaultTheme from '../theme/defaultTheme';
export const ThemeContext = React.createContext();

export const ThemeProvider = ({ children, userTheme, onSave }) => {
  return (
    <Provider onSave={onSave} theme={userTheme}>
      {children}
    </Provider>
  );
};

const Provider = (props) => {
  const { children, onSave } = props;
  const [theme, setTheme] = useState(props.theme);

  const muiTheme = useMemo(() => createTheme(defaultTheme, theme), [theme]);

  const onChangeStylingHandle = (muiTheme) => {
    const newProps = mergeExportThemeProps(muiTheme);
    onSave && onSave(newProps);
    setTheme(newProps);
  };

  const mergeExportThemeProps = (themeProps) => {
    const tempTheme = Object.assign({}, { ...theme });
    Object.keys(themeProps).forEach((tp) => {
      if (typeof themeProps[tp] === 'object') {
        Object.keys(themeProps[tp]).forEach((tpk) => {
          if (typeof themeProps[tp][tpk] === 'object') {
            if (tempTheme[tp] && tempTheme[tp][tpk]) {
              tempTheme[tp] = {
                ...tempTheme[tp],
                [tpk]: { ...tempTheme[tp][tpk], ...themeProps[tp][tpk] },
              };
            } else {
              tempTheme[tp] = {
                ...tempTheme[tp],
                [tpk]: { ...themeProps[tp][tpk] },
              };
            }
          } else {
            tempTheme[tp] = { ...tempTheme[tp], [tpk]: themeProps[tp][tpk] };
          }
        });
      } else {
        tempTheme[tp] = themeProps[tp];
      }
    });
    return tempTheme;
  };

  return (
    <ThemeContext.Provider
      value={{
        initialUserTheme: props.theme,
        theme: muiTheme,
        onChangeStyling: onChangeStylingHandle,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
