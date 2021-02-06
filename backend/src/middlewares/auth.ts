import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

interface Token {
  id: string;
  iat: string;
  exp: string;
}

export default (request: Request, response: Response, next: NextFunction) => {
  const authHeader = request.headers['authorization'];
  if (!authHeader) {
    return response.status(401).send({ error: "No token provided" });
  }
  const token = authHeader?.split(' ')[1];

  try {
    let params = jwt.verify(token,"secret") as Token; //importante descoberta!!
    request.params.id = params.id;
    return next();
  } catch (err) {
    return response.status(403).send({ error: "Invalid token" });
  }
};