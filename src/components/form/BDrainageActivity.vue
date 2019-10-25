<template>
  <div class="drainage-activity-bg">

    <div class="drainage-activity-contains">

      <div class="drainage-activity-left">
        <img src="../../assets/images/edit-delete.png" class="drainage-activity-img"/>
        <span class="drainage-activity-status">11111</span>
      </div>

      <div class="drainage-activity-right">
        <span class="drainage-activity-title">{{getData.name}}</span>
        <span class="drainage-activity-time">{{getData.time}}</span>

        <div class="drainage-activity-container">
          <div>
            <span class="drainage-activity-time">{{getData.scope}}</span>
          </div>
          <div>
            <i class="iconfont icon-liwu"/>
            <span class="drainage-activity-time">{{getData.people}}</span>
          </div>
        </div>

      </div>
    </div>
    <div class="drainage-activity-btns">
      <button
        type="button"
        class="common-btn-primary">
        分享
      </button>
      <button
        type="button"
        class="common-btn-primary"
        style="margin-left:15px">
        认筹营销
      </button>
      <button
        type="button"
        class="common-btn-primary"
        style="margin-left:15px">
        活动二维码
      </button>
      <button
        type="button"
        class="common-btn-primary"
        style="margin-left:15px">
        数据统计
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BDrainageActivity',
  props: {
    getData: {
      name: '',
      giftUrl: '',
      time: '',
      scope: '',
      people: ''
    }
  },
};
</script>

<style lang="scss">

  .drainage-activity-bg {
    width: 100%;
    height: 294px;
    background: #fff;
    display: flex;
    flex-direction: column;
    padding: 24px 24px 0 24px;
    margin-top: 16px;
    margin-bottom: 40px;
  }

  .drainage-activity-contains {
    width: 100%;
    background: #fff;
    display: flex;
    flex-direction: row;
    flex-grow: 1;
  }

  .drainage-activity-btns {
    width: 100%;
    height: 108px;
    background: #fff;
    flex-grow: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
  }

  .drainage-activity-img {
    width: 221px;
    height: 160px;
  }

  .drainage-activity-status {
    position: absolute;
    right: 0px;
    left: 0px;
  }

  .drainage-activity-left {
    position: relative;
    width: 221px;
    height: 160px;
  }

  .drainage-activity-right {
    display: flex;
    flex-direction: column;
    margin-left: 24px;
    width: 100%;
  }

  .drainage-activity-title {
    height: 63px;
    font-size: 28px;
    color: #333;
    margin-bottom: 20px;
  }

  .drainage-activity-time {
    font-size: 24px;
    color: #999;
  }

  .drainage-activity-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
  }


</style>
