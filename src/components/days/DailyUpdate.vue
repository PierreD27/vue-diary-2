<script lang="ts" setup>
interface Props {
  day: string,
  min: string,
  max: string,
}


defineProps<Props>()
</script>

<template>
  <div class="daily-item">
    <p>day: {{ day }}</p>
    <p>min: {{ min }}</p>
    <p>max: {{ max }}</p>
  </div>
</template>

<style lang="scss">
.daily-item {
  background: rgb(111, 52, 179);
  padding: 0.5rem 0.7rem;
  border-radius: 0.7rem;

  p {
    color: white;
  }
}
</style>