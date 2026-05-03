export const TASK_LEVELS = {
  EASY: 'easy',
  MEDIUM: 'medium',
  HARD: 'hard',
};

export const TASK_CATEGORIES = {
  LINUX: 'linux',
  DOCKER: 'docker',
  KUBERNETES: 'kubernetes',
  DEVOPS: 'devops',
};

export const TASK_POINTS = {
  [TASK_LEVELS.EASY]: 10,
  [TASK_LEVELS.MEDIUM]: 25,
  [TASK_LEVELS.HARD]: 50,
};

export default { TASK_LEVELS, TASK_CATEGORIES, TASK_POINTS };
