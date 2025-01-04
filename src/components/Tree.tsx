import Person from "./Person";
import { PersonData } from "../types/person";
import { useChildPositions } from "../hooks/useChildPositions";
import Vertex from "./Vertex";
import { usePersonTreeWidth } from "../hooks/usePersonSubtreeWidth";
import { AnimatePresence, motion } from "framer-motion";
import { PERSON_HEIGHT } from "../utils/constants";

interface TreeProps {
  rootNode: PersonData;
  rootNodeX: number;
  rootNodeY: number;
  finalX?: number;
  finalY?: number;
  nodesExpansionMap: Map<number, boolean>;
  toggleNodeExpansion: (nodeId: number) => void;
}

function Tree({
  rootNode,
  rootNodeX,
  rootNodeY,
  finalX = rootNodeX,
  finalY = rootNodeY,
  nodesExpansionMap,
  toggleNodeExpansion,
}: TreeProps) {
  console.log("Rendering Tree", rootNode);
  const isExpanded = nodesExpansionMap.get(rootNode.id);
  const subtreeWidth = usePersonTreeWidth(rootNode, nodesExpansionMap);
  const childPositions = useChildPositions(
    rootNode,
    rootNodeX,
    rootNodeY,
    subtreeWidth,
    nodesExpansionMap
  );

  return (
    <AnimatePresence>
      <motion.g 
        id={`tree-${rootNode.id}`}
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
              <Tree
                rootNode={child}
                rootNodeX={0}
                rootNodeY={0}
                finalX={rootNodeX + childX}
                finalY={rootNodeY + childY}
                nodesExpansionMap={nodesExpansionMap}
                toggleNodeExpansion={toggleNodeExpansion}
              />
            </motion.g>
          ))}
      </motion.g>
    </AnimatePresence>
    
  );
}

export default Tree;
