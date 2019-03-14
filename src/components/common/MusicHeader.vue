<template>
	<div class="m-header">
		<p>
			Mr.Music
		</p>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="less" scoped>
	@import '~style/index.less';
	.m-header{
		text-align: center;
		color:@hd-color;
		font-size:@f-size-l;
		.h(44);
		.line-h(44);
	}
</style>
