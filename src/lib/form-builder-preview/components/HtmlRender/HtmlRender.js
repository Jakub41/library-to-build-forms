import parse from 'html-react-parser';
import sanitize from 'htmlsanitize';

function HtmlRender({ children }) {
  return parse(sanitize(children));
}

export default HtmlRender;
