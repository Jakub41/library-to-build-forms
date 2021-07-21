import PropTypes from 'prop-types';

const FormTextStylesPropTypes = PropTypes.shape({
  color: PropTypes.string,
  fontFamily: PropTypes.string,
  fontWeight: PropTypes.number,
  italic: PropTypes.bool,
  underline: PropTypes.bool,
});

const FormStylerPropTypes = {
  onChange: PropTypes.func,
  theme: PropTypes.shape({
    themeColor: PropTypes.string,
    formHeading: FormTextStylesPropTypes,
    pageHeading: FormTextStylesPropTypes,
    blockHeading: FormTextStylesPropTypes,
    bodyText: FormTextStylesPropTypes,
    button: FormTextStylesPropTypes,
  }),
};

export default FormStylerPropTypes;
