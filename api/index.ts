import app from '../server/dist/server.js';

export default function handler(req: any, res: any) {
  return app(req, res);
}
