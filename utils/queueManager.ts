import { Queue, Worker, QueueEvents } from 'bullmq'
import {getTransactionsBTCFake, getTransactionsETHFake} from '../utils/remoteSources'
import {insertBatchOfTransactions} from '../utils/db'
const connection = {
    host: "localhost",
    port: 6379
}
// Create a new connection in every instance
export const ethTransactionQueue = new Queue('ethTransaction', { connection: connection});
export const btcTransactionQueue = new Queue('btcTransaction', { connection: connection});

const ethWorker = new Worker('ethTransaction', async (job)=>{
    console.log('going to get transaction')
    const result = await getTransactionsETHFake(job.data.id,job.data.address)
    console.log('job in worker eth',job.id)
    insertBatchOfTransactions(result)
    return result
}, { connection: connection});

const btcWorker = new Worker('btcTransaction', async (job)=>{
    console.log('going to get transaction')
    const result = await getTransactionsBTCFake(job.data.id,job.data.address)
    console.log('job in worker btc',job.id)
    insertBatchOfTransactions(result)
    return result
}, { connection: connection});
// const queueScheduler = new QueueScheduler('calculations');
ethWorker.on('completed', job => {
    console.log(`${job.id} has completed!`);
});

ethWorker.on('failed', (job, err) => {
    console.log(`${job.id} has failed with ${err.message}`);
});
btcWorker.on('completed', job => {
    console.log(`${job.id} btc has completed !`);
});

btcWorker.on('failed', (job, err) => {
    console.log(`${job.id} btc has failed with ${err.message}`);
});
// const queueEvents = new QueueEvents('ethTransaction',{connection:connection});
//
// queueEvents.on('waiting', ({ jobId }) => {
//     console.log(`A job with ID ${jobId} is waiting`);
// });
//
// queueEvents.on('active', ({ jobId, prev }) => {
//     console.log(`Job ${jobId} is now active; previous status was ${prev}`);
// });
//
// queueEvents.on('completed', ({ jobId, returnvalue }) => {
//     console.log(`${jobId} has completed and returned ${returnvalue}`);
// });
//
// queueEvents.on('failed', ({ jobId, failedReason }) => {
//     console.log(`${jobId} has failed with reason ${failedReason}`);
// });