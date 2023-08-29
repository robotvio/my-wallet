import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10000, // limit each IP to 100 requests per windowMs
});

export function withRateLimiter(handler: NextApiHandler): NextApiHandler {
    return (req: NextApiRequest, res: NextApiResponse) => {
        return limiter(req, res, () => {
            return handler(req, res);
        });
    };
}