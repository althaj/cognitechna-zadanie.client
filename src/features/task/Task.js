export function Task({ id, title, description, isEditing, onEditButtonClicked, onDeleteButtonClicked, onSaveButtonClicked }) {
    return (
        isEditing ?
            <li>
                <input id={ id + "_titleInput" } defaultValue={title} />
                <br />
                <input id={ id + "_descriptionInput" } defaultValue={description} />
                <br />
                <button onClick={onEditButtonClicked}>📝</button>
                <button onClick={() => onSaveButtonClicked(id, document.getElementById(id + "_titleInput").value, document.getElementById(id + "_descriptionInput").value)}>💾</button>
            </li>
            :
            <li>
                <strong>{title}</strong>
                <br />
                <small>{description}</small>
                <br />
                <button onClick={onEditButtonClicked}>📝</button>
                <button onClick={onDeleteButtonClicked}>❌</button>
            </li>
    )
}