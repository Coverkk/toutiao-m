<template>
  <div>
    <van-cell :title="article.title" />
  </div>
</template>

<script>
export default {
  props: {
    article: {
      type: Object,
      required: true
    }
  }
}
</script>

<style>

</style>
