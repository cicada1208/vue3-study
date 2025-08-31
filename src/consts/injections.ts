import type { InjectionKey, Ref } from 'vue';

export interface ILocationInjection {
  location: Readonly<Ref<string>>;
  updateLocation: () => void;
}

export default {
  location: Symbol() as InjectionKey<ILocationInjection>
} as const;
