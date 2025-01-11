import Person from "./Person";
import { PersonData } from "../types/person";
import { useTeamMembersPositions } from "../hooks/useTeamMembersPositions";
import Vertex from "./Vertex";
import { useTeamWidth } from "../hooks/useTeamWidth";
import { AnimatePresence, motion } from "framer-motion";
import { PERSON_HEIGHT } from "../utils/constants";

interface TeamProps {
  rootNode: PersonData;
  rootNodeX: number;
  rootNodeY: number;
  expansionMap: Map<number, boolean>;
  toggleNodeExpansion: (nodeId: number) => void;
}

function Team({
  rootNode,
  rootNodeX,
  rootNodeY,
  expansionMap,
  toggleNodeExpansion,
}: TeamProps) {
  console.log("Rendering Team", rootNode);
  const isExpanded = expansionMap.get(rootNode.id);
  const subtreeWidth = useTeamWidth(rootNode, expansionMap);
  const childPositions = useTeamMembersPositions(
    rootNode,
    rootNodeX,
    rootNodeY,
    subtreeWidth,
    expansionMap
  );

  return (
    <AnimatePresence>
      <motion.g 
        id={`team-${rootNode.id}`}
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }}
      >
        {/* Dessiner le nœud parent */}
        <Person
          data={rootNode}
          x={rootNodeX}
          y={rootNodeY}
          onClick={() => toggleNodeExpansion(rootNode.id)}
        />

        {/* Dessiner les liens et les sous-arbres */}
        {isExpanded &&
          childPositions.map(({ child, x: childX, y: childY }, index) => (
            <motion.g id={`subteam-${rootNode.id}-${index}`} key={`subteam-${rootNode.id}-${index}`}>
              <Vertex
                originId={rootNode.id}
                originX={rootNodeX}
                originY={rootNodeY + PERSON_HEIGHT}
                destId={child.id}
                destX={childX}
                destY={childY}
              />
              <Team
                rootNode={child}
                rootNodeX={childX}
                rootNodeY={childY}
                expansionMap={expansionMap}
                toggleNodeExpansion={toggleNodeExpansion}
              />
            </motion.g>
          ))}
      </motion.g>
    </AnimatePresence>
    
  );
}

export default Team;
