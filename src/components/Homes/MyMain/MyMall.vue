<template>
  <div id="MyMall">
    <!-- 搜索框 -->
    <div class="seoBox">
      <el-autocomplete class="input-with-select" v-model.trim="state1" :fetch-suggestions="querySearch" placeholder="输入关键字或类别" :trigger-on-focus="false" @keyup.enter.native="sousuo" clearable>
        <el-button slot="append" icon="el-icon-search" @click="sousuo">搜索</el-button>
      </el-autocomplete>
    </div>
    <!-- 搜索结果 -->

    <div id="MyMallList">
      <MySearchResults :state="sonstate"></MySearchResults>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import MySearchResults from '@/components/Homes/MyMain/MySearchResults/MySearchResults.vue'
export default {
  name: 'MyMall',
  data() {
    return {
      restaurants: [],
      state1: '',
      sonstate: ''
    }
  },
  methods: {
    // 搜索
    sousuo() {
      if (this.state1 == '') {
        const refresh = 'refresh'
        this.$store.commit('SOUSUO', refresh)
      }
      this.sonstate = this.state1
      this.$store.commit('SOUSUOCLICK', this.state1)
    },
    querySearch(queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter(queryString) {
      return restaurant => {
        return restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) > -1
      }
    },
    loadAll() {
      return this.listItem
    }
  },
  mounted() {
    this.restaurants = this.loadAll()
  },
  computed: {
    ...mapState(['listItem'])
  },
  watch: {
    state1: {
      handler(newVal, oldVal) {
        this.$store.commit('SOUSUO', newVal)
        if (newVal == '') {
          this.sonstate = newVal
        }
      },
      immediate: true
    }
  },
  components: {
    MySearchResults
  }
}
</script>

<style lang="less" scoped>
#MyMall {
  position: relative;
  padding-top: 100px;
  padding-bottom: 50px;

  margin-bottom: -50px;
  .seoBox {
    position: absolute;
    left: 50%;
    top: 30px;
    width: 350px;
    transform: translateX(-50%);
    .input-with-select {
      width: 100%;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
      /deep/.el-input-group__append {
        background-color: transparent;
        .el-button {
          position: relative;
          color: #000000;
          text-transform: uppercase;
          transition: 0.5s;
          -webkit-box-reflect: below 1px linear-gradient(transparent, #0003);
          .el-icon-search {
            font-weight: 600;
          }
          &:hover {
            background: #21ebff;
            color: white;
            box-shadow: 0 0 50px #21ebff;
            transition-delay: 0.5s;
          }
          &::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 10px;
            height: 10px;
            border-top: 2px solid #21ebff;
            border-left: 2px solid #21ebff;
            transition: 0.5s;
            transition-delay: 0.5s;
          }
          &:hover::before {
            width: 100%;
            height: 100%;
            transition-delay: 0s;
          }

          &::after {
            content: '';
            position: absolute;
            right: 0;
            bottom: 0;
            width: 10px;
            height: 10px;
            border-bottom: 2px solid #21ebff;
            border-right: 2px solid #21ebff;
            transition: 0.5s;
            transition-delay: 0.5s;
          }

          &:hover::after {
            width: 100%;
            height: 100%;
            transition-delay: 0s;
          }
        }
      }
    }
  }
  #MyMallList {
    margin: 0 auto;
    padding: 15px;
    width: 50vw;
    min-height: 500px;
  }
}
</style>