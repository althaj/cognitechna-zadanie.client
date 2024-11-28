import { Task } from './Task'
import { useSelector, useDispatch } from 'react-redux'
import * as taskActions from './taskListSlice'
import * as signalR from "@microsoft/signalr"
import { useEffect } from 'react'

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';

export function TaskList() {
    const tasks = useSelector((state) => state.taskList.tasks)
    const editingTask = useSelector((state) => state.taskList.editingTask)
    const dispatch = useDispatch()

    useEffect(() => {
        const connection = new signalR.HubConnectionBuilder().withUrl("https://localhost:7045/taskHub").build();

        connection.on("TaskCreated", function (task) {
            dispatch(taskActions.onInsertTask(task));
        });

        connection.on("TaskUpdated", function (task) {
            dispatch(taskActions.onUpdateTask(task));
        });

        connection.on("TaskDeleted", function (id) {
            dispatch(taskActions.onRemoveTask(id));
        });
        
        connection.start().then(function () {
            dispatch(taskActions.getTasks())
        }).catch(function (err) {
            return console.error(err.toString());
        });

        return () => {
            connection.stop();
        };

    }, []);
    
    function handleInsert() {
        let titleElement = document.getElementById('titleInput')
        let descriptionElement = document.getElementById('descriptionInput')

        let task = {
            Title: titleElement.value,
            Description: descriptionElement.value
        }

        dispatch(taskActions.insertTask(task));

        titleElement.value = ''
        descriptionElement.value = ''
    }

    function handleToggleEditing(id) {
        dispatch(taskActions.onSetEditingTask(id))
    }

    function handleUpdate(id, title, description) {
        let task = {
            Id: id,
            Title: title,
            Description: description
        }

        dispatch(taskActions.updateTask(id, task))
        handleToggleEditing(id)
    }

    function handleRemove(id) {
        dispatch(taskActions.removeTask(id))
    }

    return (
        <>
            <Box sx={{ flexGrow: 1, padding: 5 }}>
                <Grid container spacing={2}>
                    <Grid size={3}>
                        <Box sx={{ padding: 5 }} boxShadow={1}>
                            <Typography variant="h4" align='center' gutterBottom>Create a new task</Typography>
                            <TextField id="titleInput" required label="Title" variant="standard" fullWidth />
                            <br />
                            <TextField id="descriptionInput" label="Description" variant="standard" fullWidth />
                            <br />
                            <Button onClick={handleInsert} fullWidth>Create</Button>
                        </Box>
                    </Grid>
                    <Grid size={9}>
                        <List sx={{ padding: 0 }}>
                            { tasks.map(task => 
                                <Task 
                                    key={task.Id}
                                    id={task.Id}
                                    title={task.Title}
                                    isEditing={editingTask != null && task.Id === editingTask.Id}
                                    description={task.Description}
                                    onEditButtonClicked={ () => handleToggleEditing(task.Id) }
                                    onDeleteButtonClicked={ () => handleRemove(task.Id) }
                                    onSaveButtonClicked={handleUpdate}
                                />)
                            }
                        </List>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}