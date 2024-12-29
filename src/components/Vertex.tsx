import * as CONSTANTS from '../utils/constants'

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
    const midY = destY  - CONSTANTS.treeLevelSpacing/2;
    return (
        <path
            id={`vertex-${originId}-${destId}`}
            data-testid={`vertex-${originId}-${destId}`}
            d={`M${originX},${originY} V${midY} H${midX} V${destY}`}
            fill="none"
            stroke={CONSTANTS.vertexStrokeColor}
            strokeWidth="1"
        />
    )
};

export default Vertex;