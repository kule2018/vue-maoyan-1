<template>
  <div class="cinema-info">
    <div class="info">
      <p class="title ellipsis">{{info.nm}}</p>
      <p class="addr ellipsis">{{info.addr}}</p>
    </div>
    <div class="location">
      <i class="iconfont icon-pos"></i>
    </div>
  </div>
</template>

<script >
export default {
  props: {
    info: {
      type: Object,
      default () {
        return {}
      }
    }
  }
}
</script>

<style scoped lang="scss">
.cinema-info {
  position: relative;
  padding: 15px;
  padding-right: 100px;
  background: #fff;
  .info {
    .title {
      font-size: 17px;
      line-height: 24px;
      font-weight: 700;
      color: #333;
    }
    .addr {
      margin-top: 2px;
      font-size: 13px;
      line-height: 18.5px;
      color: #999;
    }
  }
  .location {
    width: 71px;
    .iconfont {
      position: absolute;
      right: 0;
      top: 50%;
      width: 70px;
      height: 31px;
      line-height: 31px;
      -webkit-transform: translateY(-50%);
      transform: translateY(-50%);
      border-left: 1px solid #d8d8d8;
      font-size: 24px;
      color: #a0cfff;
      text-align: center;
    }
  }
}
</style>
