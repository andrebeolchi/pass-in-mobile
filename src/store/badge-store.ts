import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type BadgeStore = {
  id: string;
  name: string;
  email: string;
  eventTitle: string;
  checkInURL: string;
  imageURL: string;
}

type StateProps = {
  data: BadgeStore | null;
  save: (data: BadgeStore) => void;
  remove: () => void;
  updateAvatar: (imageURL: string) => void;
}

export const useBadgeStore = create(persist<StateProps>((set) => ({
  data: null,
  save: (data: BadgeStore) => set({ data }),
  remove: () => set({ data: null }),
  updateAvatar: (imageURL: string) => set((state) => ({
    data: {
      ...state.data!,
      imageURL,
    },
  }))
}), {
  name: 'nlw-unite:badge',
  storage: createJSONStorage(() => AsyncStorage),
}))