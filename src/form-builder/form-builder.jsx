import { Button, CssBaseline, withStyles } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import SaveIcon from '@material-ui/icons/Save';
import PropTypes from 'prop-types';
import React, { useCallback, useRef, useState } from 'react';
import mockData from '../data/mockData.json';
import FormBuilderContent from '../lib/form-builder-content';
import { builderReducer, prepareDataForSave } from '../lib/form-builder-content/useBuilder';
import FormBuilderGlossary from '../lib/form-builder-glossary';
import FormBuilderPreview from '../lib/form-builder-preview';
import FormStyler from '../lib/form-builder-styling';
import styles from './form-builder.styles';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && <div p={4}>{children}</div>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const FormBuilder = ({ classes }) => {
  const [activeTab, setActiveTab] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  const [data, setData] = useState(mockData);
  const [theme, setTheme] = useState({});
  const [glossary, setGlossary] = useState([]);

  let storedData = useRef(mockData);

  const customReducer = useCallback((state, action) => {
    const newState = builderReducer(state, action);
    storedData.current = newState;
    return newState;
  }, []);

  const saveToState = useCallback(() => {
    const cleanedData = prepareDataForSave(storedData.current);
    setData(cleanedData);
    console.log(cleanedData);
  }, [storedData]);

  return (
    <div>
      <AppBar className={classes.appBar} position="static" color="default" elevation={0}>
        <div>
          <div className={classes.headerTabsContainer}>
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
              aria-label="full width tabs example"
            >
              <Tab label="Content" {...a11yProps(0)} />
              <Tab label="Styling" {...a11yProps(1)} />
              <Tab label="Glossary" {...a11yProps(2)} />
              <Tab label="Preview" {...a11yProps(3)} />
            </Tabs>
          </div>
          <Button onClick={saveToState} variant="text" size="large">
            <SaveIcon />
          </Button>
        </div>
      </AppBar>
      <CssBaseline />
      <TabPanel value={activeTab} index={0}>
        <FormBuilderContent uploadServiceUrl="https://uploads.trialbee.xyz/api" initialData={data} reducer={customReducer} />
      </TabPanel>
      <TabPanel value={activeTab} index={1}>
        <FormStyler theme={theme} onChange={setTheme} />
      </TabPanel>
      <TabPanel value={activeTab} index={2}>
        <FormBuilderGlossary initialData={data} glossary={glossary} onChange={setGlossary} />
      </TabPanel>
      <TabPanel value={activeTab} index={3}>
        <FormBuilderPreview initialData={data} adminMode={true} theme={theme} glossary={glossary} onSubmit={console.warn} />
      </TabPanel>
    </div>
  );
};

export default withStyles(styles, { withTheme: true })(FormBuilder);
