import { upload } from '@vercel/blob/client';

const uploadImage = async (ref) => {
  const file = ref.current.files[0]
  const newBlob = await upload(file.name, file, {
    access: 'public',
    handleUploadUrl: `${process.env.REACT_APP_BASE_URL}api/image/upload`,
  });
  return newBlob;
}

export default uploadImage;