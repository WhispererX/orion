import React from 'react'

export default function IconButton({ icon, title, onClick, className = '', ...props }) {
  return (
    <button
      title={title}
      onClick={onClick}
      className={`icon-button ${className}`}
      {...props}
    >
      {icon}
    </button>
  );
}
