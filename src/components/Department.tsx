import Team from "./Team";
import { useTeamMembersExpansionMap } from "../hooks/useTeamMembersExpansionMap";
import DepartmentContainer from "./DepartmentContainer";
import { useTeamDimensions } from "../hooks/useTeamDimensions";
import { DEPT_MIN_HEIGHT, DEPT_MIN_WIDTH, DEPT_PADDING } from "../utils/constants";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { initTeamMembersExpansionMap } from "../utils/teamUtils";
import { DepartmentData } from "../types/department";

interface DepartmentProps {
  data: DepartmentData;
  x?: number;
  y?: number;
  scale?: number;
}

function Department({ data, x = 0, y = 0, scale = 1 }: DepartmentProps) {
  const { teamMembersExpansionMap, toggleTeamMemberExpansion } = useTeamMembersExpansionMap(initTeamMembersExpansionMap(data.teamRootNode));
  const { teamWidth: teamWidth, teamHeight: teamHeight } = useTeamDimensions(data.teamRootNode, teamMembersExpansionMap);
  const [ showTeam, setShowTeam ] = useState(false);
  const [ deptDimensions, setDeptDimensions ] = useState({
    width: DEPT_MIN_WIDTH,
    height: DEPT_MIN_HEIGHT,
  });

  const handleDepartmentContainerClick = () => {
    setShowTeam(!showTeam);
  };

  useEffect(() => {
    if (showTeam) {
      setDeptDimensions({
        width: teamWidth + DEPT_PADDING,
        height: teamHeight + DEPT_PADDING,
      });
    } else {
      setDeptDimensions({ width: DEPT_MIN_WIDTH, height: DEPT_MIN_HEIGHT });
    }
  }, [teamWidth, teamHeight, showTeam]);

  return (
    <motion.g
      id={`dept-${data.id}`}
      data-testid={`dept-${data.id}`}
      className="department"
      initial={{ scale: 0 }}
      animate={{ scale }}
    >
      <DepartmentContainer
        text={`${data.text} (${x}, ${y})`}
        x={x - deptDimensions.width / 2}
        y={y - DEPT_PADDING}
        width={deptDimensions.width}
        height={deptDimensions.height}
        onClick={handleDepartmentContainerClick}
      />

      {/* Apparition de l'équipe au clic sur le département */}
      <AnimatePresence>
        {showTeam && (
          <motion.g
            id={`team-expansion-group-${data.id}`}
            key={`team-expansion-group-${data.id}`}
          >
            <Team
              rootNodeX={x}
              rootNodeY={y}
              rootNode={data.teamRootNode}
              expansionMap={teamMembersExpansionMap}
              toggleNodeExpansion={toggleTeamMemberExpansion}
            />
          </motion.g>
        )}
      </AnimatePresence>
    </motion.g>
  );
}

export default Department;
