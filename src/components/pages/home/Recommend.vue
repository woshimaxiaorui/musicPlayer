<template>
	<div class="wrapper">
		<div class="content">
			<Banner :bannerlist="bannerArr" :swiperid="'swiper1'"></Banner>
			<h4>热门歌单推荐</h4>
			<ul class='recomList'>
				<li :key='index' v-for='(item,index) in list' 
					@click='goCdlist(item.dissid)'>
					<div class='icon'>
						<img width='60' height='60' v-lazy='item.imgurl' alt="">
					</div>
					<div class='text'>
						<p class='name'>{{item.creator.name}}</p>
						<p class='diss'>{{item.dissname}}</p>
					</div>
				</li>
			</ul>
		</div>
		<!-- 这里可以放一些其它的 DOM，但不会影响滚动 -->
		<router-view></router-view>
	</div>
	
</template>

<script>
	import BScroll from 'better-scroll';
	import Banner from '../../common/Banner.vue'
	export default {
		data() {
			return {
				list: [],
				bannerArr: [],
				scrollFlag : false
			};
		},
		components: {
			Banner
		},
		created() {
			let bannerUrl = "/banner/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg";
			this.$axios.get(bannerUrl).then((resObj) => {
				this.bannerArr = resObj.data.data.slider;
				this.$nextTick(() => {
					this.$bannerG.methods.initBanner('swiper1');
				})
			})

			let listUrl =
				"/hy/music/api/getDiscList?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=json&platform=yqq&hostUin=0&sin=0&ein=29&sortId=5&needNewCode=0&categoryId=10000000&rnd=0.3920376084015764";
			this.$axios.get(listUrl).then((res) => {
				this.list = res.data.data.list;
			})
		},
		mounted() {
			console.log(this)
			let scroll = new BScroll('.wrapper',{
				probeType: 3,
				click : true
			});
			scroll.on('scroll',this.onscroll);
		},
		methods: {
			goCdlist(disstid) {
				
				if(disstid){
					this.$router.push({
						name: 'CdList',
						query: {
							disstid: disstid
						}
					})
				}
			}
		}

	}
</script>

<style lang="less" >
	@import '~style/index.less';
	.wrapper {
		overflow: hidden;
		position: fixed;
		.top(88);
		.right(0);
		.left(0);
		.bottom(0);

		h4 {
			font-weight: normal;
			color: @hd-color;
			font-size: @f-size-sm;
			text-align: center;
			.padding(15, 0, 15, 0);
		}

		.recomList {
			li {
				.padding(0, 20, 20, 20);
				display: flex;
				font-size: @f-size-m;

				.icon {
					.padding(0, 20, 0, 0);
				}

				.name {
					color: #fff;
					.padding(10, 0, 5, 0);
				}

				.diss {
					font-size: @f-size-s;
					color: @other-color;
				}
			}

		}
	}
</style>
