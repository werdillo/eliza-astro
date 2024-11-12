// lib/pocketbase.js
import PocketBase from 'pocketbase';

const url = 'https://eliza.pockethost.io/';
export const client = new PocketBase(url);

export const getImageUrl = (item) => {
	const collectionId = item.collectionId || 'fbed4xs7oyzc33f';
	const fileId = item.id;
	const fileName = item.image;
	return `${url}/api/files/${collectionId}/${fileId}/${fileName}`;
};