import { GREY, LIGHTBLUE } from "../utils/palette";

function Avatar() {
  return (
    <svg
      role="img"
    >
      { /* Cercle de fond */}
      <circle cx="70" cy="35" r={30} style={{stroke: "none", fill: LIGHTBLUE}}/>
      { /* Tête */}
      <circle cx="70" cy="30" r={8} style={{stroke: GREY, fill: "none"}}/>
      { /* Corps */}
      <path d="M55 50 Q 70 35 85 50" style={{stroke: GREY, fill: "none"}}/>
    </svg>
  );
}

export default Avatar;
