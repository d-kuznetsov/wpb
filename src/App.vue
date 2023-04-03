<script>
import { ref, computed } from 'vue';
import { ConfigProvider } from 'vant';
import defaultSettings from './default-settings';
import MainTab from './components/MainTab.vue';
import SettingTab from './components/SettingTab.vue';
import Tabs from './components/Tabs.vue';

export default {
  components: {
    ConfigProvider,
    MainTab,
    SettingTab,
    Tabs,
  },
  setup() {
    const settingsStr = ref(
      localStorage.getItem('app-settings') || JSON.stringify(defaultSettings)
    );
    const settings = computed(() => {
      return JSON.parse(settingsStr.value);
    });

    return {
      settingsStr,
      settings,
    };
  },
};
</script>

<template>
  <ConfigProvider theme="dark">
    <div class="app">
      <Tabs>
        <template v-slot:main>
          <MainTab :exercises="settings.workout.exercises" />
        </template>
        <template v-slot:settings>
          <SettingTab v-model="settingsStr" />
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
