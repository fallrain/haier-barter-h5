import {
  Dialog,
} from 'mand-mobile';
import hValidateRules from './bValidateRules';

export default class {
  constructor(option) {
    this.option = option;
    this.hValidateRules = hValidateRules;
  }

  valid() {
    const vdtMap = this.option.rules;
    for (const p in vdtMap) {
      const regs = vdtMap[p];
      for (const i in regs) {
        if (regs[i] !== 0 && !regs[i]) {
          continue;
        }
        if (!this.hValidateRules.rules[i](this.option.formData[p], regs[i])) {
          Dialog.alert({
            content: this.option.messages[p][i] || this.hValidateRules.messages[i],
            confirmText: '确定'
          });
          return false;
        }
      }
    }
    return true;
  }

  validOne(name) {
    const regs = this.option.rules[name];
    for (const i in regs) {
      if (!this.hValidateRules.rules[i](this.option.formData[name], regs[i])) {
        Dialog.alert({
          content: this.option.messages[name][i] || this.hValidateRules.messages[i],
          confirmText: '确定'
        });
        return false;
      }
    }
    return true;
  }
}
