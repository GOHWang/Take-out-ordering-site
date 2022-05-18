<template>
  <div id="goods" v-loading="loading" ref="goods">
    <!-- 循环项 -->
    <div class="goodsList" v-for="item in lists" :key="item.kid">

      <el-tooltip :content="item.kname" placement="bottom-end" effect="light">
        <p class="itemtitle">{{ item.kname }}</p>
      </el-tooltip>
      <div class="imghr">
        <div class="huobao" v-if="item.labels === 0">HOT</div>
        <div class="NEW" v-if="item.labels === 1">NEW</div>
        <el-image :src="item.image" class="imglist" :preview-src-list="[item.image]" placeholder="fds" lazy title="点击查看大图"></el-image>
      </div>
      <div class="jiesuan">
        <div class="bigsprice">￥{{ parseFloat(item.kprice).toFixed(1) }}<span>￥{{ parseFloat(item.oldprice).toFixed(1) }}</span></div>
        <div class="adds">
          <transition appear name="animate__animated animate__bounce" enter-active-class="animate__flip" leave-active-class="animate__backOutUp">
            <span class="el-icon-circle-plus addlists" v-if="item.clickNum" @click.once="addcards(item)"></span>
          </transition>
          <transition appear name="animate__animated animate__bounce" enter-active-class="animate__rollIn" leave-active-class="animate__fadeOutUp">
            <el-tooltip class="item" effect="dark" content="亲，库存紧张。每个商品限量购买一份哦！" placement="top">
              <span class="el-icon-circle-check addlists" v-if="!item.clickNum" style="color:#67c23a;cursor:not-allowed;font-weight:600;"></span>
            </el-tooltip>
          </transition>
        </div>
      </div>
    </div>
    <el-divider><span :style="{fontSize:'13.5px',color:'#606266'}">我也是有底线哒</span></el-divider>
  </div>
</template>

<script>
import bus from '@/eventBus.js'
import lists from '@/components/lists/index.js'
export default {
  name: 'MyGoods',
  props: ['carid'],
  data() {
    return {
      num: 1,
      fatherList: lists,
      lists: [],
      loading: false,
      scoll: true
    }
  },
  created() {
    bus.$on('removeCardsItem', itemList => {
      this.fatherList.some(item => {
        item.item.some(lists => {
          if (itemList.res2.kid === lists.kid) {
            lists.clickNum = true
            return true
          } else if (itemList.res2 === true) {
            lists.clickNum = true
          }
        })
      })
    })
  },

  watch: {
    carid: {
      handler(newval) {
        if (!this.scoll) {
          this.$refs.goods.scrollTop = 0
        }
        this.loading = true
        setTimeout(() => {
          this.scoll = false
          this.loading = false
          // 循环lists列表，若lists的id等于菜单的id在this.lists里面拷贝当前选中索引的数组
          this.fatherList.some(item => {
            if (item.id === newval) {
              this.lists = [...item.item]
              return true
            }
          })
        }, 400)
      },
      // 页面首次加载调用
      immediate: true
    }
  },
  methods: {
    addcards(item) {
      // bus.$emit('addCardsItem', item)

      this.lists = this.lists.filter(val => {
        if (val.kid === item.kid) {
          val.clickNum = false
        }
        return val
      })

      bus.$emit('addCardsItem', item)
    }
  }
}
</script>

<style lang="less" scoped>
#goods {
  width: 100%;
  height: 100%;

  overflow-x: hidden;
  overflow-y: scroll;
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 18px;
  // 滚动条样式
  &::-webkit-scrollbar {
    width: 3.5px; /*高宽分别对应横竖滚动条的尺寸*/
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: #909399;
  }
  .goodsList {
    margin-left: 18px;
    margin-top: 18px;
    width: 201px;
    height: 240px;
    border: 1px solid #dcdfe6;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    border-radius: 6px;
    overflow: hidden;
    .itemtitle {
      padding: 0 20px;
      width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      text-align: center;
      height: 40px;
      line-height: 45px;
      font-weight: 600;
      font-family: '幼圆';
    }
    .jiesuan {
      position: relative;
      text-align: center;
      line-height: 45px;
      height: 45px;

      .adds {
        width: 30px;
        height: 100%;
        .addlists {
          position: absolute;
          top: 0;
          right: 12px;
          line-height: 45px;
          cursor: pointer;
          color: #f00019;
          font-size: 25px;
        }
      }
      .bigsprice {
        font-family: PingFangSC-Medium;
        font-size: 16px;
        font-weight: 600;
        color: #fd3f31;
        span {
          margin-left: 3px;
          color: #909399;
          font-size: 13.5px;
          text-decoration: line-through;
          font-weight: 500;
        }
      }
    }
    .imghr {
      position: relative;
      width: 100%;
      height: 150px;
      border-top: 2px solid #e4e7ed;
      border-bottom: 2px solid #e4e7ed;
      border-collapse: collapse;
      display: flex;
      justify-content: center;
      align-items: center;
      .huobao {
        position: absolute;
        right: 16px;
        // top: -37px;
        top: 5px;
        width: 30px;
        font-style: italic;
        color: #f00019;
        font-size: 13px;
        text-shadow: 0 0 20px red;
      }
      .NEW {
        position: absolute;
        right: 16px;
        // top: -37px;
        top: 5px;
        width: 30px;
        font-style: italic;
        color: #67c23a;
        font-size: 13px;
        text-shadow: 0 0 20px green;
      }
      .imglist {
        width: 150px;
      }
    }
  }
}
</style>