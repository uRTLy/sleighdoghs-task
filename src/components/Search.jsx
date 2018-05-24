import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

import { Button, Paper, TextField, withStyles } from '@material-ui/core';

const renderTextField = ({ input, rest }) => <TextField {...input} {...rest} />;

const classes = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    padding: 5,
    paddingLeft: 20,
  },
  btnMargin: {
    marginTop: 3,
  },
};

class Search extends Component {
  render() {
    const { classes, handleSubmit } = this.props;
    return (
      <Paper className={classes.container}>
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Field name="query" component={renderTextField} />
          <Button type="submit" className={classes.btnMargin}>
            Search
          </Button>
        </form>
      </Paper>
    );
  }
}

function validate(values) {
  const errors = {};
  return errors;
}

const StyledSearch = withStyles(classes)(Search);

export default reduxForm({
  validate,
  form: 'searchForm',
  initialValues: {
    query: '',
  },
})(StyledSearch);
