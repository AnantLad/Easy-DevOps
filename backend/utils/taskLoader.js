import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const loadTasks = (taskFileName = 'linux-basics.json') => {
  try {
    const tasksPath = path.join(__dirname, '..', 'tasks', taskFileName);
    const taskData = fs.readFileSync(tasksPath, 'utf-8');
    return JSON.parse(taskData);
  } catch (error) {
    console.error(`Error loading tasks from ${taskFileName}:`, error.message);
    return [];
  }
};

export const getTaskById = (taskId, taskFileName = 'linux-basics.json') => {
  const tasks = loadTasks(taskFileName);
  return tasks.find((task) => task.id === taskId);
};

export const getAllTasks = () => {
  const taskFiles = ['linux-basics.json', 'docker-basics.json', 'kubernetes-basics.json'];
  const allTasks = [];

  for (const file of taskFiles) {
    allTasks.push(...loadTasks(file));
  }

  return allTasks;
};

export default { loadTasks, getTaskById, getAllTasks };
