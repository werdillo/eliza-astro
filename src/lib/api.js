// lib/api.js
import { client } from "./pocketbase";

/**
 * Textile API
 */
export const getTextileItems = async (limit = 50) => {
  try {
    const res = await client.collection("textile_eliza").getList(1, limit);
    return res.items.sort((a, b) => a.order - b.order);
  } catch (err) {
    console.error("Error fetching textile items:", err);
    throw err;
  }
};

/**
 * Blog API
 */
export const getBlogPosts = async (type, limit = 50) => {
  try {
    const res = await client.collection("blog").getFullList(limit, {
      filter: `type="${type}"`,
      fields:
        "id, collectionId, image, path, title, description:excerpt(200, true)",
    });
    return res;
  } catch (err) {
    console.error("Error fetching blog posts:", err);
    throw err;
  }
};

export const getBlogPostByPath = async (path, limit = 50) => {
  try {
    const res = await client.collection("blog").getList(1, limit, {
      filter: `path="${path}"`,
    });
    if (res.items.length === 0) {
      throw new Error("Post not found");
    }
    return res.items[0];
  } catch (err) {
    console.error("Error fetching blog post:", err);
    throw err;
  }
};

/**
 * Products API
 */
export const getProducts = async (brand, limit = 50) => {
  try {
    const res = await client.collection("products_eliza").getList(1, limit, {
      filter: `collection="${brand}"`,
      fields:
        "id, collectionId, collection, path, images, type, name:excerpt(200, true)",
    });
    return res.items;
  } catch (err) {
    console.error("Error fetching products:", err);
    throw err;
  }
};

export const getProductByPath = async (path, limit = 50) => {
  try {
    const res = await client.collection("products_eliza").getList(1, limit, {
      filter: `path="${path}"`,
    });
    if (res.items.length === 0) {
      throw new Error("Product not found");
    }
    return res.items[0];
  } catch (err) {
    console.error("Error fetching product:", err);
    throw err;
  }
};

/**
 * Contacts API
 */
export const getContacts = async (limit = 50) => {
  try {
    const res = await client.collection("contacts_eliza").getList(1, limit, {
      sort: "order",
    });
    return res.items;
  } catch (err) {
    console.error("Error fetching contacts:", err);
    throw err;
  }
};

/**
 * Gallery API
 */
export const getGallery = async (limit = 50) => {
  try {
    const res = await client.collection("gallery_eliza").getList(1, limit);
    return res.items[0] || null;
  } catch (err) {
    console.error("Error fetching gallery:", err);
    throw err;
  }
};

/**
 * Mattresses API
 */
export const getMatresses = async (limit = 50) => {
  try {
    const res = await client.collection("mattresses_eliza").getList(1, limit);
    return res.items;
  } catch (err) {
    console.error("Error fetching mattresses:", err);
    throw err;
  }
};

export const getMatressByPath = async (path, limit = 50) => {
  try {
    const res = await client.collection("mattresses_eliza").getList(1, limit, {
      filter: `path="${path}"`,
    });
    if (res.items.length === 0) {
      throw new Error("Mattress not found");
    }
    return res.items[0];
  } catch (err) {
    console.error("Error fetching mattress:", err);
    throw err;
  }
};
