import { Status } from "@/src/lib/types.ts/types";

export enum teacherExpertise {
  beginner = "beginner",
  intermediate = "intermediate",
  expert = "expert",
}

interface IInstituteCourse {
  courseName: string;
  courseDescription: string;
  courseDuration: number;
  coursePrice: number;
}
export interface IInstituteTeacherData {
  teacherName: string;
  teacherEmail: string;
  teacherPhoneNumber: string;
  teacherExpertise: teacherExpertise | null;
  teacherSalary: number;
  teacherJoinDate: string;
  teacherImage: string;
}

interface IInstituteTeacherDataWithCourse extends IInstituteTeacherData {
  course: IInstituteCourse;
}

export interface IInstituteTeacherInitialData {
  teacher: IInstituteTeacherDataWithCourse;
  status: Status;
}
