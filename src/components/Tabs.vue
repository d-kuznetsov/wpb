<script>
import { ref } from 'vue';
import { Tab, Tabs } from 'vant';

export default {
  components: {
    Tab,
    Tabs,
  },
  setup() {
    const active = ref(0);
    return { active };
  },
};
</script>

<template>
  <Tabs v-model:active="active" class="Tabs">
    <Tab title="Main">
      <slot name="main">Main tab</slot>
    </Tab>
    <Tab title="Settings">
      <slot name="settings">Settings tab</slot>
    </Tab>
  </Tabs>
</template>

<style lang="postcss">
.Tabs {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .van-tabs__content {
    flex: 1;
  }

  .van-tab__panel {
    height: 100%;
  }
}
</style>
