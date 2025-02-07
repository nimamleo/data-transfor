import { ILimitation } from "../../../../../../../../common/pagination/limitation.interface";

export class GetJobListQueryable {
  limitation: ILimitation;
  title: string;
  city: string;
  minSalary: number;
  maxSalary: number;
}
