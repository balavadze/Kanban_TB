import { useState } from 'react';
import Dashboard from './Dashboard';

const Container = () => {
  const [tasks, setTasks] = useState([]);

  return (
    <div className="Container">
      <>
        <Dashboard taskData={tasks} />
      </>
    </div>
  );
};

export default Container;
