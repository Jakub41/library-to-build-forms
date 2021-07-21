import PropTypes from 'prop-types'

const ItemPropTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string,
    value: PropTypes.string,
    isMandatory: PropTypes.bool
  })),
};

export default ItemPropTypes;
