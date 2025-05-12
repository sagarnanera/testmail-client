export const getCredentials = () => {
  if (typeof window === 'undefined') return null;
  const creds = localStorage.getItem('testmail_credentials');
  if (!creds) {
    return null;
  }
  try {
    const parsed = JSON.parse(creds);
    if (!parsed.apiToken || !parsed.inboxId) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
};

export const setCredentials = (apiToken: string, inboxId: string) => {
  localStorage.setItem('testmail_credentials', JSON.stringify({ apiToken, inboxId }));
};

export const clearCredentials = () => {
  localStorage.removeItem('testmail_credentials');
};
