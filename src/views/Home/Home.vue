<template>
  <div class="home-container">

    <!-- 标题部分 -->
    <van-nav-bar title="Sky Shopping" fixed class="van-nav-bar" />

    <!-- 下拉刷新 -->
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <!-- 上拉加载 -->
      <van-list v-model="loading" :finished="finished" finished-text="已经到底啦！" @load="onLoad">
        <ArticleInfo v-for="item in artList" :key="item.id" :title="item.title" :author="item.aut_name"
          :cmtCount="item.comm_count" :time="item.pubdate" :cover="item.cover"></ArticleInfo>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticleListAPI } from '@/api/articleAPI.js';
import ArticleInfo from '@/components/Article/ArticleInfo.vue';
import _ from 'lodash'
let fn = null
export default {
  components: { ArticleInfo },
  data() {
    return {
      page: 1,
      limit: 10,
      artList: [],
      // 是否正在加载下一页数据，如果 loading 为 true，则不会反复触发 load 事件
      // 每当下一页数据请求回来之后，千万要记得，把 loading 从 true 改为 false
      loading: true,
      // 所有数据是否加载完毕了，如果没有更多数据了，一定要把 finished 改成 true
      finished: false,
      //是否处于下拉刷新
      refreshing: false
    };
  },
  created() {
    this.initArticleList();
  },
  activated() {
    fn = this.recordTopHandler()
    window.addEventListener('scroll', fn)
  },
  deactivated() {
    window.removeEventListener('scroll', fn)
  },
  methods: {
    //封装文章列表请求方法
    async initArticleList(refresh) {
      const { data: res } = await getArticleListAPI(this.page, this.limit);
      console.log(res);
      //判断是下拉刷新还是上拉加载
      if (refresh) {
        //refresh为真，是下拉刷新
        //把加载的内容和原内容进行拼接，且新内容在上，原内容在下
        this.artList = [...res, ...this.artList]
        //加载并拼接完数据后，把下拉刷新的状态改为false
        this.refreshing = false
      } else {
        //refresh为假，是上拉加载
        //把加载的内容和原内容进行拼接，且原内容在上，新内容在下
        this.artList = [...this.artList, ...res]
        //数据请求完时，把loading改为false
        this.loading = false
        //如果加载下一页的为空数组，则认定为所有资源都加载完了，把finish改为true
      }
      if (res.length == 0) {
        this.finished = true
      }
    },
    onLoad() {
      console.log('上拉加载了！');
      //加载下一页
      this.page++
      //重新请求获取接口数据，并进行改变
      this.initArticleList()
    },
    onRefresh() {
      console.log('下拉刷新了！');
      //加载下一页
      this.page++
      this.initArticleList(true)
    },
    recordTopHandler() {
      return _.debounce(
        () => {
          this.$route.meta.top = window.scrollY
        },
        50,
        { trailing: true }
      )
    }
  },
}
</script>

<style lang="less" scoped>
.home-container {
  padding: 46px 0 50px 0;
}

.van-nav-bar {
  box-shadow: 0 0 10px 5px pink;
}
</style>