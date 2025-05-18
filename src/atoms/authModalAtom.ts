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

// 在 globalThis 上用一个唯一的属性存储 Atom
const GLOBAL_KEY = '__authModalState__' as const;

declare global {
  interface GlobalThis {
    [GLOBAL_KEY]: ReturnType<typeof atom<AuthModalState>>;
  }
}

export const authModalState: ReturnType<typeof atom<AuthModalState>> =
  // 如果已经存在，就复用；否则新建并挂到 globalThis
  globalThis[GLOBAL_KEY] ?? (() => {
    const newAtom = atom<AuthModalState>({
      key: 'authModalState',
      default: initialAuthModalState,
    });
    globalThis[GLOBAL_KEY] = newAtom;
    return newAtom;
  })();
