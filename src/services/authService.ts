export const authService = {
  login: async (email: string, password: string) => {
    // Mock API call (replace with real API)
    return new Promise<{ id: string; email: string }>((resolve, reject) => {
      setTimeout(() => {
        if (email === 'test@example.com' && password === 'password') {
          resolve({ id: '1', email });
        } else {
          reject(new Error('Invalid email or password'));
        }
      }, 1000);
    });
  },
  logout: async () => {
    return Promise.resolve(true);
  },
};
