
import { windowProvider } from './window.provider';
import { sessionStorageProvider } from './session-storage.provider';
import { localStorageProvider } from './local-storage.provider';
import { localeProvider } from './locale.provider';
import { AuthInterceptorProvider } from './auth-interceptor.provider';


export * from './window.provider';
export * from './session-storage.provider';
export * from './local-storage.provider';
export * from './locale.provider';
export * from './auth-interceptor.provider';

export const CORE_PROVIDERS = [
  windowProvider,
  sessionStorageProvider,
  localStorageProvider,
  localeProvider,
  AuthInterceptorProvider
];
