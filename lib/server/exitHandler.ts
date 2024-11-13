import { randomUUID } from '../utils';

type ExitHandler = () => void | Promise<void>;
type ExitHandlerUnsubscribe = () => void;

const listeners = new Map<string, ExitHandler>();

export function onExit(cb: ExitHandler): ExitHandlerUnsubscribe {
  const uuid = randomUUID();
  listeners.set(uuid, cb);
  return () => {
    listeners.delete(uuid);
  };
}
