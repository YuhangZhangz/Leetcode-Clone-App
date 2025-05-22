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

// 这个常量仅用于访问，不参与类型声明
const GLOBAL_KEY = '__authModalState__' as const;

declare global {
  interface GlobalThis {
    // 在这里直接声明字面量属性
    __authModalState__: ReturnType<typeof atom<AuthModalState>>;
  }
}

export const authModalState: ReturnType<typeof atom<AuthModalState>> =
  // 下面两个位置都用 GLOBAL_KEY
  globalThis[GLOBAL_KEY] ?? (() => {
    const newAtom = atom<AuthModalState>({
      key: 'authModalState',
      default: initialAuthModalState,
    });
    globalThis[GLOBAL_KEY] = newAtom;
    return newAtom;
  })();
