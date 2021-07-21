import React, { useContext } from 'react';
import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import styles from './form-builder-styling.styles';
import Divider from '@material-ui/core/Divider';

import { colorPalette, variantsEnum } from './theme/constants';
import Button from '@material-ui/core/Button';
import ColorBubble from './components/color-bubble';
import TextStyleChanger from './components/text-style-changer';
import FontStyleChanger from './components/font-style-changer';
import { ThemeContext } from './context';
import useTextStyleManager from './hooks/useTextStyleManager';
import useColorStyleManager from './hooks/useColorStyleManager';
import FontWeightChanger from './components/font-weight-changer';

export const COLOR_BUBBLES_SIZE = 20;

export const FORM_WIDTH = 220;

const FormBuilderStyling = ({ classes }) => {
  const { theme, onChangeStyling } = useContext(ThemeContext);
  const { onStyleChange } = useTextStyleManager(theme, onChangeStyling);
  const { onColorChange } = useColorStyleManager(theme, onChangeStyling);

  const handleFontStyleChange = (e, variantName) => {
    onStyleChange(variantName, e.target.value, 'fontFamily');
  };

  const handleOnTextStyleChange = (variantName, textProps) => {
    onStyleChange(variantName, textProps, 'fontStyle');
  };

  const handleOnFontWeightChange = (e, variantName) => {
    onStyleChange(variantName, parseInt(e.target.value), 'fontWeight');
  };

  const handleOnColorChange = (palette, color) => {
    onColorChange(palette, color);
  };

  const getMainColor = (paletteGroup) => {
    return theme.palette[paletteGroup].main;
  };

  const getTextFormatting = (variant) => {
    variant = resolveTypographyVariants(variant);
    return {
      hasItalic: theme.typography[variant]?.fontStyle === 'italic',
      hasUnderline: theme.typography[variant]?.textDecoration === 'underline',
    };
  };

  const getFontWeight = (variant) => {
    variant = resolveTypographyVariants(variant);
    return theme.typography[variant]?.fontWeight;
  };

  const getFontFamily = (variant) => {
    variant = resolveTypographyVariants(variant);
    return theme.typography[variant].fontFamily?.split(',')[0].replace(/"/gm, '');
  };

  const resolveTypographyVariants = (variant) => {
    if (variant === variantsEnum.HEADING) {
      return variantsEnum.H4;
    } else if (variant === variantsEnum.BODY) {
      return variantsEnum.BODY1;
    } else if (variant === variantsEnum.SUBHEADING) {
      return variantsEnum.H6;
    } else {
      return variant;
    }
  };

  return (
    <div className={classes.root}>
      <Grid container direction="column">
        <Grid item className={classes.gridItemContainer}>
          <Grid container justify="space-between" alignItems="center">
            <Grid item>
              <div className={classes.colorExampleRoot} style={{ backgroundColor: theme.palette.primary.main }}>
                <Typography variant="inherit" style={{ color: theme.palette.primary.contrastText }}>
                  Theme Primary color
                </Typography>
              </div>
            </Grid>
            <Grid item>
              <Grid container alignContent="flex-end" direction="row">
                {colorPalette.map((c, index) => (
                  <Grid item key={index} onClick={() => handleOnColorChange('primary', c)} className={classes.gridItemColorBubble}>
                    <ColorBubble key={index} color={c} size={COLOR_BUBBLES_SIZE} checked={c === getMainColor('primary')} />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Divider flexItem variant="middle" />
        <Grid item className={classes.gridItemContainer}>
          <Grid container justify="space-between" alignItems="center">
            <Grid item>
              <Typography variant="h4">Questionnaire heading style</Typography>
            </Grid>
            <Grid item>
              <Grid container alignItems="flex-end" spacing={2}>
                <FontStyleChanger fontFamily={getFontFamily(variantsEnum.H4)} onChange={(e) => handleFontStyleChange(e, variantsEnum.H4)} />
                <FontWeightChanger fontWeight={getFontWeight(variantsEnum.H4)} onChange={(e) => handleOnFontWeightChange(e, variantsEnum.H4)} />
                <TextStyleChanger {...getTextFormatting(variantsEnum.H4)} onClick={(e, textProps) => handleOnTextStyleChange(variantsEnum.H4, textProps)} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Divider flexItem variant="middle" />
        <Grid item className={classes.gridItemContainer}>
          <Grid container justify="space-between" alignItems="center">
            <Grid item>
              <Typography variant="h6">Page heading style</Typography>
            </Grid>
            <Grid item>
              <Grid container alignItems="flex-end" spacing={2}>
                <FontStyleChanger fontFamily={getFontFamily(variantsEnum.H6)} onChange={(e) => handleFontStyleChange(e, variantsEnum.H6)} />
                <FontWeightChanger fontWeight={getFontWeight(variantsEnum.H6)} onChange={(e) => handleOnFontWeightChange(e, variantsEnum.H6)} />
                <TextStyleChanger {...getTextFormatting(variantsEnum.H6)} onClick={(e, textProps) => handleOnTextStyleChange(variantsEnum.H6, textProps)} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Divider flexItem variant="middle" />
        <Grid item className={classes.gridItemContainer}>
          <Grid container justify="space-between" alignItems="center">
            <Grid item>
              <Typography variant="subtitle1">Subheading style</Typography>
            </Grid>
            <Grid item>
              <Grid container alignItems="flex-end" spacing={2}>
                <FontStyleChanger fontFamily={getFontFamily(variantsEnum.SUBTITLE1)} onChange={(e) => handleFontStyleChange(e, variantsEnum.SUBTITLE1)} />
                <FontWeightChanger fontWeight={getFontWeight(variantsEnum.SUBTITLE1)} onChange={(e) => handleOnFontWeightChange(e, variantsEnum.SUBTITLE1)} />
                <TextStyleChanger
                  {...getTextFormatting(variantsEnum.SUBTITLE1)}
                  onClick={(e, textProps) => handleOnTextStyleChange(variantsEnum.SUBTITLE1, textProps)}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Divider flexItem variant="middle" />
        <Grid item className={classes.gridItemContainer}>
          <Grid container justify="space-between" alignItems="center">
            <Grid item>
              <Typography variant="body1">
                Questionnaire body text style
              </Typography>
            </Grid>
            <Grid item>
              <Grid container alignItems="flex-end" spacing={2} style={{ paddingRight: FORM_WIDTH * 2 + theme.spacing(1) }}>
                <FontStyleChanger fontFamily={getFontFamily(variantsEnum.BODY1)} onChange={(e) => handleFontStyleChange(e, variantsEnum.BODY1)} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Divider flexItem variant="middle" />
        <Grid item className={classes.gridItemContainer}>
          <Grid container justify="space-between" alignItems="center">
            <Grid item>
              <Button color="primary" size="medium" selected variant="outlined">
                Button outlined
              </Button>
              <Button size="medium" color="primary" style={{ marginLeft: '8px' }}>
                Text button
              </Button>
              <Button color="primary" size="medium" variant="contained" style={{ marginLeft: '8px' }}>
                Button contained
              </Button>
            </Grid>
            <Grid item>
              <Grid container alignItems="flex-end" spacing={2}>
                <FontStyleChanger fontFamily={getFontFamily(variantsEnum.BUTTON)} onChange={(e) => handleFontStyleChange(e, variantsEnum.BUTTON)} />
                <FontWeightChanger fontWeight={getFontWeight(variantsEnum.BUTTON)} onChange={(e) => handleOnFontWeightChange(e, variantsEnum.BUTTON)} />
                <TextStyleChanger
                  {...getTextFormatting(variantsEnum.BUTTON)}
                  onClick={(e, textProps) => handleOnTextStyleChange(variantsEnum.BUTTON, textProps)}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default withStyles(styles)(FormBuilderStyling);
