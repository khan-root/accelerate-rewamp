import { Button } from '@material-tailwind/react'
import React from 'react'

const CustomButton = (props) => {
    const {title, loading, onClick, type="button"} = props
  return (
    <Button className='bg-customBlue-100 capitalize py-2 px-4 font-medium text-[12px]' loading={loading} onClick={onClick} type={type}>{title}</Button>
  )
}

export default CustomButton