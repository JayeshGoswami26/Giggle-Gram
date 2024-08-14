import React from 'react'

function Container({children,className}) {
  return <div className={`w-full rounded-[1.75rem] text-white dark:text-white ${className}`}>{children}</div>;
  
}

export default Container