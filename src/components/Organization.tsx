import { LIGHTBLUE } from "../utils/palette";
import { organizationPadding } from "../utils/constants";

interface OrganizationProps {
  width: number;
  height: number;
  minWidth?: number;
}

function Organization({ width, height, minWidth = width }: OrganizationProps) {
  return (
    <rect
      width={width < minWidth ? minWidth : width}
      height={height}
      rx="5"
      fill={LIGHTBLUE}
      transform={`translate(${-width / 2}, ${-organizationPadding})`}
    />
  );
}

export default Organization;
