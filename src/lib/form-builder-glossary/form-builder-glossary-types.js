import PropTypes from "prop-types";
import GlossaryPropTypes from "../prop-validations/glossary-prop.types";
import QuestionnairePropTypes from "../prop-validations/questionnaire-prop.types";

const FormBuilderGlossaryTypes = {
  initialData: PropTypes.shape(QuestionnairePropTypes),
  glossary: PropTypes.arrayOf(PropTypes.shape(GlossaryPropTypes)),
  onChange: PropTypes.func,
};

export default FormBuilderGlossaryTypes;
