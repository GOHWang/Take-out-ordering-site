<template>
  <div>
    <el-container>
      <el-main style="padding-bottom:0px">
        <!-- 轮播图 -->
        <el-carousel :interval="4000" type="card" height="250px" trigger="click">
          <el-carousel-item v-for="item in srcs" :key="item">
            <img :src="item" class="imgs">
          </el-carousel-item>
        </el-carousel>
      </el-main>
    </el-container>
    <el-container class="garousel">
      <el-aside width="260px" class="navaside">
        <div><img src="@/assets/images/dianchanlogo.png" style="width:60px">
          <span class="zzdc">自助点餐</span>
        </div>
        <div class="divs" :class="{'divsHover':one==item.id}" @click="clickbg(item.id)" v-for="item in list" :key="item.id" plain>{{ item.titles }}</div>
        <div class="dowlon"></div>
      </el-aside>
      <el-main style="padding:0;margin:0 20px" class="biankuang">
        <keep-alive>
          <MyGoods :carid="one"></MyGoods>
        </keep-alive>
      </el-main>
      <el-aside class="biankuang" style="overflow:visible" width="280px">
        <MyShopping></MyShopping>
      </el-aside>
    </el-container>
  </div>
</template>

<script>
import MyShopping from '@/components/Homes/MyCarousels/MyShopping.vue'
import MyGoods from '@/components/Homes/MyCarousels/MyGoods.vue'

export default {
  components: { MyGoods, MyShopping },
  name: 'MyCarousel',
  data() {
    return {
      srcs: [require('@/assets/images/lbt77.gif'), require('@/assets/images/lbt99.jpg'), require('@/assets/images/lbt12.jpg'), require('@/assets/images/lbt88.jpg'), require('@/assets/images/lbt10.jpg')],
      list: [
        { id: 1, titles: '汉堡' },
        { id: 2, titles: '小食' },
        { id: 3, titles: '套餐' },
        { id: 4, titles: '早餐' },
        { id: 5, titles: '饮料' }
      ],
      one: 1
    }
  },
  methods: {
    clickbg(id) {
      this.one = id
    }
  }
}
</script>

<style lang='less' scoped>
.garousel {
  margin: 0 auto;
  width: 1261px;
  padding: 20px 0;
  height: 564px;
}
.imgs {
  width: 100%;
}
.biankuang {
  border: 2px solid #dcdfe6;
  border-radius: 4px;
  background-color: white;
  &:hover {
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }
}
// 导航菜单
.navaside {
  // min-height: 520px;
  height: 100%;
  border: 2px solid #dcdfe6;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  background-color: white;
  &:hover {
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }
  .zzdc {
    font-size: 25px;
    margin: 0 25px 0 8px;
    vertical-align: middle;
  }
  .divs {
    color: #303133;
    width: 75%;
    height: 45px;
    padding-top: 10px;
    text-align: center;
    border: 1px solid #f00019;
    border-radius: 4px;
    font-size: 16px;
    font-weight: 600;
    margin-left: 0px;
    cursor: pointer;
  }
  .divsHover {
    background-color: #f00019;
    color: white;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }
  .dowlon {
    cursor: pointer;
    width: 90%;
    height: 85px;
    border-radius: 4px;
    // border: 1px solid #dcdfe6;
    // box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    background: url('@/assets/images/xianshilogo.png') no-repeat center center;
    background-size: cover;
  }
}
</style>