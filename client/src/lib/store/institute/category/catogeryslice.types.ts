import { Status } from "@/src/lib/types.ts/types";

export interface ICategoryAddData {
  categoryName: string;
  categoryDescription: string;
}

export interface ICategoryData extends ICategoryAddData {
  id: string;
  createdAt: string;
}

export interface ICategoryInitialData {
  data: ICategoryData[];
  status: Status;
}
