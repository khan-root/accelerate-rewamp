import React from 'react'
import { FaCheck } from 'react-icons/fa6'
import { GoMilestone } from 'react-icons/go'
import { IoCalendarClearOutline } from 'react-icons/io5'
import { MdOutlineHistory } from 'react-icons/md'
import { RiUser3Fill } from 'react-icons/ri'
import { DMYT } from '../../services/__dateTimeServices'
import { GiRoundStar } from 'react-icons/gi'

const MilestonesList = (props) => {
    const { data , index} = props 
    const formattedMilestone = data?.milestone.replace(/\r\n\r\n/g, "<br /> <br />");

    
  return (
    <div className='py-5 px-2 border-dashed border-b  border-customGray-300 flex items-start gap-3 '>
        <div>
            <div className='flex items-center gap-2'>
                <span className='bg-[#1aafd0] text-[20px] h-8 w-8 flex items-center justify-center rounded-md text-white'><GoMilestone /></span>
                <span>#{index+1}</span>
            </div>
        </div>
        <div className='space-y-5 w-full'>
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                    {data?.rating && 
                        <div>
                            <StarRating rating={data?.rating ? data?.rating : 0} maxStars={5} />
                        </div>
                    }
                    {data.status === "Picked" ? 
                        <div className='flex items-center gap-1 text-customGreen-100'>
                            <span><FaCheck /></span>
                            <span>{data.status}</span>
                        </div>
                    :
                    data.status === "Pending" ? 
                        <div className='flex items-center gap-1 text-customOrange-100'>
                            <span><MdOutlineHistory /></span>
                            <span>{data.status}</span>
                        </div>
                    :
                    
                    <div className='flex items-center gap-1 text-customGreen-100'>
                        <span><FaCheck /></span>
                        <span>{data.status}</span>
                    </div>
                
                    }
                    <div>
                        <span
                            className={`rounded-full px-8 py-1 text-white text-[12px] w-[80%] flex justify-center
                            ${data?.milestone_priority === "0"
                                ? "bg-customGreen-200"
                                : data?.milestone_priority === "1"
                                ? "bg-customOrange-100"
                                : data?.milestone_priority === "2"
                                ? "bg-customRed-100"
                                : ""
                            }`}
                        >
                            {data?.milestone_priority === "0"
                            ? "Low"
                            : data?.milestone_priority === "1"
                            ? "Medium"
                            : data?.milestone_priority === "2"
                            ? "High"
                            : ""}
                        </span>
                    </div>
                    
                </div>
                <div>
                    <button className='border border-customGray-300 py-1  px-8 rounded-full text-[12px]'>
                        pick
                    </button>
                </div>
            </div>
            <div>
                <span
                    dangerouslySetInnerHTML={{ __html: formattedMilestone }}
                    className="text-gray-800"
                ></span>
            </div>
            
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                    <div className='flex items-center gap-1'>
                        <span className='text-[#1aafd0]'><RiUser3Fill /></span>
                        <span>Assinged To :</span>
                    </div>
                    <span>{data?.completed_by === "" ? 'None' : data?.completed_by}</span>
                </div>
                <div className='flex items-center gap-2'>
                    <div className='flex items-center gap-1'>
                        <span className='text-[#1aafd0]'><IoCalendarClearOutline /></span>
                        <span>Deadline :</span>
                    </div>
                    <div>
                        {data?.deadline === "0" ? 
                            <span>No deadline assigned!</span>
                        :
                            <span>{data?.deadline && DMYT(data?.deadline)}</span>
                        }
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default MilestonesList





const StarRating = ({ rating, maxStars = 5 }) => {
  const filledStars = Math.floor(rating); // Full stars count
  const partialStar = rating % 1; // Fractional part for the partially filled star
  const emptyStars = maxStars - Math.ceil(rating); // Remaining empty stars

  return (
    <div className="flex space-x-1">
      {/* Render full stars */}
      {[...Array(filledStars)].map((_, index) => (
        <span key={`filled-${index}`} className="text-[#ffc107]">
          <GiRoundStar />
        </span>
      ))}

      {/* Render partial star */}
      {partialStar > 0 && (
        <span className="relative text-gray-300">
          <span className="absolute inset-0 overflow-hidden text-[#ffc107]" style={{ width: `${partialStar * 100}%` }}>
            <GiRoundStar />
          </span>
          <span>
            <GiRoundStar />
          </span>
        </span>
      )}

      {/* Render empty stars */}
      {[...Array(emptyStars)].map((_, index) => (
        <span key={`empty-${index}`} className="text-gray-300">
          <GiRoundStar />
        </span>
      ))}
    </div>
  );
};

