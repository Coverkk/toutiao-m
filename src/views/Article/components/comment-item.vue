<template>
    <van-cell class="comment-item">
        <van-image slot="icon" class="avatar" round fit="cover" :src="comment.aut_photo" />
        <div slot="title" class="title-wrap">
            <div class="user-name">{{comment.aut_name}}</div>
            <van-button :loading="loading" class="like-btn" :class="{liked : comment.is_liking}" :icon="comment.is_liking ? 'good-job' : 'good-job-o'" @click="onLiking">{{comment.like_count > 0 ? comment.like_count : '赞'}}</van-button>
        </div>

        <div slot="label">
            <p class="comment-content">{{comment.content}}</p>
            <div class="bottom-info">
                <span class="comment-pubdate">{{comment.pubdate | relativeTime}}</span>
                <van-button class="reply-btn" round @click="$emit('reply-click', comment)">回复 {{comment.reply_count}}</van-button>
            </div>
        </div>
    </van-cell>
</template>

<script>
import { goodJobAPI, cancelGoodJobAPI } from '@/api'
export default {
  data () {
    return {
    //   this.comment.is_liking: this.comment.is_liking
      loading: false
    }
  },
  //   model: {
  //     prop: 'comment',
  //     event: 'comment-like'
  //   },
  props: {
    comment: {
      type: Object,
      required: true
    },
    index: {
      type: Number
    }
  },
  methods: {
    async onLiking () {
      //   加载状态
      this.loading = true
      //   评论点赞相关事件
      try {
        if (this.comment.is_liking) {
        //   console.log('取消')
          // 如果此时点赞状态为 true 说明已经点赞了，此次点击，是要取消点赞
          await cancelGoodJobAPI(this.comment.com_id)
        } else {
        //   console.log('点赞')
        //   console.log(this.comment.com_id)
          // 如果此时点赞状态为 false 说明未点赞，此次点击，是要点赞
          await goodJobAPI(this.comment.com_id)
        }
        this.$toast.success({
          message: this.comment.is_liking ? '取消点赞' : '点赞成功',
          duration: 500
        })
        // this.this.comment.is_liking = !this.this.comment.is_liking
        this.$emit('commentLiking', !this.comment.is_liking, this.index)
      } catch (error) {
        console.log(error)
        this.$toast.fail({
          message: '操作失败，请稍后重试',
          duration: 500
        })
      }
      //   加载状态
      this.loading = false
    }
  }
}
</script>

<style scoped lang="less">
.comment-item {
    .avatar {
        width: 72px;
        height: 72px;
        margin-right: 25px;
    }

    .title-wrap {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .user-name {
            color: #406599;
            font-size: 26px;
        }
    }

    .comment-content {
        font-size: 32px;
        color: #222222;
        word-break: break-all;
        text-align: justify;
    }

    .comment-pubdate {
        font-size: 19px;
        color: #222;
        margin-right: 25px;
    }

    .bottom-info {
        display: flex;
        align-items: center;
    }

    .reply-btn {
        // width: 135px;
        height: 48px;
        line-height: 48px;
        font-size: 21px;
        color: #222;
    }

    .like-btn {
        height: 30px;
        padding: 0;
        border: none;
        font-size: 19px;
        line-height: 30px;
        margin-right: 7px;

        .van-icon {
            font-size: 30px;
        }
        &.liked {
          color: #e5645f;
        }
    }
}
</style>
