import { stylesheet } from "typestyle";

export default stylesheet({
  inactiveTodo: { textDecoration: "line-through" },
  filter: { margin: "0.5rem", cursor: "pointer" },
  activeFilter: { fontWeight: "bold" }
});
