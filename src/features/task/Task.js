import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import IconButton from '@mui/material/IconButton'
import ButtonGroup from '@mui/material/ButtonGroup'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'

import ModeEditIcon from '@mui/icons-material/ModeEdit'
import DeleteIcon from '@mui/icons-material/Delete'
import SaveIcon from '@mui/icons-material/Save'

export function Task({ id, title, description, isEditing, onEditButtonClicked, onDeleteButtonClicked, onSaveButtonClicked }) {
    return (
        isEditing ?
            <ListItem sx={{ paddingTop: 0, paddingBottom: 2 }}>
                <Box boxShadow={2} sx={{ width: 1, padding: 5 }}>
                    <TextField id={id + "_titleInput"} defaultValue={title} required label="Title" variant="standard" fullWidth />
                    <br />
                    <TextField id={id + "_descriptionInput"} defaultValue={description} label="Description" variant="standard" fullWidth />
                    <ButtonGroup variant="text">
                        <IconButton onClick={onEditButtonClicked}><ModeEditIcon /></IconButton>
                        <IconButton onClick={() => onSaveButtonClicked(id, document.getElementById(id + "_titleInput").value, document.getElementById(id + "_descriptionInput").value)}>
                            <SaveIcon />
                        </IconButton>
                    </ButtonGroup>
                </Box>
            </ListItem>
            :
            <ListItem sx={{ paddingTop: 0, paddingBottom: 2 }}>
                <Box boxShadow={1} sx={{ width: 1, padding: 1 }}>
                    <ListItemText primary={title} secondary={description} />
                    <ButtonGroup variant="text">
                        <IconButton onClick={onEditButtonClicked}><ModeEditIcon /></IconButton>
                        <IconButton onClick={onDeleteButtonClicked}><DeleteIcon /></IconButton>
                    </ButtonGroup>
                </Box>
            </ListItem>
    )
}