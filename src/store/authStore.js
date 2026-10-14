import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { loginAdmin, getProfile } from '../services/portfolioService';

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (credentials) => {
        set({ isLoading: true });
        try {
          const res = await loginAdmin(credentials);
          const { token, user } = res.data.data;
          localStorage.setItem('portfolio_token', token);
          set({ token, user, isAuthenticated: true, isLoading: false });
          return { success: true };
        } catch (error) {
          set({ isLoading: false });
          return {
            success: false,
            message: error.response?.data?.message || 'Login failed',
          };
        }
      },

      logout: () => {
        localStorage.removeItem('portfolio_token');
        set({ user: null, token: null, isAuthenticated: false });
      },

      fetchProfile: async () => {
        try {
          const res = await getProfile();
          set({ user: res.data.data });
        } catch {
          get().logout();
        }
      },
    }),
    {
      name: 'portfolio_auth',
      partialize: (state) => ({ token: state.token, isAuthenticated: state.isAuthenticated }),
    }
  )
);

export default useAuthStore;
