import { Drawer, IconButton, Typography } from '@material-tailwind/react';
import React from 'react'
import ReactDOM from 'react-dom'

const CustomDrawer = (props) => {
  const { open, closeDrawer, compo, direction = "right", title, widthSize = 900,} = props;

  return ReactDOM.createPortal(
    <Drawer 
      open={open} 
      onClose={closeDrawer}
      className="px-4 py-2 customDrwerScroll h-full overflow-auto font-poppins"
      placement={direction}
      size={widthSize}
      style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
    >
      <div className="mb-2 flex items-center justify-between">
       
          <Typography variant="h5" color="blue-gray">
            {title}
          </Typography>
        <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </IconButton>
      </div>
      <div>
        {compo}
      </div>
    </Drawer>,
    document.body // This specifies that the drawer should be rendered as a child of the <body> element.
  );
}

export default CustomDrawer