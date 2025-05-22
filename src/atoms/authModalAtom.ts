// src/atoms/authModalAtom.ts
import { atom } from 'recoil';

export type AuthModalState = {
  isOpen: boolean;
  type: 'login' | 'register' | 'forgotPassword';
};

const initialAuthModalState: AuthModalState = {
  isOpen: false,
  type: 'login',
};

const GLOBAL_KEY = '__authModalState__' as const;

declare global {
  interface GlobalThis {
    __authModalState__: ReturnType<typeof atom<AuthModalState>>;
  }
}

export const authModalState: ReturnType<typeof atom<AuthModalState>> = (() => {
  // 先 cast 到 unknown，再 cast 到我们声明的 GlobalThis
  const g = (globalThis as unknown) as GlobalThis;
  if (!g[GLOBAL_KEY]) {
    const newAtom = atom<AuthModalState>({
      key: 'authModalState',
      default: initialAuthModalState,
    });
    g[GLOBAL_KEY] = newAtom;
    return newAtom;
  }
  return g[GLOBAL_KEY];
})();
