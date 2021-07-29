import IUser from "../interfaces/IUser";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GOOGLE_CLIENT_ID: string;
      GOOGLE_CLIENT_SECRET: string;
      JWT_SECRET: string;
    }
  }

  namespace Express {
    interface Request {
      currentUser?: IUser;
    }
    interface Response {
      error(message: string, code?: number);
    }
  }
}

export {};
