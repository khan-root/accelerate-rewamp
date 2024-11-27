import { Input } from '@material-tailwind/react'
import React from 'react'

const CustomInput = (props) => {
    const {labelType, name, onChange, placeholderTitle} = props
  return (
    <div className="w-full max-w-full min-w-full">
       <Input variant="standard" label={labelType} name={name} color='blue' onChange={onChange} placeholder={ placeholderTitle} />
    </div>
  )
}

export default CustomInput