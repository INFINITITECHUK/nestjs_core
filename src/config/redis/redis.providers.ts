import { REDIS_CONNECTION} from '../constants';
import { createClient } from 'redis';
import 'dotenv/config'

export const redisProviders = [ 
    //redis connection...
    {
    name : REDIS_CONNECTION, 
    provide: REDIS_CONNECTION, 
    useFactory: async () => { 
    
        const REDIS_URL = `redis://${process.env.REDIS_HOST}:${parseInt(process.env.REDIS_PORT)}`
        //Check connection establish or not......
        let client = createClient({ url : REDIS_URL });
     
        console.log(`Redis url : `, REDIS_URL) 

        const connectClient = async () => {
            try {
              await client.connect();
              console.info('Redis Client connected successfully.');
            } catch (err) {
              console.error('Redis Client connection failed', err);
            }
          }
    
        client.on('error', async(err) => {
            console.error('Redis Client Error', err); 
            try {
                if (client.isOpen) {
                    await client.quit();
                }

            } catch(e) {
                 console.log(e)
            }
            console.info("Reconnect Redis after 5 seconds...");
            setTimeout(async () => {
                console.info('Reconnecting to Redis...');
                try {
                  client = createClient({ url: REDIS_URL });
                  await client.connect();
                  console.info('Reconnected to Redis successfully.');
                } catch (reconnectErr) {
                  console.error('Reconnection to Redis failed', reconnectErr);
                }
              }, 5000); // Reconnect after 5 seconds, adjust as needed
        })
    
        client.on('connect', (message) => console.info("Redis Client Connect successfully"))
    
        client.on("idle", (err) => console.error("Redis queue is idle. Shutting down...") )
     
        client.on("end", (err) => console.error("Redis is shutting down. This might be ok if you chose not to run it in your dev environment") )
     
        client.on("ready", (err) => console.info("Redis up! Now connecting the worker queue client...") )
    
        await client.connect();

        const performOperationWithReconnect = async (operation) => {
            try {
              return await operation();
            } catch(err) {
              if (err.code === 'ECONNREFUSED' || err.code === 'NR_CLOSED') {
                console.error('Redis Client connection closed during operation, reconnecting...', err);
                await client.quit();
                client = createClient({ url: REDIS_URL });
                await connectClient();
                return await operation();
              } else {
                throw err;
              }
            }
          }
    
        // return client

        return {
            getClient: () => client,
            get: async (key) => {
               return await performOperationWithReconnect(() => client.get(key));
            },
            set: async (key, value) => {
               return await performOperationWithReconnect(() => client.set(key, value));
            },
            setEx:async (key, time, value) => {
                return await performOperationWithReconnect(() => client.setEx(key,time, value))
             },
            // Add other Redis operations as needed
        }

     }
}]
