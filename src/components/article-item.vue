<template>
  <van-cell class="article-item">
    <template #title>
      <div class="title">
        {{ article.title }}
      </div>
    </template>
    <template #label>
      <div v-if="article.cover.type === 3">
        <div class="img-item" v-for="(img, index) in article.cover.images" :key="index">
          <van-image
          width="100"
          height="100"
          :src="img"
          />
        </div>
      </div>
      <div class="label">
        <span>{{ article.aut_name }}</span>
        <span>{{ article.comm_count }}</span>
        <span>{{ article.pubdate }}</span>
      </div>
    </template>
    <template #default v-if="article.cover.type === 1">
      <van-image
      width="100"
      height="100"
      :src="article.cover.images[0]"
      />
    </template>
  </van-cell>
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
