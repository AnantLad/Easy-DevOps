export const ROLES = {
  USER: 'user',
  ADMIN: 'admin',
  INSTRUCTOR: 'instructor',
};

export const ROLE_PERMISSIONS = {
  [ROLES.USER]: ['read_tasks', 'start_lab', 'submit_task'],
  [ROLES.INSTRUCTOR]: ['read_tasks', 'start_lab', 'submit_task', 'create_task', 'edit_task'],
  [ROLES.ADMIN]: ['*'], // All permissions
};

export default { ROLES, ROLE_PERMISSIONS };
