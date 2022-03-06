export interface iUser {
  entity?: string,
  email: string,
  jobFunction?: string,
  name: string,
  password?: string
  id?: number
}

export interface iLogin {
  email: string,
  password: string
}

export interface iUserLogged {
  user: iUser,
  token: string
}
