import FormBuilder from '../form-builder';

const config = {
  title: 'FormBuilder/App',
};

export default config;

const FormApp = () => <FormBuilder />;
export const App = FormApp.bind({});
