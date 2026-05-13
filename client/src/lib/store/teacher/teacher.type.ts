import { Status } from "../../types.ts/types";

interface ITeacher {
  teacherName: string;
  teacherEmail: string;
  teacherPhoneNumber: string;
}

export interface ITeacherInitialData {
  teacher: ITeacher;
  status: Status;
}
