import {create} from 'zustand';

type AppState = {
  isBootstrapped: boolean;
  pinVerifiedAt?: number;
  setBootstrapped: (value: boolean) => void;
  verifyPinSession: () => void;
};

export const useAppStore = create<AppState>(set => ({
  isBootstrapped: false,
  pinVerifiedAt: undefined,
  setBootstrapped: value => set({isBootstrapped: value}),
  verifyPinSession: () => set({pinVerifiedAt: Date.now()})
}));
