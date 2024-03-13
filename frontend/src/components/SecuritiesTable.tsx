import { ISecurityRecord } from "../types/security";

interface IProps {
  securities: ISecurityRecord[] | undefined;
}

export default function SecuritiesTable(securities: IProps) {
  return <div>SecuritiesTable</div>;
}
