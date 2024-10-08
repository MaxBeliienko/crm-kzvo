export const convertToBase64 = file => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
};

// export const handleFileChange = async (event, setImages) => {
//   const files = event.currentTarget.files;
//   if (files && files.length > 0) {
//     const base64Images = await Promise.all(
//       Array.from(files).map(file => convertToBase64(file))
//     );
//     setImages(prevImages => [...prevImages, ...base64Images]);
//   }
// };

export const handleFileChange = async (event, setImages) => {
  const files = event.currentTarget.files;
  if (files && files.length > 0) {
    const base64Images = await Promise.all(
      Array.from(files).map(async file => {
        const base64String = await convertToBase64(file);
        // Видаляємо префікс data:image/png;base64, або data:image/jpeg;base64,
        return base64String.replace(/^data:image\/[a-z]+;base64,/, '');
      })
    );
    setImages(prevImages => [...prevImages, ...base64Images]);
  }
};

// export const handleFileChange = async (event, setImage) => {
//   const files = event.currentTarget.files;
//   if (files && files.length > 0) {
//     const base64String = await convertToBase64(files[0]); // Зберігаємо лише перше зображення
//     // Видаляємо префікс data:image/png;base64, або data:image/jpeg;base64,
//     const imageWithoutPrefix = base64String.replace(
//       /^data:image\/[a-z]+;base64,/,
//       ''
//     );
//     setImage(imageWithoutPrefix); // Зберігаємо рядок без префікса
//   }
// };
