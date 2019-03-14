<template>
	<div class="cdlist">
		<div class="cdlist-top" ref='cdlistTop'>
			<p class="title">
				<button @touchstart='jumpRecommend'>《 </button>
				<span>{{cdObj.dissname}}</span>
			</p>
		</div>
		
		<div class="wrapper-cdlist">
			<div class="content">
				<div class="cd-listbg">
					<ul class='cd-list'>
						<li :key='index' v-for='(item,index) in cdObj.songlist' @click.stop="playSong(index)">
							<h2>
								{{item.albumname}}
							</h2>
							<p class='text'>
								{{item.singer[0].name}}-{{item.songname}}
							</p>
						</li>
					</ul>
				</div>
			</div>
			<!-- 这里可以放一些其它的 DOM，但不会影响滚动 -->
		</div>
	</div>
</template>

<script>
	import BScroll from 'better-scroll';
	export default {
		data() {
			return {
				cdObj : {}
			};
		},
		created() {
			let songUrl = `/songlist/music/api/getCdInfo?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=jsonp&disstid=${this.getDisstid}&type=1&json=1&utf8=1&onlysong=0&platform=yqq&hostUin=0&needNewCode=0`;
			this.$axios.get(songUrl).then((resObj) => {
				this.$nextTick(()=>{
					this.cdObj = resObj.data.cdlist[0];
					this.$refs.cdlistTop.style.background = `url(${this.cdObj.logo}) no-repeat` ;
					this.$refs.cdlistTop.style.backgroundSize = '100%';
					// console.log(this.cdObj);
				})
			})
		},
		mounted() {
			let scroll = new BScroll('.wrapper-cdlist',{
				probeType: 3,
				click : false
			});
		},
		computed:{
			getSongList(){
				return this.songlist.map((item)=>{
					return item
				})
			},
			getDisstid(){
				return this.$route.query.disstid;
			}
		},
		methods:{
			playSong(index){
				console.log("开始播放",index)
				this.$store.commit('changePlayList',this.cdObj.songlist);
				this.$store.commit('changePlayIndex',index);
				console.log(this)
			},
			jumpRecommend(){
				this.$router.push({
					path: '/home/recommend'
				})
			}
		}
	}
</script>

<style lang="less" scoped="scoped">
	@import '~style/index.less';
	
	.cdlist{
		position: fixed;
		.top(0);
		.right(0);
		.bottom(0);
		.left(0);
		z-index:100;
		width:100%;
		background:@bg-color;
		
		.cdlist-top{
			color: #fff;
			font-size: @f-size-m;
			width: 100%;
			.h(262);
			
			.title{
				.h(44) ;
				text-align: center;
				display: flex;
				button{
					.w(50);
					font-size: @f-size-l;
					color: @hd-color;
				}
				span{
					.line-h(44);
					.padding(0,0,0,40);
				}
			}
		}
		.wrapper-cdlist{
			position: fixed;
			.top(44);
			.right(0);
			.bottom(0);
			.left(0);
			overflow: hidden;
			z-index: 30;
			
			.content{
				.padding(218,0,0,0);
				.cd-listbg{
					background: @bg-color;
					.padding(0,20,0,20);
					.cd-list{
						h2{
							font-size: @f-size-sm;
							color: #fff;
							white-space: nowrap;
							overflow: hidden;
							text-overflow: ellipsis;
							.margin(10,0,5,0);
						}
						p{
							font-size: @f-size-s;
							color: @other-color;
						}
					}
				}
				
			}
			
		}
		
	}
	
</style>
