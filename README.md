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

## 技巧
### 选中多行，cmd+shift+P 输入 emmet w， button* 可以使用 button 标签包裹多行

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