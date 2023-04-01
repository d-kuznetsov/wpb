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
  <Tabs v-model:active="active" class="tabs">
    <Tab title="Main">
      <slot name="main">Main tab</slot>
    </Tab>
    <Tab title="Settings">
      <slot name="settings">
        <div class="empty-tab-content">Coming soon</div>
      </slot>
    </Tab>
  </Tabs>
</template>

<style lang="postcss">
.tabs {
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

  .empty-tab-content {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
}

.van-theme-dark .tabs {
  --van-tabs-nav-background: var(--bg-color-dark);
}
</style>
