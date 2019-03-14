<template>
	<div class="tab">
		<router-link v-for='(item,index) in tabs' :key='index' :to='item.path' tag='div' active-class='selected'>
			<span>{{item.text}}</span>
		</router-link>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				tabs:[
					{
						path:'recommend',
						name:'Recommend',
						text:'推荐'
					},
					{
						path:'singer',
						name:'Singer',
						text:'歌手'
					},
					{
						path:'link',
						name:'Link',
						text:'排行'
					},
					{
						path:'search',
						name:'Search',
						text:'搜索'
					}
				]
			};
		}
	}
</script>

<style lang="less" scoped>
	@import '~style/index.less';
	.tab{
		display: flex;
		color:@other-color;
		z-index: 5;
		div{
			.h(44);
			.line-h(24);
			flex:1;
			text-align:center;
			span{
				font-size:@f-size-sm;
				.padding(0,0,6,0);
			}
		}
	}
	
	.selected{
		color: @hd-color;
		span{
			border-bottom: 2px solid @hd-color;
		}
	}
</style>
