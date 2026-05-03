import {Queue} from 'bullmq';
import IORedis from 'ioredis';

const connection = new IORedis();

export const labQueue = new Queue('labQueue', {connection});