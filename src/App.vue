<template>
	<div id="app" v-on:touchmove.prevent>
		<keep-alive>
			<router-view />
		</keep-alive>
	</div>
</template>

<script>
	
	export default {
		name: 'App',
		components: {
			
		}
	}
</script>

<style lang='less'>
	@import '~style/index.less';
</style>
