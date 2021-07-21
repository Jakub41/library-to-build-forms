import PropTypes from "prop-types";
import QuestionnairePropTypes from "../prop-validations/questionnaire-prop.types";
import GlossaryPropTypes from "../prop-validations/glossary-prop.types";

const FormBuilderPreviewTypes = {
  initialData: PropTypes.shape(QuestionnairePropTypes),
  reducer: PropTypes.func,
  theme: PropTypes.object,
  onSubmit: PropTypes.func,
  glossary: PropTypes.arrayOf(PropTypes.shape(GlossaryPropTypes)),
  adminMode: PropTypes.bool,
};

export default FormBuilderPreviewTypes;
