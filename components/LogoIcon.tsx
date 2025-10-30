import React from 'react';

const LogoIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    className={className}
    viewBox="0 0 100 100" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#d946ef" /> 
        <stop offset="100%" stopColor="#3b82f6" />
      </linearGradient>
    </defs>
    <path 
      d="M60.6,5.3c11.3,0,21.9,4.4,29.8,12.3s12.3,18.5,12.3,29.8c0,11.3-4.4,21.9-12.3,29.8S71.9,94.7,60.6,94.7c-11.3,0-21.9-4.4-29.8-12.3S5.3,63.8,5.3,52.5c0-11.3,4.4-21.9,12.3-29.8S36.2,5.3,47.5,5.3C51.8,5.3,56.2,5.3,60.6,5.3z"
      transform="translate(-2 -2) scale(1.04)"
      fill="url(#logoGradient)" 
    />
    <path 
      d="M47.5,14.7c-9.6,0-18.4,3.7-25.1,10.4S12,43.6,12,53.2c0,9.6,3.7,18.4,10.4,25.1s15.5,10.4,25.1,10.4c9.6,0,18.4-3.7,25.1-10.4S88,62.8,88,53.2c0-9.6-3.7-18.4-10.4-25.1S57.1,14.7,47.5,14.7z"
      fill="white"
      className="dark:fill-slate-950"
      transform="translate(-2 -2) scale(1.04)"
    />
  </svg>
);

export default LogoIcon;
