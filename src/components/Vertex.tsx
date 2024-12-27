import * as CONSTANTS from '../utils/constants'

interface VertexProps {
    x: number,
    y: number,
    childX: number,
    childY: number
}

function Vertex({ x, y, childX, childY }: VertexProps) {
    return (
        <line
            x1={x}
            y1={y + CONSTANTS.nodeHeight}
            x2={childX}
            y2={childY}
            stroke={CONSTANTS.vertexStrokeColor}
            strokeWidth="1"
          />
    )
};

export default Vertex;