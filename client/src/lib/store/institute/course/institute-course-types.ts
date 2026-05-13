import { Status } from "@/src/lib/types.ts/types";

interface IInstituteCourse {
  courseName: string;
  courseDescription: string;
  courseDuration: number;
  coursePrice: number;
  id: string;
}

export interface IInstituteCourseInitialData {
  course: IInstituteCourse[];
  status: Status;
}
