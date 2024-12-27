import * as CONSTANTS from '../utils/constants'

interface VertexProps {
    x: number,
    y: number,
    childX: number,
    childY: number
}

function Vertex({ x, y, childX, childY }: VertexProps) {
    const midX = childX;
    const midY = childY  - CONSTANTS.treeLevelSpacing/2;
    return (
        <path
            d={`M${x},${y} V${midY} H${midX} V${childY}`}
            fill="none"
            stroke={CONSTANTS.vertexStrokeColor}
            strokeWidth="1"
        />
    )
};

export default Vertex;