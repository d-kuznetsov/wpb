<script>
import { reactive, computed } from 'vue';
import { useState, APP_STATE } from '../composable/state';
import { Field, Stepper, Button } from 'vant';

export default {
  props: ['modelValue'],
  emits: ['update:modelValue'],
  components: {
    Field,
    Stepper,
    Button,
  },
  setup(props, { emit }) {
    const { setState } = useState();
    const copy = reactive(JSON.parse(props.modelValue));
    const isSaveDisabled = computed(() => JSON.stringify(copy) === props.modelValue);
    const onSave = () => {
      setState(APP_STATE.INITIAL);
      emit('update:modelValue', JSON.stringify(copy));
    };

    return {
      copy,
      isSaveDisabled,
      onSave,
    };
  },
};
</script>

<template>
  <div class="settings-tab">
    <div class="settings-tab__exercises">
      <div v-for="ex in copy.workout.exercises" :key="ex.name" class="settings-tab__exercise-item">
        <div class="settings-tab__exercise-name">
          {{ ex.name }}
        </div>
        <div class="settings-tab__exercise-prop">
          <span>Sets:</span><Stepper v-model="ex.sets" integer />
        </div>
        <div class="settings-tab__exercise-prop">
          <span>On:</span><Stepper v-model="ex.on" integer />
        </div>
        <div class="settings-tab__exercise-prop">
          <span>Off:</span><Stepper v-model="ex.off" integer />
        </div>
      </div>
    </div>
    <Button :disabled="isSaveDisabled" type="primary" size="large" round @click="onSave">
      Save
    </Button>
  </div>
</template>

<style lang="postcss">
.settings-tab {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding: 12px;
  box-sizing: border-box;

  &__exercise-item {
    background-color: var(--bg-color-dark);
    padding: 12px;
    border-radius: 12px;
    &:not(:last-child) {
      margin-bottom: 8px;
    }
  }

  &__exercise-name {
    border-bottom: 1px dashed #6b7280;
    margin-bottom: 8px;
    line-height: 28px;
  }

  &__exercise-prop {
    display: grid;
    grid-template-columns: 1fr 4fr;
    &:not(:last-child) {
      margin-bottom: 8px;
    }
  }
}
</style>
