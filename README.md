## 渐变色生成器
https://cssgradient.io/

## Grid 布局生成器
https://cssgrid-generator.netlify.app/

## 设计稿
https://mastergo.com/

## Fakerjs
https://fakerjs.dev/api

## Ico 生成
https://favicon.io/favicon-generator/

## 消除 key 警告
使用 index 做标签 key 会在删除的场景有问题

## 关于 ref 
跟渲染无关的尽量使用 ref

## 技巧
选中多行，cmd+shift+P 输入 emmet w， button* 可以使用 button 标签包裹多行

## Form
form 标签中的 button 如果没有 type， 默认 type 是 submit

## 处理时间
1. moment.js 体积太大
2. day.js 轻量
3. gtime.js 自己定义
4. dateformat 搜索小技巧： datetime format pattern c#

## Emoji
https://www.unicode.org/emoji/charts/full-emoji-list.html

```Javascript
const trList = document.querySelectorAll('table')[0].querySelectorAll('tr');
const trArray = Array.from(trList);
const result = []
trArray.map(tr => {
  const first = tr.children[0]
  const second = tr.children[1]
  if (first.classList.contains('mediumhead')) {
    console.log(first, '分类')
    result.push([first.textContent])
  } else if (first.classList.contains('rchars')){
    if (first.tagName.toLowerCase() === 'th') {
      console.log(first, '表头')
    } else {
      console.log(second, '数据')
      const last = result[result.length - 1]
      last[1] = last[1] || []
      last[1].push(second.textContent)
    }
  }
})
JSON.stringify(result)
```
## 关于空格编码
```
这三种Unicode字符都代表不同类型的空格，它们在文本处理、网页布局、以及跨语言兼容性方面有着不同的用途。下面是每个编码的含义：

\u00A0 - 不换行空格（Non-Breaking Space）

编码: \u00A0
名称: No-Break Space 或 Non-Breaking Space
描述: 这个空格字符不会引发自动换行。也就是说，文本处理器或浏览器在遇到这个空格时，不会在它后面换行，即使到达了行尾。这对于希望某些词或数字不被换行打断的场景非常有用，比如电话号码、引用、或货币数值等。
\u0020 - 普通空格（Space）

编码: \u0020
名称: Space
描述: 这是最常见的空格字符，在键盘上直接输入的空格键产生的就是这个字符。它在文本中占据一个空格的位置，允许文本在它前后换行。这是最基本的空格类型，广泛应用于英文及大多数语言的文本分隔。
\u3000 - 全角空格（Em Space）

编码: \u3000
名称: Ideographic Space 或 Em Space
描述: 这是一个全角空格字符，主要在东亚语言（如中文、日文、韩文）的排版中使用。它的宽度等于一个全角字符的宽度，是普通空格（半角空格）宽度的两倍。在需要更大间隔或者遵循特定排版规则时使用，比如在中文文章中用于句子之间的分隔，以保持版面的清晰和美观。
总结来说，这三种空格各有其特定的应用场景：\u00A0用于防止内容因换行而中断的场合，\u0020是最基本的文本间隔符，而\u3000则主要服务于东亚语言的排版需求。
```

## 倒计时
```javascript
import { useEffect, useRef, useState } from "react";

export default function App() {
  const [count, setNextCount] = useState(10);
  const [counting, setNextCounting] = useState(false);

  useEffect(() => {
    if (counting) {
      if (count === 0) {
        setNextCounting(false);
        return;
      }
      const timer = setTimeout(() => {
        setNextCount(count - 1);
        console.log(count);
      }, 800);
      return () => {
        window.clearInterval(timer);
      };
    }
  }, [counting, count]);
  const start = () => {
    setNextCounting(true);
  };
  return (
    <div className="App">
      <h1>倒计时: {count}</h1>
      <h1>{counting ? "倒计时中" : "没有倒计时"}</h1>
      <button onClick={start}>开始</button>
    </div>
  );
}
```