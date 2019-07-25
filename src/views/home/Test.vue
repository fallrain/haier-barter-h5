<template>
  <div>
    <div class="title">常用应用</div>
    <div class="container">
      <div class="child" v-for="(value,key) in commonData" :key="value.name">
        <div>
          <img class="icon" :src="value.url" alt="icon"/>
          <img class="edit" @click="onDelete(value,key)" src="../../assets/images/edit-delete.png"/>
        </div>
        <div class="name">{{value.name}}</div>
      </div>
    </div>
    <div class="line"></div>
    <div class="title">更多应用</div>
    <div class="container">
      <div class="child" v-for="(value,key) in moreData" :key="value.name">
        <div>
          <img class="icon" :src="value.url" alt="icon"/>
          <img class="edit" @click="onAdd(value,key)" src="../../assets/images/edit-add.png"/>
        </div>
        <div class="name">{{value.name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import icon1 from '../../assets/images/icon1.png';
import icon2 from '../../assets/images/icon2.png';
import icon3 from '../../assets/images/icon3.png';
import icon4 from '../../assets/images/icon4.png';
import icon5 from '../../assets/images/icon5.png';
import icon6 from '../../assets/images/icon6.png';
import icon7 from '../../assets/images/icon7.png';
import icon8 from '../../assets/images/icon8.png';

export default {
  name: 'Test',
  data() {
    return {
      isShowIcon: true,
      commonData: [{
        url: icon1,
        name: '以旧换新'
      }, {
        url: icon2,
        name: '认筹'
      }, {
        url: icon3,
        name: '一站筑家'
      }, {
        url: icon4,
        name: '爱到家'
      }, {
        url: icon5,
        name: '待保修'
      }],
      moreData: [{
        url: icon6,
        name: '潜客雷达'
      }, {
        url: icon7,
        name: '关怀资源发放'
      }, {
        url: icon8,
        name: '解冻申诉'
      }]
    };
  },
  methods: {
    onAdd(value, index) {
      console.log(value);
      this.commonData.push({
        url: value.url,
        name: value.name
      });
      this.moreData.splice(index, 1);
    },
    onDelete(value, index) {
      console.log(value);
      this.moreData.push({
        url: value.url,
        name: value.name
      });
      this.commonData.splice(index, 1);
    }
  }
};
</script>

<style scoped lang="scss">

  .title {
    font-size: 30px;
    color: #333;
    margin-top: 24px;
    margin-bottom: 8px;
    margin-left: 24px;
    font-weight: bold;
  }

  .container {
    margin-right: 24px;
    margin-left: 24px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

  .child {
    width: calc(25%);
    margin-top: 40px;
    display: flex;
    align-items: center; //垂直居中
    justify-content: center;
    flex-direction: column;
  }

  .edit {
    position: absolute;
    margin-left: -16px;
    margin-top: -16px;
    width: 32px;
    height: 32px;
  }

  .icon {
    width: 72px;
    height: 72px;
  }

  .name {
    font-size: 28px;
    color: #666;
    margin-top: 12px;
  }

  .line {
    width: 100%;
    height: 16px;
    background: #F5F5F5;
    margin-top: 24px;
  }

</style>
