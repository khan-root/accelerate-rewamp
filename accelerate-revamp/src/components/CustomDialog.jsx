
import {  Dialog, DialogBody,  DialogHeader } from '@material-tailwind/react'
import React from 'react'
import { IoClose } from "react-icons/io5";

const CustomDialog = (props) => {
  const { openDialog , handleOpen, title, compo, size, outsidePress=true} = props
  return (
    <Dialog open={openDialog} handler={handleOpen} size={size} dismiss={{ outsidePress: outsidePress }} className='relative z-100'>
        <DialogHeader className='justify-between'>
          <div className='flex flex-1 items-center justify-center'>
          {title}
          </div>
          <div>
          <IoClose onClick={handleOpen} className='cursor-pointer'/>
          </div>
          </DialogHeader>
          <hr />
        <DialogBody className={`customScroll overflow-y-auto ${compo ? 'max-h-[calc(100vh-200px)]' : 'min-h-[auto]'}`}>
          {compo}
        </DialogBody>
    </Dialog>
  )
}

export default CustomDialog