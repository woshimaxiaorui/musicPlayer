<template>
	<div class="player">
		<div class="bigPlayer" v-show="showType">
			<img :src="this.bgImgUrl" class="bgImg">
			<div class="song-top">
				<p class="song-title">
					<span class="to-hidden" @click="showLittleplay">返回</span>
					{{this.playNow.albumname}}
				</p>
				<p class="song-top-bottom">
					{{this.playNow.singer[0].name}}
				</p>
			</div>
			<div class="song-main move-go">
				<img :src="this.bgImgUrl" alt="">
			</div>
			<!-- <button @click="nextSong()"></button> -->
			<div class="geci">
				我是歌词
			</div>

			<div class="kongzhiqi">
				<audio :src="this.songUrl" controls autoplay></audio>
			</div>
		</div>
		<div class="littlePlayer" v-show="!showType" @click="showBiglay">
			我是小播放器
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		created() {

		},
		mounted() {
			console.log("歌曲", this.playList[this.playIndex])
			console.log('url', this.bgImgUrl)

		},
		methods: {
			nextSong() {
				this.$store.commit('nextPlaySong');
				console.log('当前', this.playIndex)
			},
			pervSong() {
				this.$store.commit('pervPlaySong');
				console.log('当前', this.playIndex)
			},
			showLittleplay() {
				this.$store.commit('changePlayerShow');
			},
			showBiglay() {
				this.$store.commit('changePlayerShow');
			}
		},
		computed: {

			showType() {
				return this.$store.state.Music.playerShowFlag;
			},
			playIndex() {
				return this.$store.state.Music.playIndex;
			},
			playList() {
				return this.$store.state.Music.playList;
			},
			playNow() {
				return this.playList[this.playIndex];
			},
			bgImgUrl() {
				let url = "https://y.gtimg.cn/music/photo_new/T002R300x300M000" + this.playNow.albummid + ".jpg?max_age=2592000"
				return url;
			},
			songUrl() {
				let url = 'http://dl.stream.qqmusic.qq.com/http://dl.stream.qqmusic.qq.com/C400' + this.playNow.strMediaMid +
					'.m4a?guid=892862080&vkey=D8968B9D134F9BAC1E6044F76C52456537C62B15FA437EA427EB10EC0C3E8DF645D9E3BAA150F03A4659D6477419C98074C1C6DF60EE50B1&uin=0&fromtag=38'
				return url;
			}

		}

	}
</script>

<style lang="less">
	@import '~style/index.less';

	.player {
		position: fixed;
		z-index: 50;
		.top(0);
		.bottom(0);
		.w(375);
		.h(0);

		.bigPlayer {
			position: fixed;
			.top(0);
			.bottom(0);
			z-index: 100;
			background: #222;
			.w(375);
			height: 100%;

			.bgImg {
				position: fixed;
				z-index: -1;
				width: 100%;
				height: 100%;
				background-color: rgba(0, 0, 0, 0.5);
				filter: blur(20px);
			}

			.song-top {
				.w(375);
				.h(60);
				font-size: @f-size-l;
				.line-h(40);
				text-align: center;
				color: #fff;
				.margin(0, 0, 20, 0);

				.to-hidden {
					color: @hd-color;
					position: fixed;
					.left(20);
				}

				.song-top-bottom {
					.line-h(20);
					.h(20);
					font-size: @f-size-s;
				}
			}

			.song-main {
				.w(260);
				.h(260);
				margin: 0 auto;
				.padding(10, 10, 10, 10);
				background: rgba(255, 255, 255, .2);
				border-radius: 50%;

				img {
					width: 100%;
					height: 100%;
					border-radius: 50%;
				}
			}

			.geci {
				.w(300);
				.h(20);
				.marginauto(20);
				color: @other-color;
				font-size: @f-size-sm;
				text-align: center;
			}

			.kongzhiqi {
				text-align: center;

				audio {}
			}


		}

		.littlePlayer {
			.w(375);
			.h(50);
			background: red;
			position: fixed;
			z-index: 50;
			.bottom(0);
		}
	}

	.move-go {
		animation: xuanzhuan 20s linear infinite;
	}
	@keyframes xuanzhuan {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
</style>
