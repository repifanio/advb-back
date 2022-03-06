/* eslint-disable no-unused-vars */
interface iInfoUser {
  userId: number
}

declare namespace Express {
  interface Request {
      user: iInfoUser
  }
}
