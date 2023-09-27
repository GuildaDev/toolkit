export type getInitialsParam = string | undefined | null

export default function getInitials(str: getInitialsParam, defaultValue = '') {
  try {
    if (!str) {
      return defaultValue;
  }

  const names = str.split(' ').filter(Boolean);

  if (names.length < 1) {
    return defaultValue
  }

  const initials = names.map(n => n[0].toUpperCase()).join('');

  return initials;
  } catch {
    return defaultValue
  }
}
