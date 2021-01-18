import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { deleteTodo, editTodo, updateStatus } from '../actions'
import { Paper, Grid, Modal, TextField, Button, Tabs, Tab, Switch } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import './TodoList.css'

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      flexGrow: 1,
      textAlign: 'left',
      padding: '10px',
      justifyContent: 'center',
      '& > *': {
        margin: theme.spacing(1),
        width: theme.spacing(16),
        height: 'auto',
      },
    },
    grid: {
        width: '100%',
        margin: '0px',
        justifyContent: 'center'
    },
    todo_title: {
        fontSize: '20px',
        color:'#262626'
    },
    paperModal: {
        position: 'absolute',
        width: 'content',
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
      },
    paper: {
        padding: theme.spacing(1),
    }
  }));
  
const TodoList = (props) => {
    const [updatedInput, setUpdatedInput] = useState(null);
    const [updatedDate, setUpdatedDate] = useState(null);
    const [open, setOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState(null);
    const [modalDate, setModalDate] = useState(null);
    const [modalId, setModalId] = useState(null);
    const [filterValue, setFilterValue] = useState(0);
    const [filteredData, setFilteredData] = useState(props.todos);
    const [activeFilter, setActiveFilter] = useState(0);
    const [error, setError] = useState('');
    const dateItemClass = ' dateItem'
    const classes = useStyles();

    const updateTodo = () => {
        if(updatedInput === "" || updatedInput === " ") {
            setError('Please fill the required fields');
        }
        if(modalId !== null && updatedInput !== "" && updatedDate !== "") {
            props.dispatch(editTodo(modalId, updatedInput === null?modalMessage:updatedInput, updatedDate === null?modalDate:updatedDate));
            setOpen(false);
        }
    }

    const setStatus = (isComplete, id) => {
        if(isComplete !== null && id !== null) {
            props.dispatch(updateStatus(id, isComplete === true ? true:false))
        }
    }

    const setModalData = (message, date, id) => {
        setModalMessage(message);
        setModalDate(date);
        setModalId(id);
        setError('');
        setOpen(true);

    }

    useEffect(() => {
        setFilteredData(props.todos);
        setFilterValue(0);
    }, [props])

    const setFilter = (value) => {
        if(value === 'pending') {
            setFilteredData(props.todos.filter( todo => !todo.isComplete ))
            setFilterValue(1)
            setActiveFilter(1)
        }

        if(value === 'completed') {
            setFilteredData(props.todos.filter( todo => todo.isComplete ))
            setFilterValue(2)
            setActiveFilter(2)
        }

        if(value === 'all') {
            setFilteredData(props.todos)
            setFilterValue(0)
            setActiveFilter(0)
        }
    }

    return (
        <div>
            <Modal
                open={open}
                onClose={e => setOpen(false)}
                style={{display:'flex',alignItems:'center',justifyContent:'center'}}
            >
                <div className={classes.paperModal}>
                    <Grid container className={classes.grid}>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                        <TextField
                            id='standard-basic'
                            type='text'
                            name='editedUserInput'
                            onChange={(e) => setUpdatedInput(e.target.value)}
                            defaultValue={modalMessage}
                            label='Edit Todo'
                        /></Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                        <TextField
                            id="date"
                            label="Edit Date"
                            name="todo_date"
                            type="date"
                            defaultValue={modalDate}
                            onChange={e => setUpdatedDate(e.target.value)}
                            className={classes.textField + dateItemClass}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        /></Grid>
                        <Button style={{marginTop: '20px'}} type='submit' onClick={e => updateTodo(e)} variant="contained" color="primary">
                        UPDATE
                        </Button>
                    </Grid>
                    <span style={{fontSize:'10px',color:'red'}}>{error}</span>
                </div>
            </Modal>
                
            <Grid style={{marginTop: '20px'}} container className={classes.grid}>
                <Grid item xs={10} sm={8} md={6} lg={4}>
                    <Paper className='classes.root'>
                        <Tabs
                            value={filterValue}
                            indicatorColor="primary"
                            textColor="primary"
                            centered
                        >
                            <Tab onClick={() => setFilter('all')} name='all' label="All" />
                            <Tab onClick={() => setFilter('pending')} label="Pending" />
                            <Tab onClick={() => setFilter('completed')} label="Completed" />
                        </Tabs>
                    </Paper>
                </Grid>
            </Grid>
            {filteredData.map((todo, index) => (
                <div className={classes.root} key={index}>
                    <Grid container className={classes.grid} spacing={1}>
                        <Grid item xs={12} sm={12} md={8} lg={6}>
                            <Paper className={classes.paper} style={{ padding: '10px'}} elevation={3}>
                                <Grid container className={classes.grid} spacing={1}>
                                    <Grid item xs={6} style={{verticalAlign:'middle'}}>
                                        <span className={classes.todo_title}>{todo.message}</span>
                                    </Grid>
                                    <Grid item xs={6} style={{textAlign: 'right', verticalAlign:'middle'}}>
                                        <span style={{color: todo.isComplete===true?'#00B74A':'#FFA900'}}>{todo.isComplete===true?'Complete':'Pending'}</span>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <span style={{fontSize: '12px'}}>Due: </span>
                                        <span style={{fontWeight: 'bold', fontSize: '12px', marginTop:'10px'}}>{todo.date}</span>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <EditIcon style={{color: 'blue',marginTop:'10px',marginRight:'10px',cursor: 'pointer'}} onClick={() => setModalData(todo.message, todo.date, todo.id)} />
                                        <DeleteIcon style={{color: 'red',marginTop:'10px', cursor: 'pointer'}} onClick={() => props.dispatch(deleteTodo(todo.id))} />
                                    </Grid>
                                    <Grid item xs={6} style={{textAlign:'right'}}>
                                    {activeFilter === 0?
                                        <div>
                                            <span style={{fontSize: '12px'}}>Mark as complete</span>
                                            <Switch
                                            checked={todo.isComplete === true ? true:false}
                                            onChange={event => setStatus(event.target.checked,todo.id)}
                                            name="todo_status"
                                            id='todo_status_id'
                                            color='primary'
                                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                                            />
                                        </div>:""
                                    }
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
            )
            )}
        </div>
    )
}

const mapStateToProps = (state) => ({
    todos: state.todos.data,
})

export default connect(mapStateToProps)(TodoList);
