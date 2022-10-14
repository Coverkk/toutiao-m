<template>
    <div class="article-list">
        {{channel.name}}
    </div>
</template>

<script>
export default {
  props: {
    channel: {
      type: Object,
      required: true
    }
  }
}
</script>

<style>

</style>
