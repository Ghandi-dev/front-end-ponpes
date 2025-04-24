export enum SANTRI_STATUS {
  PENDING_REGISTRATION = "pending_registration",
  PROFILE_COMPLETED = "profile_completed",
  ADDRESS_COMPLETED = "address_completed",
  FILES_COMPLETED = "files_completed",
  PAYMENT_COMPLETED = "payment_completed",
  RE_REGISTERED = "re_registered",
  ACTIVE = "active",
  INACTIVE = "inactive",
}

export const SANTRI_STATUS_LABELS: Record<SANTRI_STATUS, string> = {
  [SANTRI_STATUS.PENDING_REGISTRATION]: "Menunggu Pendaftaran",
  [SANTRI_STATUS.PROFILE_COMPLETED]: "Profil Lengkap",
  [SANTRI_STATUS.ADDRESS_COMPLETED]: "Alamat Lengkap",
  [SANTRI_STATUS.FILES_COMPLETED]: "Berkas Lengkap",
  [SANTRI_STATUS.PAYMENT_COMPLETED]: "Pembayaran Selesai",
  [SANTRI_STATUS.RE_REGISTERED]: "Daftar Ulang",
  [SANTRI_STATUS.ACTIVE]: "Aktif",
  [SANTRI_STATUS.INACTIVE]: "Tidak Aktif",
};

export enum STATUS_PAYMENT {
  PENDING = "pending",
  COMPLETED = "completed",
  CANCELED = "canceled",
}

export enum TYPE_PAYMENT {
  REGISTRATION = "registration",
  SPP = "spp",
}
