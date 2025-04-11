import { Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";

interface IRegister {
  fullname: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface ILogin {
  email: string;
  password: string;
}

interface IActivation {
  code: string;
}

interface UserExtended extends User {
  accessToken?: string;
  role?: string;
}

interface SessionExtended extends Session {
  accessToken?: string;
}

interface JWTExtended extends JWT {
  user?: UserExtended;
}

interface ISantri {
  fullname?: string;
  gender?: string;
  placeOfBirth?: string;
  dateOfBirth?: Date | number;
  gender?: string;
  schoolOrigin?: string;
  nisn?: string;
  nik?: string;
  familyCardNumber?: string;
  nationality: string;
  phoneNumber?: string;
  status?: string;
}

interface IAdmin {
  fullname?: string;
  phoneNumber?: string;
}

interface IProfile {
  id?: string;
  email?: string;
  profilePicture?: string | FileList | URL;
  role?: string;
  santri?: ISantri;
  admin?: IAdmin;
}

interface IUpdatePassword {
  oldPassword: string;
  password: string;
  confirmPassword: string;
}

export type { IRegister, ILogin, IActivation, UserExtended, SessionExtended, JWTExtended, IProfile, IUpdatePassword, ISantri };
