export const formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};

export const fileSize = (size) => {
  return (size / 1024).toFixed(2) + " KB";
};