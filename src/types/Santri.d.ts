interface ISantri {
  id: number;
  userId: number;
  fullname: string;
  placeOfBirth: string;
  dateOfBirth: Date;
  gender: string;
  schoolOrigin: string;
  nisn: string;
  nik: string;
  familyCardNumber: string;
  nationality: string;
  phoneNumber: string;
  status: string;
}

type ISantriForm = Omit<ISantri, "id" | "userId" | "status">;

export { ISantri, ISantriForm };
