import React from 'react';

const ZetpeakLogo: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Zetpeak Logo"
  >
    <circle cx="16" cy="16" r="16" fill="#6AF205" />
    <g style={{ filter: 'drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.25))' }}>
      <path
        d="M9.46875 9.125V12.0312H19.2188L9.46875 20.3438V23.25H22.5312V20.3438H12.7812L22.5312 12.0312V9.125H9.46875Z"
        fill="white"
      />
    </g>
  </svg>
);

export default ZetpeakLogo;
