// lib/pocketbase.js
import PocketBase from "pocketbase";

export const url = "http://80.87.198.50:8090";
export const client = new PocketBase(url);

export const getImageUrl = (item) => {
  console.log("🖼️ getImageUrl called with item:", item);

  const collectionId = item.collectionId || "pmlzc10hatw7ufi";
  const fileId = item.id;
  const fileName = item.image;

  console.log("🔗 Image URL components:", {
    collectionId,
    fileId,
    fileName,
    url,
  });

  const imageUrl = `${url}/api/files/${collectionId}/${fileId}/${fileName}`;
  console.log("🎯 Final image URL:", imageUrl);

  return imageUrl;
};
export const getImage = (item, fileName) => {
  const collectionId = item.collectionId || "pmlzc10hatw7ufi";
  const fileId = item.id;
  return `${url}/api/files/${collectionId}/${fileId}/${fileName}`;
};
export const getShema = (item) => {
  const collectionId = item.collectionId || "pmlzc10hatw7ufi";
  const fileId = item.id;
  const fileName = item.schema;
  return `${url}/api/files/${collectionId}/${fileId}/${fileName}`;
};
export const getMatressFile = (item, lang) => {
  const collectionId = item.collectionId || "pmlzc10hatw7ufi";
  const fileId = item.id;
  const fileName = item["file_" + lang];
  return `${url}/api/files/${collectionId}/${fileId}/${fileName}`;
};
