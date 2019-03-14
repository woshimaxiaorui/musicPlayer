<template>

	<div class="wrapper">
		<div class="content">
			<div class="link" v-for="(link,index) in linklist" :key="index">

				<p class="linkLeft">
					<img :src="link.picUrl" :alt="link.topTitle">
				</p>
				<p class="linkRight">
					<span v-for="(item,index) in link.songList" :key="index">{{index+1}} {{item.songname}}-{{item.singername}}</span>
				</p>

			</div>
		</div>
		<!-- 这里可以放一些其它的 DOM，但不会影响滚动 -->
	</div>

</template>

<script>
	import BScroll from 'better-scroll';
	export default {
		data() {
			return {
				linklist: []
			};
		},
		created() {
			let url = `https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg`;
			let jsonpArgs = {
				g_tk: '1928093487',
				inCharset: 'utf-8',
				outCharset: 'utf-8',
				notice: '0',
				format: 'jsonp',
				needNewCode: '1',
				platform: 'h5',
				callbackQuery: 'jsonpCallback'
			}

			this.$jsonp(url, jsonpArgs).then(res => {

				this.linklist = res.data.topList;
				// console.log(this.linklist);
			}).catch(err => {
				console.log("排行帮请求:", err);
			})
		},
		methods: {

		},
		mounted() {
			let scroll = new BScroll('.wrapper');
		},
		computed: { //计算属性
			newList() {
				return this.linklist.map(item => {
					return item.id;
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	@import '~style/index.less';

	.wrapper {
		overflow: hidden;
		position: fixed;
		.top(88);
		.right(0);
		.left(0);
		.bottom(0);

		.content {
			.padding(10, 20, 10, 20);

			.link {
				display: flex;
				.margin(20, 0, 20, 0);

				.linkLeft {
					img {
						.w(100);
						display: block;
					}
				}

				.linkRight {
					background: #333;
					flex: 1;
					display: flex;
					flex-direction: column;
					justify-content: space-around;

					span {
						.w(200);
						.padding(0, 0, 0, 20);
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
						display: block;
						font-size: @f-size-s;
						color: @other-color;
					}
				}
			}
		}
	}

	* {}
</style>
