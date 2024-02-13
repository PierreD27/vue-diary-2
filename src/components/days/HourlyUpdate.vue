<script lang="ts" setup>
interface Props {
  temperature: string,
  hour: string
}

defineProps<Props>()
</script>

<template>
  <div class="hour-wrapper">
    <p>temp: {{ temperature }}</p>
    <p>h: {{ hour }}</p>
  </div>
</template>

<style lang="scss">
.hour-wrapper {
  background: rgb(14, 168, 168);
  padding: 0.5rem 0.7rem;
  border-radius: 0.7rem;
}
</style>