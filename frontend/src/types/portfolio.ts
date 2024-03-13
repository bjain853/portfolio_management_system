import { ISecurityRecord } from "./security";

export interface Portfolio {
  clientId: string;
  id: string;
  enrollmentDate: Date;
  securities: ISecurityRecord[];
}
