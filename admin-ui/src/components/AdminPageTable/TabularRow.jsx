import { useState } from "react";
import "./Admin.css";

const TableRow = (props) => {
  const [editable, setEditable] = useState(false);

  const handleDelete = (id) => {
    if (!editable) {
      props.delete(id);
    }
  };
  const handleToggle = (id) => {
    props.onSelect(id);
  };

  const handleEdit = () => {
    setEditable(true);
  };
  const handleSave = () => {
    setEditable(false);
    
  };
  return (
    <tr id={props.el.id} className={props.checked ? "selected" : "unselected"}>
      {/* Checkbox */}
      <td id="checkbox">
        <input
          type="checkbox"
          checked={props.checked}
          onChange={() => {
            handleToggle(props.el.id);
          }}
          value={props.el.id}
        />
      </td>

      {/* All other columns */}
      {props.columns.map((columnName) => (
        <td
          id={`${columnName}-${props.el.id}`}
          className={columnName}
          contentEditable={editable}
        >
          {props.el[columnName]}
        </td>
      ))}
      
      <td id="actions">
        {/* conditanlly render save button */}
        {editable ? (
          <button onClick={handleSave}>
         <i className="fas fa-save"></i>
          </button>
        ) : null}
        {/* disable the edit button when editing */}
        <button disabled={editable} onClick={handleEdit}>
         <i className="fas fa-edit"></i>
        </button>
        {/* It disables the delete button while editing */}
        <button
          disabled={editable}
          onClick={(e) => {
            handleDelete(props.el.id);
          }}
        >
        <i  className="fas fa-trash-alt"></i>
        </button>
      </td>
    </tr>
  );
};

export default TableRow;
 