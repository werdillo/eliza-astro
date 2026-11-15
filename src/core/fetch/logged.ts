/** Runs a load; a failure is logged under the given message and rethrown unchanged. */
export async function logged<T>(message: string, load: () => Promise<T>): Promise<T> {
  try {
    return await load();
  } catch (err) {
    console.error(message, err);
    throw err;
  }
}
