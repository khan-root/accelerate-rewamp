import { Button } from '@material-tailwind/react'
import React from 'react'

const CustomButton = (props) => {
    const {title, loading, onClick, type="button", icon=""} = props
  return (
    <Button className='bg-customBlue-100 capitalize py-2 px-4 font-medium text-[12px] flex items-center gap-2' loading={loading} onClick={onClick} type={type}>
        {icon ? icon :""}
      {title}
    </Button>
  )
}

export default CustomButton