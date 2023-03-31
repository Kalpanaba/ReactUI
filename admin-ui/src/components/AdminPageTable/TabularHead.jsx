import "./Admin.css";

const TabularHead = (props) => {
  const selectAll = () => {
    props.onSelect();
  };

  return (
    <thead className="head">
      <tr>
        <th key="select-all-checkbox">
          <input onChange={selectAll} checked={props.checked} type="checkbox" />
        </th>

        {props.columns.map((el, idx) => (
          <th key={idx}>{el}</th>
        ))}

        <th>Actions</th>
      </tr>
    </thead>
  );
};
export default TabularHead;
