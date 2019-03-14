<template>
	<div>
		<MusicHeader></MusicHeader>
		<TabBar></TabBar>
		<!-- <keep-alive> -->
		<router-view />
		<!-- </keep-alive> -->
		
		<Player v-if="showPlayerFlag"></Player>
	</div>
</template>

<script>
	import MusicHeader from '@/components/common/MusicHeader';
	import TabBar from '@/components/common/TabBar';
	import Player from '@/components/pages/home/player/player'
	export default {
		data() {
			return {
				
			};
		}
		,components:{
			MusicHeader,
			TabBar,
			Player
		},
		computed: {
			showPlayerFlag(){
				if(this.$store.state.Music.playList.length > 0){
					return true;
				}else{
					return false;
				}
			}
		}
	}
</script>

<style>

</style>
