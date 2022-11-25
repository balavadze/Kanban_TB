import styled from 'styled-components';
import Task from './Task';
import { Droppable, Draggable } from 'react-beautiful-dnd';
const Container = styled.div`
  margin: 1rem;
  border: 1px solid lightgrey;
  border-radius: 5px;
  width: 250px;
  display: flex;
  flex-direction: column;
  background-color: white;
`;
const Title = styled.h3`
  padding: 0 1rem;
  margin: 1rem 0;
`;
const TaskList = styled.div`
  padding: 1rem;
  background-color: ${(props) =>
    props.isDraggingOver ? '#F3CF51' : 'inherit'};
  min-height: 100px;
`;

function Column(props) {
  console.log(props.column.columnId);
  return (
    <Draggable draggableId={props.column.columnId} index={props.index}>
      {(provided) => (
        <Container ref={provided.innerRef} {...provided.draggableProps}>
          <Title {...provided.dragHandleProps}>
            {props.column.columnLabel}
          </Title>
          <Droppable droppableId={props.column.columnId} type="task">
            {(provided, snapshot) => (
              <TaskList
                ref={provided.innerRef}
                {...provided.droppableProps}
                isDraggingOver={snapshot.isDraggingOver}
              >
                {props.tasks.map((task, index) => {
                  console.log(props, task);
                  return <Task key={task.task_id} task={task} index={index} />;
                })}

                {provided.placeholder}
              </TaskList>
            )}
          </Droppable>
        </Container>
      )}
    </Draggable>
  );
}

export default Column;
