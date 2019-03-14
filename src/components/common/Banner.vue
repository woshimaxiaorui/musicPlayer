<template>
	<div class="swiper-container" :id="swiperid">
		<div class="swiper-wrapper">
			<div class="swiper-slide" v-for='(item,index) in bannerlist'>
				<img :src="item.picUrl" :key="index">
			</div>
		</div>
		<!-- 如果需要分页器 -->
		<div class="swiper-pagination"></div>
	</div>
</template>

<script>
	import Swiper from "swiper";
	export default {
		data() {
			return {
				
			};
		},
		props:["bannerlist","swiperid"],
		methods: {
			initBanner(id) {
				var mySwiper = new Swiper('#'+id, {
					autoplay: {
						disableOnInteraction:false
					},
					loop: true, // 循环模式选项
					pagination: {
						el: '.swiper-pagination',
					}
				})
			}
		},
		created() {
			
		}
		
	}
</script>

<style lang="less" >
	@import url("../../../node_modules/swiper/dist/css/swiper.min.css");
	@import '~style/index.less';
	.swiper-container {
		width:100%;
		.h(150);
		// position: relative;
		img {
			width: 100%;
			display: block;
		}
		.swiper-pagination{
			position: absolute;
			bottom: 0;
			.swiper-pagination-bullet{
				background: rgba(255,255,255,.8);
			}
			.swiper-pagination-bullet-active{
				.w(20);
				.b-radio(5);
			}
		}
		
	}
</style>
