import axios from 'axios';
import type { CreateClientConfig } from './sdk/client/client.gen';
import { setupCache } from 'axios-cache-interceptor';
import { redisStorage } from '@/orpc/utils/redis';


export const createClientConfig: CreateClientConfig = (config) => ({
  ...config,
  axios:  setupCache( axios.create(), { storage:redisStorage }) 
});

