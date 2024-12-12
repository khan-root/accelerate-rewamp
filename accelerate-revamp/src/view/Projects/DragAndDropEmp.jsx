import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { motion } from "framer-motion";
import { FaXmark } from "react-icons/fa6";

const DragAndDropEmp = (props) => {
    const { handleDragEnd, addTaskValue,removeFromTeamMemberSelect } = props



  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-4 gap-4">
        {["responsible", "accountable", "consultant", "informed"].map((category) => (
          <Droppable key={category} droppableId={category}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="border border-customGray-400 p-2 min-h-[100px]"
              >
                <span className="text-[12px] capitalize">{category}</span>
                <div className="flex items-center gap-3 flex-wrap">
                  {addTaskValue[category].map((ele, index) => (
                    <Draggable key={ele.id} draggableId={ele.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="flex flex-col items-center gap-1 bg-customBlue-100 rounded-lg px-1 py-1"
                        >
                          <div className="flex items-center justify-center gap-3">
                            <span className="text-white text-[11px]">{ele.name}</span>
                            <motion.span
                              whileHover={{ scale: 1.2 }}
                              className="p-2  bg-white text-customRed-100 text-[11px] rounded-full cursor-pointer"
                              onClick={() =>removeFromTeamMemberSelect(ele.id, category)}
                            >
                              <FaXmark />
                            </motion.span>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default DragAndDropEmp;
