import Team from "./Team";
import { usePersonExpansionMap } from "../hooks/usePersonExpansionMap";
import DepartmentContainer from "./DepartmentContainer";
import { useTreeDimensions } from "../hooks/useTreeDimensions";
import { DEPT_MIN_HEIGHT, DEPT_MIN_WIDTH, DEPT_PADDING } from "../utils/constants";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { initializeExpansionMap } from "../utils/nodeUtils";
import { DepartmentData } from "../types/department";

interface DepartmentProps {
  data: DepartmentData;
  x?: number;
  y?: number;
  scale?: number;
}

function Department({ data, x = 0, y = 0, scale = 1 }: DepartmentProps) {
  const { personExpansionMap, togglePersonExpansion } = usePersonExpansionMap(initializeExpansionMap(data.tree));
  const { treeWidth, treeHeight } = useTreeDimensions(data.tree, personExpansionMap);
  const [showTree, setShowTree] = useState(false);
  const [orgDimensions, setOrgDimensions] = useState({
    width: DEPT_MIN_WIDTH,
    height: DEPT_MIN_HEIGHT,
  });

  const handleOrgClick = () => {
    setShowTree(!showTree);
  };

  useEffect(() => {
    if (showTree) {
      setOrgDimensions({
        width: treeWidth + DEPT_PADDING,
        height: treeHeight + DEPT_PADDING,
      });
    } else {
      setOrgDimensions({ width: DEPT_MIN_WIDTH, height: DEPT_MIN_HEIGHT });
    }
  }, [treeWidth, treeHeight, showTree]);

  return (
    <motion.g
      id={`dept-${data.id}`}
      data-testid={`dept-${data.id}`}
      className="department"
      initial={{ x: x + window.innerWidth / 2, y: y, scale: 0 }}
      animate={{ x: x + window.innerWidth / 2, y: y, scale }}
    >
      <DepartmentContainer
        text={data.text}
        x={x - orgDimensions.width / 2}
        y={y - DEPT_PADDING}
        width={orgDimensions.width}
        height={orgDimensions.height}
        onClick={handleOrgClick}
      />

      {/* Apparition de l'équipe au clic sur le département */}
      <AnimatePresence>
        {showTree && (
          <motion.g
            id={`tree-expansion-group-${data.id}`}
            key={`tree-expansion-group-${data.id}`}
          >
            <Team
              rootNodeX={x}
              rootNodeY={y}
              rootNode={data.tree}
              expansionMap={personExpansionMap}
              toggleNodeExpansion={togglePersonExpansion}
            />
          </motion.g>
        )}
      </AnimatePresence>
    </motion.g>
  );
}

export default Department;
