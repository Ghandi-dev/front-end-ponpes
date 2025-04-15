const environment = {
  API_URL: process.env.NEXT_PUBLIC_API_URL,
  REGION_API_URL: process.env.NEXT_PUBLIC_REGION_API_URL,
  AUTH_SECRET: process.env.NEXTAUTH_SECRET,
  MIDTRANS_CLIENT_KEY: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY,
  MIDTRANS_SNAP_URL: process.env.NEXT_PUBLIC_MIDTRANS_SNAP_URL,
  DEFAULT_PHOTO_PROFILE: process.env.NEXT_PUBLIC_DEFAULT_PHOTO_PROFILE || "https://res.cloudinary.com/diton4fcf/image/upload/v1742373868/avatar-1_ksjehz.svg",
};

export default environment;
