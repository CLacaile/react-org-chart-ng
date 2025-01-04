import React from "react";
import SoftShadow from "./filters/SoftShadow";

function RootSvg({ children }: { children: React.ReactNode }) {
  return (
    <svg
      className="app-root-svg"
      width="100%"
      height="100%"
      style={{ overflow: "hidden" }}
    >
      { /* Définition des fonts ici */}
      <defs id="fonts">
        <style>
          @import
          url('https://fonts.googleapis.com/css2?family=Gabarito:wght@400..900&display=swap');
        </style>
      </defs>

      { /* Définition des filtres ici */}
      <defs id="filters">
        <SoftShadow />
      </defs>
      
      {children}
    </svg>
  );
}

export default RootSvg;
