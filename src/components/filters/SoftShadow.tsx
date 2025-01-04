function SoftShadow() {
  return (
    <filter id="softShadow" height="150%">
      {/* Flou de l'ombre */}
      <feGaussianBlur in="SourceAlpha" stdDeviation="4" />

      {/* Décalage de l'ombre */}
      <feOffset dx="4" dy="4" result="offsetblur" />

      {/* Transparence de l'ombre */}
      <feComponentTransfer>
        <feFuncA type="linear" slope="0.10" />
      </feComponentTransfer>

      {/* Fusion de l'ombre avec la source */}
      <feMerge>
        <feMergeNode />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  );
}

export default SoftShadow;
