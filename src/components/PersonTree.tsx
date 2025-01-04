import Person from "./Person";
import { PersonData } from "../types/person";
import { useChildPositions } from "../hooks/useChildPositions";
import Vertex from "./Vertex";
import { usePersonTreeWidth } from "../hooks/usePersonSubtreeWidth";
import { AnimatePresence, motion } from "framer-motion";
import { PERSON_HEIGHT } from "../utils/constants";

interface PersonTreeProps {
  rootNode: PersonData;
  rootNodeX: number;
  rootNodeY: number;
  finalX?: number;
  finalY?: number;
  expansionMap: Map<number, boolean>;
  toggleNodeExpansion: (nodeId: number) => void;
}

function PersonTree({
  rootNode,
  rootNodeX,
  rootNodeY,
  finalX = rootNodeX,
  finalY = rootNodeY,
  expansionMap,
  toggleNodeExpansion,
}: PersonTreeProps) {
  console.log("Rendering Person Tree", rootNode);
  const isExpanded = expansionMap.get(rootNode.id);
  const subtreeWidth = usePersonTreeWidth(rootNode, expansionMap);
  const childPositions = useChildPositions(
    rootNode,
    rootNodeX,
    rootNodeY,
    subtreeWidth,
    expansionMap
  );

  return (
    <AnimatePresence>
      <motion.g 
        id={`person-tree-${rootNode.id}`}
        initial={{ x: rootNodeX, y: rootNodeY, opacity: 0 }} // Position initiale et invisible
        animate={{ x: finalX, y: finalY, opacity: 1 }} // Position finale et visible
        exit={{ x: rootNodeX, y: rootNodeY, opacity: 0 }} // Retourne à la position initiale et disparaît
        transition={{ type: "spring", stiffness: 200, damping: 18 }}
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
            <motion.g id={`subtree-${rootNode.id}-${index}`} key={`subtree-${rootNode.id}-${index}`}>
              <Vertex
                originId={rootNode.id}
                originX={rootNodeX}
                originY={rootNodeY + PERSON_HEIGHT}
                destId={child.id}
                destX={childX}
                destY={childY}
              />
              <PersonTree
                rootNode={child}
                rootNodeX={0}
                rootNodeY={0}
                finalX={rootNodeX + childX}
                finalY={rootNodeY + childY}
                expansionMap={expansionMap}
                toggleNodeExpansion={toggleNodeExpansion}
              />
            </motion.g>
          ))}
      </motion.g>
    </AnimatePresence>
    
  );
}

export default PersonTree;
