import { func, oneOfType, shape } from 'prop-types';
import QuestionnairePropTypes from '../prop-validations/questionnaire-prop.types';

const isUrl = (props, propName) => {
  const regex = /^[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/i;

  if (!propName || !regex.test(props[propName])) {
    const error =
      "Invalid prop '${propName}' passed to '${componentName}'. Expected a valid url address.";
    return new Error(error);
  }
};

const StateReducerFormBuilderPropTypes = {
  uploadServiceUrl: oneOfType([
    isUrl,
    shape({
      address: isUrl,
    }),
  ]).isRequired,
  initialData: shape(QuestionnairePropTypes).isRequired,
  reducer: func,
};

export default StateReducerFormBuilderPropTypes;
