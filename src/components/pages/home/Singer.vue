<template>
	<div class="wrapper">
		<div class="content">
			<dl class="singer" v-for="(group,index) in list" :key="index" ref="leftBody">
				<dt class="singer-title" ref="asideTitle">{{group.title}}</dt>
				<dd v-for="item in group.items">
					<img alt="" v-lazy="item.headUrl">
					<span>{{item.name}}</span>
				</dd>
			</dl>
		</div>
		<!-- 这里可以放一些其它的 DOM，但不会影响滚动 -->
		<div class="aside" @touchstart="touchShowLeft" @touchmove.stop="touchMove">
			<p v-for="(item,index) in titleList" :key="index" :class="{p_sel:selAsideNum==index}">
				{{item==='热门' ? '热' : item}}
			</p>
		</div>
	</div>
</template>

<script>
	import BScroll from 'better-scroll'
	export default {
		data() {
			return {
				list: [],
				selAsideNum: 0
			};
		},
		created() {
			let url = `https://c.y.qq.com/v8/fcg-bin/v8.fcg`;
			let jsonArgs = {
				g_tk :'1928093487',
				inCharset:'utf-8',
				outCharset : 'utf-8',
				notice : '0',
				format : 'jsonp',
				channel : 'singer',
				page : 'list',
				key : 'all_all_all',
				pagesize : '120',
				pagenum : '1',
				hostUin : '0',
				needNewCode : '0',
				platform : 'yqq',
				callbackQuery :'jsonpCallback'
			}
			this.$jsonp(url,jsonArgs).then(res=>{
				
				this.changeData(res.data.list);
			}).catch((err)=>{
				console.log("歌手列表请求错误:",err)
			})
			
		},
		methods: {
			selAside(index) {
				this.selAsideNum = index;
			},
			touchMove(e) {
				var movePx = e.targetTouches[0].clientY - this.touchOneY;
				var moveNum = parseInt(movePx / 17) + this.touchIndex;
				// console.log(moveNum);
				if (moveNum > -1 && moveNum < this.$refs.asideTitle.length) {
					var tagObj = this.$refs.asideTitle[moveNum];
					this.scrollObj.scrollToElement(tagObj);
					this.selAside(moveNum);
				}
				// e.stopPropagation();
			},
			touchShowLeft(e) {
				this.touchOneY = e.targetTouches[0].clientY;
				let txt = e.targetTouches[0].target.innerText === '热' ? '热门' : e.targetTouches[0].target.innerText;
				var selIndex = this.titleList.indexOf(txt);
				if (selIndex > -1) {
					this.touchIndex = selIndex;
					var tagObj = this.$refs.asideTitle[selIndex];
					this.scrollObj.scrollToElement(tagObj);
					this.selAside(selIndex);
				}
			},
			changeData(data) {
				// console.log("对象",data);
				let lists = {
					'hot': {
						title: '热门',
						items: []
					},
					'A': {
						title: 'A',
						items: []
					}
				}
				for (let i = 0; i < data.length; i++) {
					let img = `https://y.gtimg.cn/music/photo_new/T001R300x300M000${data[i].Fsinger_mid}.jpg?max_age=2592000`
					if (i < 10) { //将前十条数据插入hot分组对象中
						lists.hot.items.push({
							name: data[i].Fsinger_name,
							id: data[i].Fsinger_id,
							headUrl: img
						})
					}
					//如果当前索引对象存在,将数据存入当前对象下的items数组
					if (lists[data[i].Findex]) {
						lists[data[i].Findex].items.push({
							name: data[i].Fsinger_name,
							id: data[i].Fsinger_id,
							headUrl: img
						})
					} else {
						lists[data[i].Findex] = {
							title: data[i].Findex,
							items: [{
								name: data[i].Fsinger_name,
								id: data[i].Fother_id,
								headUrl: img
							}]
						}
					}
				}
				let hotArr = [];
				let otherArr = [];
				for (let item in lists) {
					if (item === 'hot') {
						hotArr.push(lists[item])
					} else {
						if (item.match(/[a-zA-Z]/)) {
							otherArr.push(lists[item])
						}
					}

				}
				otherArr.sort((a, b) => {
					// console.log(a.title.charCodeAt(0));
					return a.title.charCodeAt(0) - b.title.charCodeAt(0);
				})
				this.list = hotArr.concat(otherArr);
				// console.log(this.list)
			},
			onScroll(pos) {
				// console.log(`Now position is x: ${pos.x}, y: ${pos.y}`);
				let arrSize = this.$refs.leftBody.length;
				if(parseInt(Math.abs(pos.y)) > this.$refs.leftBody[this.moveIndex].offsetTop){
					if(this.moveIndex < arrSize-1){
						this.moveIndex++;
					}else{
						this.moveIndex = arrSize-1;
					}
				}
				if(parseInt(Math.abs(pos.y)) < this.$refs.leftBody[this.moveIndex - 1].offsetTop){
					if(this.moveIndex > 0){
						this.moveIndex--;
					}
				}
				if(pos.y >= 0 && pos.y <= this.$refs.leftBody[0].offsetTop){
					this.moveIndex = 0;
				}
				this.selAside(this.moveIndex);
			}
		},
		mounted() {
			let scroll = new BScroll('.wrapper', {
				probeType: 3
			});
			this.scrollObj = scroll;
			scroll.on('scroll', this.onScroll);
			this.moveIndex = 0; //初始化当前选中位置
			this.touchIndex = 0;//初始化touch初始位置
		},
		computed: {
			titleList() {
				return this.list.map((item) => {
					return item.title;
				})
			}
		}
	}
	// 		 singerData[i].Fsinger_name,
	// 		 singerData[i].Fsinger_id,
	// 		 singerData[i].Fsinger_mid
	// 	
	// 	[
	// 		{
	// 			title:"A",
	// 			items:[
	// 				{歌手}
	// 			]
	// 		}
	// 	]
</script>

<style lang="less" scoped>
	@import '~style/index.less';
	.wrapper {
		overflow: hidden;
		position: fixed;
		.top(88);
		.bottom(0);
		.left(0);
		.right(0);
		.singer {
			.padding(0, 0, 20, 0);

			.singer-title {
				.h(30);
				background: #333;
				font-size: @f-size-s;
				color: @other-color;
				.line-h(30);
				.padding(0, 0, 0, 20);
			}

			dd {
				box-sizing: border-box;
				.padding(20, 0, 0, 30);
				.h(70);
				.line-h(50);
				display: flex;

				img {
					.w(50);
					.h(50);
					border-radius: 50%;
				}

				span {
					font-size: @f-size-m;
					.padding(0, 0, 0, 30);
					color: @other-color;
				}
			}
		}

		.aside {
			.w(25);
			font-size: @f-size-s;
			text-align: center;
			.padding(15, 0, 15, 0);
			.b-radio(5);
			background: rgba(0, 0, 0, .3);
			color: @other-color;
			position: absolute;
			.right(0);
			top: 50%;
			transform: translateY(-50%);
			overflow: hidden;
			z-index: 10;
		}
	}

	.p_sel {
		color: @hd-color;
		font-size: @f-size-sm;
	}
</style>
