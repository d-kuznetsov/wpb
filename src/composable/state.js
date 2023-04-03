import { ref, readonly } from 'vue';

export const APP_STATE = {
  INITIAL: 'initial',
  RUN: 'run',
  PAUSE: 'pause',
  FINAL: 'final',
};

const state = ref(APP_STATE.INITIAL);

const setState = (value) => {
  if (!Object.values(APP_STATE).includes(value)) {
    throw new Error('Incorrect app state');
  }
  state.value = value;
};

export const useState = () => ({
  state: readonly(state),
  setState,
});
