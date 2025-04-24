export const translateGender = (gender: string): string => {
  switch (gender.toLowerCase()) {
    case "male":
      return "Laki-laki";
    case "female":
      return "Perempuan";
    default:
      return "Tidak diketahui";
  }
};
