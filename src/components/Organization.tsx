import { useDepartmentsPositions } from "../hooks/useDepartmentsPositions";
import { useDepartmentWidth } from "../hooks/useDepartmentWidth";
import { DepartmentData } from "../types/department";
import Department from "./Department";
import { motion } from "framer-motion";

interface OrganizationProps {
  rootNode: DepartmentData;
  x?: number;
  y?: number;
}

function Organization({ rootNode, x = 0, y = 0 }: OrganizationProps) {
  console.log("Rendering Organization")
  const parentSubtreeWidth = useDepartmentWidth(rootNode);
  const departmentsPositions = useDepartmentsPositions(rootNode, x, y, parentSubtreeWidth);

  return (
    <motion.g
      initial={{ opacity: 0 }} // Position initiale et invisible
      animate={{ opacity: 1 }} // Position finale et visible
    >
      <Department data={rootNode} x={x} y={y}/>

      {departmentsPositions.map(( { child: subdept, x: subdeptX, y: subdeptY }, index ) => (
        <g id={`subdept-${subdept.id}-${index}`} key={index}>
            <Organization rootNode={subdept} x={subdeptX} y={subdeptY}/>
        </g>
      ))}
    </motion.g>
  );
}

export default Organization;
