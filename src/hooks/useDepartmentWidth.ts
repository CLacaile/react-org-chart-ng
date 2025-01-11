import { useMemo } from "react";
import { DepartmentData } from "../types/department";
import { DEPT_MIN_WIDTH, DEPT_SIBLING_SPACING } from "../utils/constants";
import { getSubDepartmentsWidth } from "../utils/departmentUtils";

export function useDepartmentWidth(rootNode: DepartmentData) {
    return useMemo(() => getSubDepartmentsWidth(rootNode, DEPT_MIN_WIDTH, DEPT_SIBLING_SPACING), [rootNode])
}