import { Request, Response, NextFunction } from "express";
export declare function parseNewPatientData(req: Request, _res: Response, next: NextFunction): void;
export declare function parseNewEntryData(req: Request, _res: Response, next: NextFunction): void;
export declare function errorMiddleware(err: unknown, _req: Request, res: Response, _next: NextFunction): Response;
//# sourceMappingURL=middleware.d.ts.map