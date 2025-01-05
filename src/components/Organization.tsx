import { DepartmentData } from "../types/department";
import Department from "./Department";
import { motion } from "framer-motion";

interface OrganizationProps {
  departmentsRootNode: DepartmentData;
  x?: number;
  y?: number;
}

function Organization({ departmentsRootNode, x = 0, y = 0 }: OrganizationProps) {
  console.log("Rendering Organization")
  return (
    <motion.g
      initial={{ x, y, opacity: 1 }} // Position initiale et invisible
      animate={{ x, y, opacity: 1 }} // Position finale et visible
    >
      <Department data={departmentsRootNode} />

      {departmentsRootNode.children.map(( subteam, index ) => (
        <g id={`subdept-${subteam.id}-${index}`} key={index}>
            <Organization departmentsRootNode={subteam} x={x + (250 * (index+1))}/>
        </g>
      ))}
    </motion.g>
  );
}

export default Organization;
