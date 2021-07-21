import PropTypes from 'prop-types';
import CommonPropTypes from './common-prop.types';
import BlockPropTypes from './block-prop.types';

const PagePropTypes = {
  ...CommonPropTypes,
  formBuilderContextId: PropTypes.string,
  sortOrder: PropTypes.number,
  blocks: PropTypes.arrayOf(PropTypes.shape(BlockPropTypes)),
};
export default PagePropTypes;

