import { Table } from "react-bootstrap";
import TabularBody from "./TabularBody";
import TabularHead from "./TabularHead";

const TabularView = (props) => (
  <>
    <Table  bordered hover  size="xl">
      <TabularHead
        columns={props.columns}
        checked={props.selected.length === props.data.length ? true : false}
        onSelect={props.onAllSelect}
      />

      <TabularBody
        columns={props.columns}
        data={props.data}
        onSelect={props.onSelect}
        selected={props.selected}
        delete={props.delete}
      />
    </Table>
  </>
);

export default TabularView;
