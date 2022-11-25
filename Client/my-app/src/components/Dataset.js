// TODO move this file to backend, when its connected, error: dashboard.js is with capital letter

const Dataset = {
  tasks: {
    // ? should change object of objects to an array of objects
    BackUp: {
      name: 'BackUp',
      id: 'task-1',
      content: 'Push To GitHub Everything not saved will be lost.',
      tag: 'private',
      status: 'todo',
      priority: 'high',
      duedate: '17.11',
      starttime: '',
      endtime: '',
    },
    brainstorming: {
      name: 'brainstorming',
      id: 'task-2',
      content: 'brainstorm final project',
      tag: 'work',
      priority: 'medium',
      duedate: '17.11',
      starttime: '',
      endtime: '',
    },
    'Clean Up': {
      name: 'Clean Up',
      id: 'task-3',
      content: 'Wipe Down Counters before mom arrives',
      tag: 'home',
      priority: 'high',
      status: 'todo',
      duedate: '17.11',
      starttime: '',
      endtime: '',
    },
    'Smile :)': {
      name: 'Smile :)',
      id: 'task-4',
      content: 'in the mirror: Mirror, mirror, on the wall, who is the ...',
      tag: 'private',
      priority: 'high',
      status: 'todo',
      duedate: '17.11',
      starttime: '',
      endtime: '',
    },
    'Contemporary Dance': {
      name: 'Contemporary Dance',
      id: 'task-5',
      content: 'find a dance school. Put on your red shoes and dance the blues',
      tag: 'private',
      priority: 'low',
      status: 'todo',
      duedate: '17.11',
      starttime: '',
      endtime: '',
    },
    Fox: {
      name: 'Fox',
      id: 'task-6',
      content: 'The quick brown fox jumps over the lazy dog',
      tag: 'work',
      priority: 'low',
      status: 'todo',
      duedate: '17.11',
      starttime: '',
      endtime: '',

    },
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "Todo",
      taskIds: ["task-1", "task-6"],
    },
    "column-2": {
      id: "column-2",
      title: "In progress",
      taskIds: ["task-2", "task-3", "task-5"],
    },
    "column-3": { id: "column-3", title: "Review", taskIds: [] },
    "column-4": { id: "column-4", title: "Completed", taskIds: ["task-4"] },
  },
  columnOrder: ["column-1", "column-2", "column-3", "column-4"],
};

export default Dataset;
