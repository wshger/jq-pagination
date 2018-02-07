# jq-pagination
### 介绍
一个jq分页插件，jsonp跨域，比较真实的演示了分页的流程，对于新手朋友来说比较友好，使用需要引入jq,实例中写了一点样式，有点丑，大家可以根据自己的需求去修改样式

pagination-orgin.js是源文件用es6写的，其实也没用太多es6的东西，就是怕有的浏览器不支持这种写法，于是。。
pagination.js是编译es5的版本
### 开始使用
1.引入jq
2.按照下方的实例写好，当然我也有写好的现成的 (*^▽^*)

    	html
    	<div class="pagination">
    		<!-- 上一页按钮 -->
    		<a class="icon item left-chevron">
    			  <i class="left chevron icon"><--</i>
    		</a>
    		<!-- 下一页按钮 -->
    		<a class="icon item right-chevron">
    			  <i class="right chevron icon">--></i>
    		</a>
    	</div>
    
    	javascript
    	$('.pagination').pagination({
    		count:res.data.total, //总页数
    		btn:true,//是否开启...
    		currentPage:num,//当前页
    		numsPerPage:res.data.per_page,//一页多少数据
    		allowPage:7,//生成的分页个数
    		back:fun //ajax回调
    	 })

### 最后
如果觉得还可以，给个star吧！！

