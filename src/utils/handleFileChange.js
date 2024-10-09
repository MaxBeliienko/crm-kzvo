export const convertToBase64 = file => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
};

// Перекодування в Base64
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

// Збереження у форматі масиву байтів
// export const handleFileChange = async (event, setImages) => {
//   const files = event.currentTarget.files;
//   if (files && files.length > 0) {
//     const byteArrays = await Promise.all(
//       Array.from(files).map(file => {
//         return new Promise((resolve, reject) => {
//           const reader = new FileReader();
//           reader.readAsArrayBuffer(file); // Читаємо файл як ArrayBuffer
//           reader.onload = () => resolve(new Uint8Array(reader.result)); // Конвертуємо в Uint8Array
//           reader.onerror = error => reject(error);
//         });
//       })
//     );
//     setImages(prevImages => [...prevImages, ...byteArrays]); // Зберігаємо масиви байтів
//   }
// };
