import { Status } from "../../types.ts/types";

interface IInstitute {
  instituteName: string;
  instituteEmail: string;
  institutephoneNumber: string;
  instituteAddress: string;
}

export interface IInstituteInitialData {
  institute: IInstitute;
  status: Status;
}
