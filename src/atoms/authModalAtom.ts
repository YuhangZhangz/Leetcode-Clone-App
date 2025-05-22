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

// 只在这里声明字面量属性
declare global {
  interface GlobalThis {
    __authModalState__: ReturnType<typeof atom<AuthModalState>>;
  }
}

export const authModalState: ReturnType<typeof atom<AuthModalState>> = (() => {
  // 用 `as any` 绕过编译器对索引签名的限制
  const g = globalThis as any;
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
