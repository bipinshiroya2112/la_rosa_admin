import { upload } from '@vercel/blob/client';

const uploadMultiPalImage = async (file) => {
  const newBlob = await upload(file.name, file, {
    access: 'public',
    handleUploadUrl: `${process.env.REACT_APP_BASE_URL}api/image/upload`,
  });
  return newBlob;
}

export default uploadMultiPalImage;