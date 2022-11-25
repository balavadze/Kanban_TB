import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Column from './Column';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const Container = styled.div`
  display: flex;
  justify-content: center;
`;
let columns = {
  'column-1': {
    columnId: 'column-1',
    columnLabel: 'Todo',
    TaskInColumn: ['todo'],
    taskIds: [],
  },
  'column-2': {
    columnId: 'column-2',
    columnLabel: 'In progress',
    TaskInColumn: ['progress'],
    taskIds: [],
  },
  'column-3': {
    columnId: 'column-3',
    columnLabel: 'Review',
    TaskInColumn: ['review'],
    taskIds: [],
  },
  'column-4': {
    columnId: 'column-4',
    columnLabel: 'Completed',
    TaskInColumn: ['completed'],
    taskIds: [],
  },
};

let columnOrder = ['column-1', 'column-2', 'column-3', 'column-4'];

const Dashboard = () => {
  const [data, setData] = useState({ columns, columnOrder, tasks: [] });
  const [error, setError] = useState([]);

  const fetchTasks = async () => {
    try {
      let path = `http://localhost:8000/mytodo`;
      let response = await fetch(path, { mode: 'cors' });
      console.log(response);
      if (response.status === 200) {
        let fetchedTasks = await response.json();
        console.log(fetchedTasks.todo);
        const newState = { columns, columnOrder, tasks: fetchedTasks.todo };
        setData(newState);
      } else {
        throw new Error(
          'You do have tasks, but something is messed up, so we can not find any data.'
        );
      }
    } catch (error) {
      console.log('Something wrong with fetching', error.message);
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;
    //If there is no destination
    if (!destination) {
      return;
    }

    //If source and destination is the same
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    //If you're dragging columns
    if (type === 'column') {
      const newColumnOrder = Array.from(data.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);
      const newState = {
        ...data,
        columnOrder: newColumnOrder,
      };
      setData(newState);
      return;
    }

    const start = columns[source.droppableId];
    const finish = columns[destination.droppableId];

    //If dropped inside the same column
    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);
      const newColumn = {
        ...start,
        TaskInColumn: newTaskIds,
      };
      const newState = {
        ...data,
        columns: {
          ...data.columns,
          [newColumn.columnId]: newColumn, //TODO pay attention to this
        },
      };
      setData(newState);
      return;
    }

    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };
    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    const newState = {
      ...data,
      columns: {
        ...data.columns,
        [newStart.task_id]: newStart, //TODO pay attention to this
        [newFinish.task_id]: newFinish, //TODO pay attention to this
      },
    };

    setData(newState);
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="all-columns" direction="horizontal" type="column">
        {(provided) => (
          <Container {...provided.droppableProps} ref={provided.innerRef}>
            {columnOrder.map((columnId, index) => {
              const column = columns[columnId];
              const tasks = [];
              column.TaskInColumn.map((TaskInColumn) => {
                return data.tasks.map((entry) => {
                  if (entry.status == TaskInColumn) {
                    tasks.push(entry);
                  }
                });
              });

              return (
                <Column
                  key={column.columnId}
                  column={column}
                  tasks={tasks}
                  index={index}
                />
              );
            })}
            {provided.placeholder}
          </Container>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Dashboard;
