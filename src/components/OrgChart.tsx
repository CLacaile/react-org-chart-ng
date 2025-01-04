import Tree from "./Tree";
import { NodeData } from "../types/node";
import { useExpansionMap } from "../hooks/useExpansionMap";
import Organization from "./Organization";
import { useTreeDimensions } from "../hooks/useTreeDimensions";
import { ORG_MIN_HEIGHT, ORG_MIN_WIDTH, ORG_PADDING } from "../utils/constants";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { initializeExpansionMap } from "../utils/nodeUtils";

interface OrgChartProps {
  data: NodeData;
  x?: number;
  y?: number;
  scale?: number;
}

function OrgChart({ data, x = 0, y = 0, scale = 1 }: OrgChartProps) {
  const { expansionMap: nodesExpansionMap, toggleNodeExpansion } = useExpansionMap(initializeExpansionMap(data));
  const { treeWidth, treeHeight } = useTreeDimensions(data, nodesExpansionMap);
  const [showTree, setShowTree] = useState(false);
  const [orgDimensions, setOrgDimensions] = useState({
    width: ORG_MIN_WIDTH,
    height: ORG_MIN_HEIGHT,
  });

  const handleOrgClick = () => {
    setShowTree(!showTree);
  };

  useEffect(() => {
    if (showTree) {
      setOrgDimensions({
        width: treeWidth + ORG_PADDING,
        height: treeHeight + ORG_PADDING,
      });
    } else {
      setOrgDimensions({ width: ORG_MIN_WIDTH, height: ORG_MIN_HEIGHT });
    }
  }, [treeWidth, treeHeight, showTree]);

  return (
    <motion.g
      data-testid="org-chart"
      className="org-chart"
      initial={{ x: x + window.innerWidth / 2, y: y, scale: 0 }}
      animate={{ x: x + window.innerWidth / 2, y: y, scale }}
    >
      <Organization
        text={"Organisation A"}
        x={x - orgDimensions.width / 2}
        y={y - ORG_PADDING}
        width={orgDimensions.width}
        height={orgDimensions.height}
        onClick={handleOrgClick}
      />

      {/* Apparition de l'arbre au clic sur l'organisation */}
      <AnimatePresence>
        {showTree && (
          <motion.g
            id={`tree-expansion-group-${data.id}`}
            key={`tree-expansion-group-${data.id}`}
          >
            <Tree
              rootNodeX={x}
              rootNodeY={y}
              rootNode={data}
              nodesExpansionMap={nodesExpansionMap}
              toggleNodeExpansion={toggleNodeExpansion}
            />
          </motion.g>
        )}
      </AnimatePresence>
    </motion.g>
  );
}

export default OrgChart;
