export const objectMap = (fn: (x: any) => any) => (obj: Record<string, unknown>): any =>
    Object.fromEntries(Object.entries(obj).map(([key, value]) => [key, fn(value)]))
