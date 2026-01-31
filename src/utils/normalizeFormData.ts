export function normalizeFormData<T>(data: T): T {
  if (data === null || data === undefined) {
    return data;
  }

  if (Array.isArray(data)) {
    return data.map((item) => normalizeFormData(item)) as T;
  }

  if (typeof data === 'string') {
    return data.trim() as T;
  }

  if (typeof data === 'object') {
    const normalized: any = {};
    for (const [key, value] of Object.entries(data)) {
      normalized[key] = normalizeFormData(value);
    }
    return normalized as T;
  }

  return data;
}
