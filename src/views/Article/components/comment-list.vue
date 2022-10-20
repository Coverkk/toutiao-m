<template>
  <van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  @load="onLoad"
  :error.sync="error"
  :immediate-check="false"
  error-text="加载失败，请点击重试"
  >
    <!-- <van-cell v-for="comment in list" :key="comment.com_id" :title="comment.content" /> -->
    <CommentItem
    v-for="(comment, index) in list"
    :key="comment.com_id" :comment="comment"
    :index="index"
    @commentLiking="commentLiking"
    @reply-click="$emit('reply-click', $event)"></CommentItem>
  </van-list>
</template>

<script>
import { getCommentListAPI } from '@/api'
import CommentItem from './comment-item.vue'
export default {
  data () {
    return {
      // list: [], // 评论列表
      loading: false,
      finished: false,
      offset: null,
      commentData: {}, // 评论存储对象
      limit: 10, // 每次获取评论的数量
      error: false // 加载失败状态
    }
  },
  props: {
    artId: {
      type: [Number, String, Object],
      required: true
    },
    list: {
      type: Array,
      default: () => []
    },
    type: {
      type: String,
      // 自定义 props 数据验证
      validator (val) {
        return ['a', 'c'].includes(val)
      },
      default: 'a'
    }
  },
  created () {
    // 组件初始化之后，立即获取评论总数量
    // 手动初始 onLoad 的话，不会自动开始初始的 loading
    // 所以需要手动开启初始 loading
    this.loading = true
    this.onLoad()
  },
  methods: {
    onLoad () {
      this.getComment()
    },
    async getComment () {
      // 获取文章评论
      try {
        const { data: { data } } = await getCommentListAPI({
          type: this.type, // 评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
          source: this.artId.toString(), // 源id，文章id或评论id
          offset: this.offset, // 获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
          limit: this.limit // 获取的评论数据个数，不传表示采用后端服务设定的默认每页数据量
        })
        // if (Math.random() > 0.5) {
        //   JSON.parse('dahfak')
        // }
        // console.log(data)
        // 将获取到的评论数据，保存
        this.commentData = data
        // console.log(data)
        this.$emit('onload-success', data)
        // this.list.push(...data.results)
        this.loading = false
        if (data.results.length === this.limit) {
          // 获取到的评论数组长度等于 limit 说明后续还有数据
          // 设置页面，获取下一页数据
          this.offset = data.last_id
        } else {
          // 如果没有数据，或者获取到的评论小于 limit 那么就说明所有评论都加载完成了
          this.finished = true
        }
      } catch (error) {
        this.error = true
        this.loading = false
      }
    },
    commentLiking (comment) {
      this.$emit('commentLiking', comment)
    }
  },
  components: {
    CommentItem
  }
}
</script>

<style>

</style>
