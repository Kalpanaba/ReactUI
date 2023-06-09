import TableRow from "./TabularRow";

const TabularBody = (props) => {
  return (
    <tbody>
      {props.data.map((el, idx) => (
        <TableRow
          columns={props.columns}
          key={idx}
          checked={props.selected.indexOf(el.id) >= 0 ? true : false}
          delete={props.delete}
          onSelect={props.onSelect}
          el={el}
        />
      ))}
    </tbody>
  );
};

export default TabularBody;
