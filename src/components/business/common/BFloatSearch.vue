<template>
  <transition
    name="floatSearch-show"
  >
    <div
      class="bFloatSearch-par"
      v-show="show"
    >
      <transition
        name="floatSearch-mask-show"
      >
        <div
          class="bFloatSearch-mask"
          v-show="show"
          @click="hide"
        ></div>
      </transition>
      <transition
        name="filter-move"
      >
        <div
          class="bFloatSearch-cnt"
          v-show="show"
        >
          <ul class="bFloatSearch-cnt-list">
            <li
              v-for="(item,index) in filterList"
              :key="index"
            >
              <div class="bFloatSearch-filter">
                <div class="bFloatSearch-filter-head">
                  <div>
                    <span>{{item.name}}</span>
                    <span class="bFloatSearch-filter-head-tips">{{item.tips}}</span>
                  </div>
                  <i
                    class="iconfont icon-jiantou9"
                    :class="[
                      !item.isExpand && 'reverse'
                    ]"
                    @click="toggleExpand(item)"
                  ></i>
                </div>
                <ul
                  class="bFloatSearch-filter-list"
                  v-show="item.isExpand"
                >
                  <li
                    v-for="(filterItem,filterIndex) in item.data"
                    :key="filterIndex"
                    class="bFloatSearch-filter-list-item"
                    :class="[filterItem.isChecked && 'active']"
                    @click="choose(filterItem,item.data,item.type)"
                  >{{filterItem.value}}
                  </li>
                </ul>
              </div>
            </li>
          </ul>
          <div class="bFloatSearch-btns">
            <button
              type="button"
              class="bFloatSearch-btn-cancel"
              @click="reset"
            >重置
            </button>
            <button
              type="button"
              class="bFloatSearch-btn-confirm"
              @click="confirm"
            >确定
            </button>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'BFloatSearch',
  props: {
    // 显示隐藏
    show: {
      type: Boolean,
      defalut: false
    },
    // 筛选数据
    filterList: {
      type: Array
    }
  },
  watch: {
    show(val) {
      if (val) {
        this.$nextTick(() => {
          document.querySelector('.bFloatSearch-cnt-list').scrollTo(0, 0);
        });
      }
    }
  },
  methods: {
    hide() {
      /* 隐藏 */
      this.$emit('update:show', false);
      // 抛出confirm事件
      const searchForm = this.genFormData();
      this.$emit('confirm', searchForm);
    },
    cancel() {
      /* 取消按钮操作 */
      this.hide();
    },
    toggleExpand(item) {
      /* 展开或者收起 */
      item.isExpand = !item.isExpand;
    },
    choose(filterItem, list, type) {
      /* 选择选项 */
      if (type === 'radio') {
        if (!filterItem.isChecked) {
          list.forEach((v) => {
            if (v.isChecked) {
              v.isChecked = false;
            }
          });
          filterItem.isChecked = true;
        }
      } else {
        // 多选翻转
        filterItem.isChecked = !filterItem.isChecked;
      }
    },
    reset() {
      /* 重置搜索 */
      this.filterList.forEach((filters) => {
        filters.data.forEach((v) => {
          v.isChecked = false;
        });
      });
    },
    genFormData() {
      /* 参数、参数值类型映射 */
      const conditionMap = {
        0: {
          key: 'industryList',
          type: 'checkbox'
        },
        1: {
          key: 'years',
          type: 'checkbox'
        },
        2: {
          key: 'buyIntention',
          type: 'radio'
        }
      };
      const searchForm = {};
      this.filterList.forEach((filters, index) => {
        // Array创建数组，String创建字符串
        const searchFormType = conditionMap[index];
        // 不存在则新创建
        if (searchForm[searchFormType.key] === undefined) {
          if (searchFormType.type === 'checkbox') {
            searchForm[searchFormType.key] = [];
          } else {
            searchForm[searchFormType.key] = '';
          }
        }

        filters.data.forEach((v) => {
          if (v.isChecked) {
            if (searchFormType.type === 'checkbox') {
              searchForm[searchFormType.key].push(v.key);
            } else {
              searchForm[searchFormType.key] = v.key;
            }
          }
        });
      });
      return searchForm;
    },
    confirm() {
      /* 确认搜索结果 */
      // 关闭搜索框
      this.hide();
    }
  }
};
</script>

<style lang="scss">
  .bFloatSearch-par {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100vh;
    z-index: 999;
  }

  .bFloatSearch-mask {
    position: absolute;
    width: 100%;
    height: 100%;
    background: #2F2F2F;
    opacity: .8;
  }

  .bFloatSearch-cnt {
    position: absolute;
    top: 0;
    right: 0;
    width: 660px;
    height: 100%;
    background: #fff;
    padding: 0 24px 108px 24px;
  }

  .bFloatSearch-cnt-list {
    height: calc(100vh - 108px);
    overflow-y: auto;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .bFloatSearch-btns {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 24px;
    background: #fff;

    .bFloatSearch-btn-cancel {
      margin-right: 24px;
    }
  }

  .bFloatSearch-btn-confirm {
    width: 100%;
    height: 60px;
    background: #1969C6;
    border-radius: 30px;
    color: #fff;
    font-size: 28px;
  }

  .bFloatSearch-btn-cancel {
    width: 100%;
    height: 60px;
    border: 1px solid #1969C6;
    border-radius: 30px;
    font-size: 28px;
    color: #1969C6;
    background: #fff;
  }

  .bFloatSearch-filter-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 28px;
    color: #666;
    height: 74px;

    .icon-jiantou9 {
      font-size: 20px;
    }

    .reverse {
      display: inline-block;
      transform: rotateX(180deg);
    }
  }

  .bFloatSearch-filter-head-tips {
    font-size: 24px;
    color: #999;
  }

  .bFloatSearch-filter-list {
    display: flex;
    flex-wrap: wrap;
    margin-top: 16px;
  }

  .bFloatSearch-filter-list-item {
    width: 188px;
    height: 60px;
    background: #F4F4F4;
    border: 1px solid #F4F4F4;
    border-radius: 8px;
    color: #666;
    margin-right: 24px;
    text-align: center;
    line-height: 60px;
    font-size: 28px;
    margin-bottom: 18px;

    &.active {
      border: 1px solid #1969C6;
      color: #1969C6;
      background: #fff;
    }

    &:nth-child(3n) {
      margin-right: 0;
    }
  }
</style>
<style scoped lang="scss">
  .filter-move-enter,
  .filter-move-leave-to {
    right: -100%;
  }

  .filter-move-enter-active {
    animation: filterMove .4s ease-out;
  }

  .filter-move-enter-to,
  .filter-leave-enter {
    right: 0;
  }

  .filter-move-leave-active {
    animation: filterMove .4s ease-out reverse;
  }

  @keyframes filterMove {
    0% {
      right: -100%;
    }
    100% {
      right: 0;
    }
  }

  .floatSearch-show-enter {
    display: block;
  }

  .floatSearch-show-enter-active {
    transition: display 0s;
  }

  .floatSearch-show-leave-active {
    transition: display .4s;
  }

  .floatSearch-show-leave {
    display: none;
  }

  .floatSearch-mask-show-enter,
  .floatSearch-mask-show-leave-to {
    opacity: .8;
  }

  .floatSearch-mask-show-enter-active {
    animation: floatSearchMaskShow .4s linear;
  }

  .floatSearch-mask-show-leave-active {
    animation: floatSearchMaskHide 2s linear;
  }

  .floatSearch-mask-show-enter-to,
  .floatSearch-mask-show-leave {
    opacity: .3;
  }

  @keyframes floatSearchMaskShow {
    0% {
      opacity: .3;
    }
    100% {
      opacity: .8;
    }
  }

  @keyframes floatSearchMaskHide {
    0% {
      display: block;
      opacity: .8;
    }
    100% {
      opacity: .3;
      display: none;
    }
  }
</style>
