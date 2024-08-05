import { v2 as cloudinary } from 'cloudinary';

export const generateSignedUrlUtil = (publicId: string) => {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp,
      public_id: publicId,
    },
    process.env.CLOUDINARY_API_SECRET,
  );

  const uploadUrl = process.env.CLOUDINARY_REQUEST_URL;

  const params = new URLSearchParams({
    signature,
    timestamp: timestamp.toString(),
    public_id: publicId,
    api_key: process.env.CLOUDINARY_API_KEY,
  }).toString();

  return `${uploadUrl}?${params}`;
};
