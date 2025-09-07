const isoDateFormat =
  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d*)?(?:[-+]\d{2}:?\d{2}|Z)?$/;

function isIsoDateString(value: unknown): boolean {
  return value && typeof value === 'string' && isoDateFormat.test(value);
}

export function convertDate(entity: any): void {
  if (entity === null || entity === undefined || typeof entity !== 'object')
    return;

  for (const key of Object.keys(entity)) {
    const value = entity[key];
    if (isIsoDateString(value)) entity[key] = new Date(value);
    else if (typeof value === 'object') convertDate(value);
  }
}
