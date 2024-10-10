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

// Перевірка валідності Base64
export const isValidBase64 = base64String => {
  const base64Regex =
    /^(?:[A-Za-z0-9+\/]{4})*(?:[A-Za-z0-9+\/]{2}==|[A-Za-z0-9+\/]{3}=)?$/;

  // Перевірка на формат
  if (!base64Regex.test(base64String)) {
    return false;
  }

  try {
    // Декодуємо Base64
    const decodedString = atob(base64String);

    // Якщо декодування проходить, можемо перевірити його довжину
    const isValid = decodedString.length > 50;
    return isValid;
  } catch (e) {
    // Якщо сталася помилка при декодуванні, то Base64 не валідний
    return false;
  }
};
