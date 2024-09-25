export const convertToBase64 = file => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
};

export const handleFileChange = async (event, setImages) => {
  const files = event.currentTarget.files;
  if (files && files.length > 0) {
    const base64Images = await Promise.all(
      Array.from(files).map(file => convertToBase64(file))
    );
    setImages(prevImages => [...prevImages, ...base64Images]);
  }
};
