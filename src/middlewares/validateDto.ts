import { plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { Request, Response, NextFunction } from 'express';

export const ValidateDto = (dto: any) => {
    return (req: Request, res: Response, next: NextFunction) => {
      const output = plainToInstance(dto, req.body);
      validate(output).then((errors: ValidationError[]) => {
        if (errors.length > 0) {
          return res.status(400).json({ errors:  errors.map(e => e.constraints) });
        } else {
          next();
        }
      });
    };
  };