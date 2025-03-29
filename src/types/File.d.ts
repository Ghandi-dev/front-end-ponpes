interface IFile {
  birthCertificate: string | FileList;
  familyCard: string | FileList;
  educationCertificate: string | FileList;
}

interface IFIleURL {
  fileUrl: string;
}

export { IFIleURL, IFile };
