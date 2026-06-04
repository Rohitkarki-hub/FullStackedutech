import { Status } from "../../types.ts/types";

export interface IInstitute {
  instituteAddress: string;
  instituteName: string;
  instituteEmail: string;
  institutePhone: string;
  institutePanNumber?: string;
  instituteVatNumber?: string;
}

export interface IInstituteInitialData {
  institute: IInstitute;
  status: Status;
}
