/**
 * Normalizes form data by trimming all string values.
 * This reduces garbage payloads by removing leading/trailing whitespace.
 * 
 * @param data - The form data object to normalize
 * @returns A new object with all string values trimmed
 */
export function normalizeFormData<T>(data: T): T {
  if (data === null || data === undefined) {
    return data;
  }

  // Handle arrays
  if (Array.isArray(data)) {
    return data.map((item) => normalizeFormData(item)) as T;
  }

  // Handle strings - trim them
  if (typeof data === 'string') {
    return data.trim() as T;
  }

  // Handle objects - recursively normalize all properties
  if (typeof data === 'object') {
    const normalized: any = {};
    for (const [key, value] of Object.entries(data)) {
      normalized[key] = normalizeFormData(value);
    }
    return normalized as T;
  }

  // Return primitives (numbers, booleans, etc.) as-is
  return data;
}
