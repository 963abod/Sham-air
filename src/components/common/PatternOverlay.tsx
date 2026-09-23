import React from 'react';

export function PatternOverlay({ className = '', variant = 'mashrabiya' }: { className?: string; variant?: 'mashrabiya' | 'ablaq' | 'star' }) {
  if (variant === 'ablaq') {
    return (
      <div className={`absolute inset-0 bg-ablaq-subtle opacity-30 pointer-events-none ${className}`} />
    );
  }

  return (
    <div className={`absolute inset-0 opacity-10 pointer-events-none overflow-hidden ${className}`}>
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="mashrabiya-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
            <path
              d="M20 0 L40 20 L20 40 L0 20 Z M20 8 L32 20 L20 32 L8 20 Z"
              fill="none"
              stroke="#B79A63"
              strokeWidth="1"
              strokeOpacity="0.6"
            />
            <circle cx="20" cy="20" r="3" fill="#B79A63" fillOpacity="0.4" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#mashrabiya-pattern)" />
      </svg>
    </div>
  );
}
