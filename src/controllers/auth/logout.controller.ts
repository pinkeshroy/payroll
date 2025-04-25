import { Request, Response } from 'express';


export const logoutController = (_req: Request, res: Response) => {
  res.clearCookie('access_token', { httpOnly: true, sameSite: 'strict' });
  res.sendStatus(200);
};
