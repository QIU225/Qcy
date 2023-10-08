// pages/index/index.js
Page({
  data: {
    num1: "",
    numStr: "",
    op: "",
    result: ""
  },
  clear() {
    this.setData({
      numStr: "",
      num1: "",
      op: "",
      result: ""
    });
  },
  del() {
    let numStr = this.data.numStr;
    numStr = numStr.slice(0, -1);
    this.setData({ numStr });
  },
  dot() {
    let numStr = this.data.numStr;
    if (!numStr.includes(".")) {
      numStr += ".";
    }
    this.setData({ numStr });
  },
  percent() {
    let numStr = this.data.numStr;
    let newNumStr = parseFloat(numStr) / 100;
    this.setData({ numStr: newNumStr.toFixed(5).toString() });
  },
  op(e) {
    const value = e.currentTarget.dataset.op;
    let num1 = this.data.num1;
    let numStr = this.data.numStr;
    let op = this.data.op;
    let result = this.data.result;
    
    if (value === "sin" || value === "cos" || value === "tan") {
      result = this.calculate1(numStr, value);
      this.setData({ result: result.toFixed(5).toString(), numStr: result.toFixed(5).toString() });
      return;
    } else {
      if (num1 && numStr && op) {
        num1 = this.calculate(num1, op, numStr);
        numStr = "";
        result = num1; // 更新此处设置result的值
      } else {
        num1 = numStr;
        numStr = "";
      }
    }
    
    this.setData({ op: value, num1, numStr, result }); // 更新此处设置result的值
  },
  cal() {
    let num1 = this.data.num1;
    let numStr = this.data.numStr;
    let op = this.data.op;
    let result = this.data.result;
    
    if (num1 && numStr && op) {
      result = this.calculate(num1, op, numStr);
    }
    
    this.setData({ result: result.toFixed(5).toString(), numStr: "", op: "" });
  },
  numBtn(e) {
    var value = e.currentTarget.dataset.num;
    this.setData({ numStr: this.data.numStr === "0" ? value : this.data.numStr + value });
  },
  calculate(num1, op, num2) {
    let result = 0;
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);
    switch (op) {
      case "+":
        result = num1 + num2;
        break;
      case "-":
        result = num1 - num2;
        break;
      case "×":
        result = num1 * num2;
        break;
      case "÷":
        result = num1 / num2;
        break;
      case "^":
        result = Math.pow(num1, num2);
        break;
    }
    return result;
  },
  calculate1(num1, op) {
    let result = 0;
    num1 = parseFloat(num1);
    switch (op) {
      case "sin":
        result = Math.sin(num1 * (Math.PI / 180));
        break;
      case "cos":
        result = Math.cos(num1 * (Math.PI / 180));
        break;
      case "tan":
        result = Math.tan(num1 * (Math.PI / 180));
        break;
    }
    return result;
  }
});