<template>
  <div>
    <div class="addUserTag-form">
      <ul>
        <li>
          <div class="addUserTag-form-item">
            <b-item
              title="标签分类"
              :arrow="true"
              :value="tagName"
              @rightClick="showTags"
            ></b-item>
          </div>
        </li>
        <li>
          <div class="addUserTag-form-item">
            <label class="addUserTag-form-item-name">标签名称</label>
            <input
              type="text"
              class="addUserTag-form-item-ipt"
              placeholder="请输入标签"
              v-model="form.phone"
            >
          </div>
        </li>
      </ul>
      <b-pop-check-list
        type="radio"
        :show.sync="tagPopShow"
        :list="tagList"
        v-model="form.tag"
      ></b-pop-check-list>
    </div>
    <button class="addUserTag-save">保存</button>
  </div>
</template>

<script>
  import {
    BPopCheckList,
    BItem
  } from '@/components/form';

  export default {
    name: 'AddUserTag',
    components: {
      BPopCheckList,
      BItem
    },
    data() {
      return {
        form: {
          tag: []
        },
        tagPopShow: false,
        tagList: [
          {
            id: 1,
            name: '行为性格'
          },
          {
            id: 2,
            name: '家庭结构'
          },
          {
            id: 3,
            name: '年龄层次'
          },
          {
            id: 4,
            name: '其他'
          }
        ]
      };
    },
    computed: {
      tagName() {
        const tagObj = this.tagList.find(v => v.id === this.form.tag[0]);
        let name;
        if (tagObj) {
          name = tagObj.name;
        } else {
          name = '';
        }
        return name;
      }
    },
    methods: {
      showTags() {
        /* 地址标签显示隐藏 */
        this.tagPopShow = true;
      }
    }
  };
</script>

<style scoped>

  .addUserTag-form {
    background: #fff;
    padding-bottom: 4px;

    .bItem-item {
      padding-left: 0;
      padding-right: 0;
    }

    .bItem-item-right-val,
    .bItem-item-title {
      font-size: 28px;
      color: #666;
    }
  }

  .addUserTag-form-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 80px;
    border-bottom: 1px solid #F5F5F5;
    font-size: 28px;
    color: #666;
  }

  .addUserTag-form-item-name {
    margin-left: 24px;
  }

  .addUserTag-form-item-UserTag {
    .icon-dingwei {
      color: #1969C6;
      font-size: 40px;
    }
  }

  .addUserTag-form-item-ipt {
    width: 380px;
    border: 0;
    background: transparent;
    text-align: right;
    margin-right: 28px;
  }

  .addUserTag-save {
    position: absolute;
    width: calc(100% - 48px);
    height: 84px;
    bottom: 40px;
    right: 24px;
    left: 24px;
    border-radius: 8px;
    background: #1969C6;
    color: #fff;
    font-size: 34px;
  }
</style>
