<template>
  <div id="MySearchResults">
    <!-- 换一组 -->
    <div class="reset suijis" @click="result">
      <span class="el-icon-refresh gg gg1"></span>
      <p :style="{fontSize:'14px',fontWeight: '600'}">随机</p>
    </div>
    <div class="reset jiesuan" @click="jiesuan">

      <span class="el-icon-shopping-cart-full gg gg2"></span>
      <div class="nums">{{ zongjian }}
      </div>
      <p :style="{fontSize:'14px',fontWeight: '600'}">去结算</p>
    </div>
    <el-row :gutter="10">
      <p class="tuijian">{{ state == '' ? '推荐商品' : '搜索结果' }}</p>
      <el-empty :image="require('@/assets/images/quesheng.png')" :image-size="400" v-if="searchList.length === 0" description="暂无相关商品"></el-empty>
      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" class="searchList" v-for="(item,index) in searchList" :key="index">
        <el-card :body-style="{ padding: '0px' }" shadow="hover">
          <div class="imgBox">
            <el-image :src="item.image" class="image">
              <div slot="placeholder">
                加载中<span class="dot">...</span>
              </div>
            </el-image>
          </div>
          <div style="padding: 14px;">
            <p style="text-align:center">{{ item.kname }}</p>
            <div class="bottom clearfix">
              <span class="newprice">￥{{ item.kprice }}</span>
              <span class="price ml-2">￥{{ item.oldprice }}</span>
              <transition-group appear name="animate__animated animate__bounce" enter-active-class="animate__tada" leave-active-class="animate__fadeOutTopRight">
                <span class="el-icon-sell button" @click="add(item)" v-if="item.clickNum" key="1"></span>
                <span class="yitianj" v-if="!item.clickNum" key="2">已添加</span>
              </transition-group>
            </div>
          </div>
        </el-card>
      </el-col>

    </el-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import bigList from '@/components/lists/index.js'
import bus from '@/eventBus.js'

export default {
  name: 'MySearchResults',
  data() {
    bus.$on('shangpinSum', val => {
      this.zongjian = val
    })
    return {
      zongjian: 0
    }
  },
  props: ['state'],
  computed: {
    ...mapState(['searchList'])
  },
  methods: {
    jiesuan() {
      this.$router.push('/home')
      bus.$emit('backhome', 1)
    },
    add(val) {
      bigList.some(item => {
        item.item.some(item => {
          if (item.clickNum) {
            if (val.kid === item.kid) {
              item.clickNum = false
            }
          }
        })
      })
      bus.$emit('addCardsItem', val)
    },
    result() {
      const refresh = 'refresh'
      this.$store.commit('SOUSUO', refresh)
    }
  },
  created() {}
}
</script>

<style lang="less" scoped>
#MySearchResults {
  position: relative;
  .jiesuan {
    top: 125px;
    .nums {
      position: absolute;
      background-color: #67c23a;
      color: white;
      font-size: 13px;
      font-weight: 600;
      text-align: center;
      line-height: 20px;
      right: -10px;
      top: -3px;
      line-height: 20px;
      min-width: 20px;
      height: 20px;
      border-radius: 50%;
    }
  }
  .suijis {
    top: 40px;
  }
  .reset {
    position: absolute;
    cursor: pointer;

    right: -90px;
    width: 80px;
    height: 80px;
    border: 2px solid #c0c4cc;
    background-color: white;
    border-radius: 5px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .gg {
      font-size: 35px;
      font-weight: 600;
    }
    .gg1 {
      background: -webkit-linear-gradient(-90deg, #0099f7, #f11712);
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .gg2 {
      background: -webkit-linear-gradient(-90deg, #ed213a, #93291e, #ed213a);
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
  .tuijian {
    padding-left: 15px;
    text-shadow: 0 0 20px #dd001b;
    text-align: center;
    font-family: '幼圆';
    font-weight: 600;
    font-size: 14px;
  }
  .searchList {
    margin-top: 15px;

    .newprice {
      font-size: 17px;
      color: #f00019;
    }
    .price {
      font-size: 13px;
      text-decoration: line-through;
      color: #999;
    }
    .bottom {
      position: relative;
      margin-top: 13px;
      line-height: 12px;
      .button {
        position: absolute;
        cursor: pointer;
        right: 5px;
        top: -5px;
        // background: -webkit-linear-gradient(-90deg, #67c23a, #000000, #67c23a);
        // background-clip: text;
        // -webkit-text-fill-color: transparent;
        // color: #67c23a;
        color: red;
        font-weight: 600;
        padding: 0;
        font-size: 22px;
      }
      .yitianj {
        position: absolute;
        right: 5px;
        top: 0;
        font-size: 13px;
        color: #999;
      }
    }

    .imgBox {
      min-height: 238px;
      display: flex;
      align-items: center;
      .image {
        width: 100%;

        display: block;
      }
    }

    .clearfix:before,
    .clearfix:after {
      display: table;
      content: '';
    }

    .clearfix:after {
      clear: both;
    }
  }
}
</style>