import React from 'react';
import { motion } from 'framer-motion';

function SideBarButton({ handelSideBar, isSidebarActive, isDarkTheme }) {

  // Determine the stroke color based on the theme
  const strokeColor = isDarkTheme ? '#ffffff' : '#000000';

  return (
    <motion.button className='bg-transparent p-3' onClick={handelSideBar}>
      <motion.svg
        viewBox="0 0 512 512"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        width={'1.5rem'}
        height={'1.5rem'}
        animate={{ rotate: isSidebarActive ? 90 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <g id="icon">
          <motion.line
            x1="26.7"
            x2="486.25"
            y1="30.24"
            y2="30.24"
            stroke={strokeColor}
            strokeWidth="50.4167"
            strokeLinecap="round"
            strokeLinejoin="round"
            animate={{
              rotate: isSidebarActive ? 45 : 0,
              opacity: isSidebarActive ? 0 : 1,
            }}
            transition={{ duration: 0.3 }}
          />
          <motion.line
            x1="26.7"
            x2="486.25"
            y1="181.044"
            y2="181.044"
            stroke={strokeColor}
            strokeWidth="50.4167"
            strokeLinecap="round"
            strokeLinejoin="round"
            animate={{
              opacity: isSidebarActive ? 1 : 1,
            }}
            transition={{ duration: 0.3 }}
          />
          <motion.line
            x1="26.7"
            x2="486.25"
            y1="331.848"
            y2="331.848"
            stroke={strokeColor}
            strokeWidth="50.4167"
            strokeLinecap="round"
            strokeLinejoin="round"
            animate={{
              opacity: isSidebarActive ? 1 : 1,
            }}
            transition={{ duration: 0.3 }}
          />
          <motion.line
            x1="26.7"
            x2="486.25"
            y1="482.714"
            y2="482.714"
            stroke={strokeColor}
            strokeWidth="50.4167"
            strokeLinecap="round"
            strokeLinejoin="round"
            animate={{
              rotate: isSidebarActive ? -45 : 0,
              opacity: isSidebarActive ? 0 : 1,
            }}
            transition={{ duration: 0.3 }}
          />
        </g>
      </motion.svg>
    </motion.button>
  );
}

export default SideBarButton;
