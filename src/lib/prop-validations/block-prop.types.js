import PropTypes from 'prop-types';
import CommonPropTypes from './common-prop.types';
import ItemPropTypes from './item-prop.types';

const BlockPropTypes = {
  ...CommonPropTypes,
  sortOrder: PropTypes.number,
  key: PropTypes.string,
  type: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape(ItemPropTypes)),
  options: PropTypes.objectOf(PropTypes.any),
};

export default BlockPropTypes;
