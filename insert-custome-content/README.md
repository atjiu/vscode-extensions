通过正则格式化当前编辑的文件名，然后将匹配出来的每一项再对配置里的模板进行替换

Format the currently edited file name through regular format, and then replace the template in the configuration with each matched item

![preview](https://raw.githubusercontent.com/tomoya92/vscode-extensions/master/insert-custome-content/preview.gif)

举例：

当前正在编辑的文件名是 `2020-01-01-java-tutorial.md`

通过正则 `(\\d{4})-(\\d{2})-(\\d{2})-(.+).md` 匹配出结果分别是

```js
let results = filename.match(new RegExp('(\\d{4})-(\\d{2})-(\\d{2})-(.+).md'))
// results: ["2020-01-01-java-tutorial.md", "2020", "01", "01", "java-tutorial", index: 0, input: "2020-01-01-java-tutorial.md", groups: undefined]
```

然后模板里配置了`{1}` `{2}` 这种替换符，其中1，2这种数字就是正则匹配出来的数组的下标，比如上面results下标为1的值就是2020

最后再通过 replace() 方法，把模板里的 {数字} 全替换掉并插入到当前编辑光标处

----

Example:

The file name currently being edited is `2020-01-01-java-tutorial.md`

Through regular `(\\d{4})-(\\d{2})-(\\d{2})-(.+).md` match the results are as follows

```js
let results = filename.match(new RegExp('(\\d{4})-(\\d{2})-(\\d{2})-(.+).md'))
// results: ["2020-01-01-java-tutorial.md", "2020", "01", "01", "java-tutorial", index: 0, input: "2020-01-01-java-tutorial.md", groups: undefined]
```

Then the template is configured with the substitution character '{1}', '{2}', where the numbers 1 and 2 are the subscripts of the regularly matched array. For example, the value of the results subscript 1 above is 2020

Finally, through the replace() method, the {number} in the template is replaced and inserted into the current edit cursor