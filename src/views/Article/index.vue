<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      left-arrow
      title="黑马头条"
      @click-left="$router.back()"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap" >
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="loading">
        <van-loading
          color="#3296fa"
          vertical
        >加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div class="article-detail markdown-body" v-else-if="articleDetails.title">
        <!-- 文章标题 -->
        <h1 class="article-title">{{articleDetails.title}}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="articleDetails.aut_photo"
          />
          <div slot="title" class="user-name">{{articleDetails.aut_name}}</div>
          <div slot="label" class="publish-date">{{articleDetails.pubdate | relativeTime}}</div>

          <!--
            模板中的 $event 是事件参数
            当我们传递给子组件的数据既要使用，还要修改。
                传递： props
                  :is_followed="articleDetails.is_followed"
                修改：自定义事件
                  @onFollow="articleDetails.is_followed = $event"
            简写方式：在组件上使用 v-model
                value="articleDetails.is_followed"
                @input="articleDetails.is_followed = $event"
            如果需要修改 v-model 的规则名称，可以通过修改子组件的 model 属性来配置修改
            一个组件上只能使用一次 v-model
            如果有多个数据需要实现类型于 v-model 的效果，可以使用属性的 .sync 修饰符
           -->
          <!-- <FollowUser
          :is_followed="articleDetails.is_followed"
          :aut_id="articleDetails.aut_id"
          @onFollow="onFollow"
          class="follow-btn"></FollowUser> -->
          <FollowUser
          v-model="articleDetails.is_followed"
          :aut_id="articleDetails.aut_id"
          class="follow-btn"></FollowUser>
          <!-- <van-button
            v-if="articleDetails.is_followed"
            :loading="following"
            class="follow-btn"
            round
            size="small"
            @click="onFollow()"
          >已关注</van-button>
          <van-button
            :loading="following"
            v-else
            class="follow-btn"
            type="info"
            color="#3296fa"
            round
            size="small"
            icon="plus"
            @click="onFollow()"
          >关注</van-button> -->
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div class="article-content" ref="article_content" v-html="articleDetails.content"></div>
        <van-divider>正文结束</van-divider>
        <!-- 底部区域 -->
        <div class="article-bottom">
        <van-button
        class="comment-btn"
        type="default"
        round
        size="small"
        @click="isPostShow = true"
        >写评论</van-button>
        <van-icon
            name="comment-o"
            :badge="commentTotalCount"
            color="#777"
        />
        <!-- 收藏文章 -->
        <CollectArticle v-model="articleDetails.is_collected" :artId="articleDetails.art_id"></CollectArticle>
        <!-- 收藏文章 -->
        <!-- <van-icon
            color="#777"
            name="star-o"
        /> -->
        <!-- <van-icon
            color="#777"
            name="good-job-o"
        /> -->
        <!-- 点赞文章 -->
        <LikeArticle v-model="articleDetails.attitude" :artId="articleDetails.art_id"></LikeArticle>
        <!-- 点赞文章 -->
        <van-icon name="share" color="#777777"></van-icon>
        </div>
        <!-- /底部区域 -->
        <!-- 评论列表 -->
        <CommentList
        :artId="articleDetails.art_id"
        @onload-success="getCommentData"
        :list="commentList"
        @commentLiking="onCommentLiking"
        @reply-click="onReply"></CommentList>
        <!-- 评论列表 -->
        <!-- 评论弹出层 -->
        <van-popup
        v-model="isPostShow"
        position="bottom"
        >
        <CommentPost :target="articleDetails.art_id" :is-post-article-comment="true" @postSuccess="onPostSuccess"></CommentPost>
        </van-popup>
        <!-- 评论弹出层 -->
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div class="error-wrap" v-else-if="status === 404">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-else>
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>

    <!-- 回复评论弹出层 -->
    <!--
      因为 popup 弹出层，默认是懒加载的，只有在第一次展示的时候，才会渲染里面的内容，后面都是在显示和隐藏之间进行切换
      这就造成一个问题，弹出层懒加载，里面的组件也不会被销毁，点击回复评论，弹出的都是同一个 CommentReply 组件，所以里面的数据也不会改变
      这就导致，查看的所有回复，都是一样的，不会重新加载其他评论的回复
      解决这个问题，就需要在每次 弹出层关闭 时，销毁组件，下次弹出再重新渲染组件
      用 v-if 就可以解决
        true 创建组件，并渲染
        false 销毁组件
     -->
    <van-popup
    v-model="isReplyShow"
    position="bottom"
    style="height:90%"
    >
      <CommentReply
      :currentComment="currentComment"
      @close="isReplyShow = false"
      v-if="isReplyShow"
      @replySuccess="onReplySuccess">
      </CommentReply>
    </van-popup>
    <!-- 回复评论弹出层 -->
  </div>
</template>

<script>
import './github-markdown.css'
import { getArticleDetailAPI } from '@/api'
import { ImagePreview } from 'vant'
import FollowUser from '@/components/follow-user.vue'
import CollectArticle from '@/components/collect-article.vue'
import LikeArticle from '@/components/like-article.vue'
import CommentList from './components/comment-list.vue'
import CommentPost from './components/comment-post.vue'
import CommentReply from './components/comment-reply.vue'
export default {
  data () {
    return {
      articleDetails: {}, // 文章详情
      loading: true, // 文章加载状态
      status: 0,
      following: false,
      commentTotalCount: 0, // 文章评论总数量
      isPostShow: false, // 控制评论弹出层显示
      commentList: [], // 评论列表
      isReplyShow: false, // 控制回复评论弹出层显示
      currentComment: {} // 当前回复的评论
    }
  },
  props: {
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  // 给所有后代组件提供数据
  provide: function () {
    return {
      artId: this.articleId
    }
  },
  async created () {
    // 在组件初始化之后，获取新闻文章详情
    await this.loadArticle()
  },
  methods: {
    async loadArticle () {
      // 开启加载状态
      this.loading = true
      try {
        // 调用接口，获取文章详情
        const { data: { data } } = await getArticleDetailAPI(this.articleId)
        // console.log(data)
        this.articleDetails = data // 保存文章详情
        // 因为数据驱动视图，不是立即执行，需要延迟一点时间，才能获取到DOM
        setTimeout(() => {
          this.imagesPreview()
        }, 0)
      } catch (error) {
        // 如果请求的资源不存在，设置状态为404
        if (error.response.status === 404) {
          this.status = 404
        }
        // console.log('获取文章详情失败', error)
      }
      // 获取到文章详情或者失败，都要设置加载状态失效
      this.loading = false
    },
    imagesPreview () {
      // 图片点击预览
      // 获取到文章内容的DOM
      const articleContent = this.$refs.article_content
      // console.log(articleContent)
      // 获取到文章内容里面的所有img  DOM
      const img = articleContent.querySelectorAll('img')
      // 定义存储img地址的数组
      const images = []
      img.forEach((img, index) => {
        // 将img的图片地址，存到images数组中
        images.push(img.src)
        // 给每个img标签添加点击事件,处理图片预览
        img.addEventListener('click', () => {
          ImagePreview({
            images,
            startPosition: index
          })
        })
      })
      // console.log(images)
    },
    onFollow (isFollow) {
      // 更新关注状态
      this.articleDetails.is_followed = isFollow
    },
    input (val) {
      this.articleDetails.is_collected = val
    },
    like (val) {
      this.articleDetails.attitude = val
    },
    getCommentData (comData) {
      // 获取文章评论数据
      // 获取评论总数量
      this.commentTotalCount = comData.total_count
      // 获取评论列表
      this.commentList.push(...comData.results)
    },
    onPostSuccess (newComment) {
      // 评论发表成功
      // 关闭弹出层
      this.isPostShow = false
      // 将新发的评论，放到最前面
      this.commentList.unshift(newComment)
      // 评论总数+1
      this.commentTotalCount += 1
    },
    onCommentLiking (isLiking, index) {
      // 评论点赞事件
      this.commentList[index].is_liking = isLiking
      if (isLiking) {
        // 点赞，点赞数+1
        this.commentList[index].like_count += 1
      } else {
        // 取消点赞，点赞数 -1
        this.commentList[index].like_count -= 1
      }
    },
    onReply (comment) {
      // 回复评论
      // 弹出回复评论弹出层
      this.isReplyShow = true
      // console.log(comment)
      // 将当前评论，传递给回复评论的组件
      this.currentComment = comment
    },
    onReplySuccess (commentId) {
      // 回复评论成功，回复总数+1
      // 获取到回复的评论对应的索引
      const index = this.commentList.findIndex(com => com.com_id === commentId)
      // 根据索引，找到对应评论，并将回复总数+1
      this.commentList[index].reply_count += 1
    }
  },
  components: {
    FollowUser,
    CollectArticle,
    LikeArticle,
    CommentList,
    CommentPost,
    CommentReply
  }
}
</script>

<style scoped lang="less">
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>
