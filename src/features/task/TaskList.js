import { Task } from './Task'
import { useSelector, useDispatch } from 'react-redux'
import * as taskActions from './taskListSlice'
import * as signalR from "@microsoft/signalr"
import { useEffect } from 'react'

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
        let task = {
            Title: document.getElementById('titleInput').value,
            Description: document.getElementById('descriptionInput').value
        }

        dispatch(taskActions.insertTask(task));
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
            <ul>
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
            </ul>

            <div>
                <input placeholder='Title' id='titleInput' />
                <input placeholder='Description' id='descriptionInput' />
                <button onClick={handleInsert}>Submit</button>
            </div>
        </>
    )
}