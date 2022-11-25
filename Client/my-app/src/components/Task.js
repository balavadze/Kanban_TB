import React from 'react';
import styled from 'styled-components';
import { Icon } from '@iconify/react';
import { Draggable } from 'react-beautiful-dnd';
const Card = styled.div`
  border: 1px solid lightgrey;
  padding: 8px;
  margin-bottom: 8px;
  border-radius: 2px;
  background-color: #fff;
  border-radius: 10px;
  background-color: ${(props) => (props.isDragging ? '#F3CF51' : 'white')};
`;
function Task(props) {
  console.log(props);
  return (
    <Draggable
      draggableId={props.task.name}
      index={props.index}
      className="TaskCard card border-warning mb-3"
      style={{ width: '18rem' }}
    >
      {(provided, snapshot) => {
        return (
          <Card
            className="card-body"
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            <h6>{props.task.name}</h6>
            <p>{props.task.content}</p>
            <small>
              <Icon icon="mdi:calendar-clock" />
              {props.task.duedate} | {props.task.priority} | {props.task.tag}
            </small>
          </Card>
        );
      }}
    </Draggable>
  );
}

export default Task;
