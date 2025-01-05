import { DepartmentData } from "./department";

export interface OrganizationData {
    id: number,
    label: string,
    departmentsRootNode: DepartmentData,
}