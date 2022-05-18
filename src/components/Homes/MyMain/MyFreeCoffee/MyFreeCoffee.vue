<template>
  <div>
    <el-drawer title="选择咖啡" direction="ltr" :visible.sync="drawer_" :with-header="true" :modal="false">
      <ul class="coffeesBox">
        <!-- 循环项 -->
        <el-card v-for="item in coffeeList" :key="item.kid" class="mt-2">
          <div slot="header" class="titleBox">
            <span class="listTitle">{{ item.kname }}</span>
            <transition-group name="animate__animated animate__bounce" enter-active-class="animate__swing" leave-active-class="animate__backOutUp">
              <span class="el-icon-circle-plus-outline adds" v-if="item.clickNum" @click.once="addCoffee(item)" key="1"></span>
              <span class="yiAdd" v-else key="2">已添加</span>
            </transition-group>
          </div>

          <div class="coffeeList">
            <el-image :src="item.image" class="listImg" lazy></el-image>
            <!-- 价格和数量 -->
            <div class="listSp">
              <div class="hotBox" v-if="item.labels === 0">HOT</div>
              <div class="newBox" v-if="item.labels === 1">NEW</div>
              <p class="listDescribe">{{ item.title }}</p>
              <div class="price">
                <span class="newPrice">￥{{ parseFloat(item.kprice).toFixed(1) }}</span>
                <span class="oldPrice">￥{{ parseFloat(item.oldprice).toFixed(1) }}</span>
              </div>
            </div>
          </div>
        </el-card>
        <el-divider><span :style="{fontSize:'13.5px',color:'#606266'}">我也是有底线哒</span></el-divider>
      </ul>
    </el-drawer>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import bus from '@/eventBus.js'
export default {
  name: 'MyFreeCoffee',
  props: {
    drawer: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
  created() {},
  computed: {
    ...mapState(['coffeeList']),
    drawer_: {
      get() {
        return this.drawer
      },
      set(v) {
        console.log(v)
        this.$emit('changeDrawer', v)
      }
    }
  },
  methods: {
    addCoffee(item) {
      this.$store.commit('REMOVEADD', item)
      bus.$emit('addCardsItem', item)
    }
  }
}
</script>

<style lang="less" scoped>
/deep/.el-drawer {
  width: 458px !important;
}
.coffeesBox {
  width: 100%;
  height: 100%;
  padding: 11px 30px;
  overflow-x: hidden;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 4px;
    /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
  }

  &::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 10px;
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    // background: #535353;
    background-color: #c0c4cc;
  }

  &::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    background: #ededed;
  }
  // 标题
  .titleBox {
    position: relative;
    // 已添加
    .yiAdd {
      position: absolute;
      top: 0;
      right: 5px;
      font-size: 15px;
      color: #909399;
    }
    .adds {
      position: absolute;
      top: 0;
      right: 5px;
      cursor: pointer;
      padding: 2px 0;
      font-size: 20px;
      color: #f00019;
    }
  }
  .listTitle {
    // font-size: 2rem;
    font-weight: 600;
    font-family: '幼圆';
  }
  .coffeeList {
    width: 100%;
    height: 80px;
    overflow: hidden;
    // 右边
    .listSp {
      position: relative;
      width: 77%;
      height: 100%;
      float: right;
      padding-left: 13px;
      .hotBox {
        position: absolute;
        right: 5px;
        top: 4px;
        font-style: italic;
        color: #f00019;
        font-size: 13px;
        text-shadow: 0 0 20px red;
      }
      .newBox {
        position: absolute;
        right: 5px;
        top: 4px;
        font-style: italic;
        color: #67c23a;
        font-size: 13px;
        text-shadow: 0 0 20px green;
      }
      // 描述
      .listDescribe {
        width: 70%;
        margin-top: 5px;
        font-size: 13px;
      }
      // 商品数量和价格
      .price {
        position: absolute;
        bottom: 0px;
        left: 10px;
        .newPrice {
          margin-right: 7px;
          font-weight: 600;
          color: #f00019;
        }
        .oldPrice {
          font-size: 13px;
          text-decoration: line-through;
          color: #909399;
        }
      }
    }
    .listImg {
      float: left;
      width: 23%;
    }
  }
}
</style>