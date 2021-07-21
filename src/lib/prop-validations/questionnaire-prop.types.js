import PropTypes from 'prop-types';
import CommonPropTypes from './common-prop.types';
import PagePropTypes from "./page-prop.types";

const QuestionnairePropTypes = {
  ...CommonPropTypes,
  pages: PropTypes.arrayOf(PropTypes.shape(PagePropTypes))
}

export default QuestionnairePropTypes;
