<script>
import { ConfigProvider } from 'vant';
import MainTab from './components/MainTab.vue';
import Tabs from './components/Tabs.vue';

export default {
  components: {
    ConfigProvider,
    MainTab,
    Tabs,
  },
};
</script>

<template>
  <ConfigProvider theme="dark">
    <div class="app">
      <Tabs>
        <template v-slot:main>
          <MainTab />
        </template>
      </Tabs>
    </div>
  </ConfigProvider>
</template>

<style lang="postcss">
.app {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  width: 100%;
  max-width: 640px;
  margin: 0 auto;
}
</style>
