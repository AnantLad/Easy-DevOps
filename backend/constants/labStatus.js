export const LAB_STATUS = {
  STARTING: 'starting',
  RUNNING: 'running',
  STOPPED: 'stopped',
  FAILED: 'failed',
  EXPIRED: 'expired',
};

export const LAB_EVENTS = {
  STARTED: 'lab:started',
  STOPPED: 'lab:stopped',
  FAILED: 'lab:failed',
  OUTPUT: 'lab:output',
  ERROR: 'lab:error',
  EXPIRED: 'lab:expired',
};

export default { LAB_STATUS, LAB_EVENTS };
