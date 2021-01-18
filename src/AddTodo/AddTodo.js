import React, { useState } from 'react'
import {connect} from 'react-redux'
import {addTodo} from '../actions'
import {TextField, Button, Grid} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import './AddTodo.css'

const useStyles = makeStyles((theme) => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  grid: {
    width: '100%',
    margin: '0px',
    justifyContent: 'center'
  },
}));

const AddTodo = (props) => {
  const classes = useStyles();
  const [error,setError] = useState('');
  const gridItemClass = ' grid-item';
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0');
  let yyyy = today.getFullYear();
  today = yyyy + '-' + mm + '-' + dd;

    return (
        <form onSubmit={(event) => {
            event.preventDefault();
            let input = event.target.userInput.value;
            let date = event.target.todo_date.value;
            var isError = false;
            setError('');

            if(/\d/.test(input)) {
              setError('Numeric values not allowed');
              isError = true;
            }

            if(input === "") {
              setError('Please fill the required fields');
              isError = true;
            }

            if(input && date !== null && !isError) {
              props.dispatch(addTodo(input, date))
              event.target.userInput.value = '';
            }
            
        }}>
          <Grid container spacing={0} className={classes.grid}>
            <Grid item xs={12} sm={4} md={3} lg={2}>
              <TextField id="standard-basic" name='userInput' label="Add Todo"/>
            </Grid>
            <Grid item xs={12} sm={4} md={3} lg={3}>
              <TextField
                id="date"
                label="Add Date"
                name="todo_date"
                type="date"
                defaultValue={today}
                className={classes.textField+gridItemClass}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={3} md={2} lg={1}>
              <Button className='grid-item add-todo-btn' type='submit' variant="contained" color="primary">
                ADD TODO
              </Button>
            </Grid>
          </Grid>
          <span style={{fontSize:'10px',color:'red'}}>{error}</span>
        </form>
    )
}

export default connect()(AddTodo);
