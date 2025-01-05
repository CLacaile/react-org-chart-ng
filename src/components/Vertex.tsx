import { motion } from 'framer-motion';
import { TEAM_LEVEL_SPACING, VERTEX_STROKE_COLOR } from '../utils/constants';

interface VertexProps {
    originId: number,
    originX: number,
    originY: number,
    destId: number,
    destX: number,
    destY: number
}

function Vertex({ originId, originX, originY, destId, destX, destY }: VertexProps) {
    const midX = destX;
    const midY = destY  - TEAM_LEVEL_SPACING/2;
    return (
        <motion.path
            id={`vertex-${originId}-${destId}`}
            data-testid={`vertex-${originId}-${destId}`}
            d={`M${originX},${originY} V${midY} H${midX} V${destY}`}
            fill="none"
            stroke={VERTEX_STROKE_COLOR}
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            exit={{ pathLength: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
        />
    )
};

export default Vertex;