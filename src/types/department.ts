import { PersonData } from "./person";

export interface DepartmentData {
    id: number;
    text: string;
    tree: PersonData;
}