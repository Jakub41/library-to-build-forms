import { variants } from '../theme/constants';

function useTextStyleManager(theme, onChange) {
  
  function onSingleVariant(variantName, styleProps, styleType) {
    if (styleType === 'fontFamily') {
      styleProps = fontFamilyChange(variantName, styleProps);
    }
    if (styleType === 'fontWeight') {
      styleProps = fontWeightChange(variantName, styleProps);
    }
    if (styleType === 'fontStyle') {
      styleProps = fontStyleChange(variantName, styleProps);
    }
    return { [variantName]: styleProps };
  }

  function onMultipleVariants(variantName, styleProps, styleType) {
    return variants[variantName].reduce((acc, current) => {
      const updated = onSingleVariant(current, styleProps, styleType);
      return { ...acc, ...updated };
    }, {});
  }

  function onTypographyUpdate(updatedTypography) {
    onChange({ typography: { ...updatedTypography } });
  }

  function fontWeightChange(variantName, fontWeight) {
    return { ...theme.typography[variantName], fontWeight: fontWeight };
  }

  function fontStyleChange(variantName, fontStyle) {
    const key = Object.keys(fontStyle)[0];
    const updated = theme.typography[variantName]?.[key] ? { [key]: '' } : { [key]: fontStyle[key] };
    return { ...theme.typography[variantName], ...updated };
  }

  function fontFamilyChange(variantName, fontFamily) {
    return { ...theme.typography[variantName], fontFamily: fontFamily };
  }

  const onStyleChange = (variantName, value, styleType) => {
    let typography = {};
    if (Object.keys(variants).includes(variantName)) {
      typography = onMultipleVariants(variantName, value, styleType);
    } else {
      typography = onSingleVariant(variantName, value, styleType);
    }

    onTypographyUpdate(typography);
  };

  return { onStyleChange };
}

export default useTextStyleManager;
