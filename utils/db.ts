import * as AWS from 'aws-sdk';

// Configure AWS credentials
AWS.config.update({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    region: 'us-east-2'
});
export const insertBatchOfTransactions = (items: TransactionObject[]) => {
    const params: AWS.DynamoDB.BatchWriteItemInput = {
        RequestItems: {
            TransactionTable: items.map(item => ({
                PutRequest: {
                    Item: {
                        id:{S: item.id},
                        tid:{S: item.tid},
                        symbol:{S: item.symbol},
                        type:{S: item.type},
                        sender:{S: item.sender},
                        recipient:{S: item.recipient},
                        feeAmount:{N: item.feeAmount.toString()},
                        exchangeRateUnit:{S: item.exchangeRateUnit},
                        direction:{S: item.direction},
                        amount:{N: item.amount.toString()},
                        walletId:{S: item.walletId},
                        walletAddress:{S: item.walletAddress}
                    }
                }
            }))
        }
    };

    dynamodb.batchWriteItem(params, (err, data) => {
        if (err) {
            console.error('Error inserting items:', err);
        } else {
            console.log('Items inserted successfully:', data);
        }
    });
};

// Create a DynamoDB instance
export const dynamodb = new AWS.DynamoDB();
