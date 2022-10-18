<template>
  <!-- :to="'/article/' + article.art_id" -->
  <!-- :to="`/article/${article.art_id}`" -->
  <van-cell class="article-item" :to="{
    // 根据路由名称进行跳转
    name: 'article',
    // 传递路由动态参数
    params: {
      // 属性名为路由路径中设计的动态参数名称
      articleId: article.art_id
    }
  }">
    <template #title>
      <div class="title van-multi-ellipsis--l2">
        {{ article.title }}
      </div>
    </template>
    <template #label>
      <div v-if="article.cover.type === 3" class="cover-wrap">
        <div class="img-item" v-for="(img, index) in article.cover.images" :key="index">
          <van-image
          fit="cover"
          :src="img"
          class="cover-item-img"
          />
        </div>
      </div>
      <div class="label-info-wrap">
        <span>{{ article.aut_name }}</span>
        <span>{{ article.comm_count }}</span>
        <span>{{ article.pubdate | relativeTime(article.pubdate) }}</span>
      </div>
    </template>
    <template #default v-if="article.cover.type === 1">
      <van-image
      class="right-cover"
      fit="cover"
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

<style scoped lang="less">
.article-item {
    .title {
        font-size: 32px;
        color: #3a3a3a;
    }
    .van-cell__value {
        flex: unset;
        width: 232px;
        height: 146px;
        padding-left: 25px;
        .right-cover {
          width: 232px;
          height: 146px;
        }
    }
    .label-info-wrap span {
        font-size: 22px;
        color: #b4b4b4;
        margin-right: 25px;
    }
    .cover-wrap {
        display: flex;
        padding: 30px 0;
        .img-item {
            flex: 1;
            height: 146px;
            &:not(:last-child) {
                padding-right: 4px;
            }
            .cover-item-img {
                width: 100%;
                height: 146px;
            }
        }
    }
}
</style>
