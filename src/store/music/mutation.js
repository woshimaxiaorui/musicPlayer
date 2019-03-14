import state from './state'
export default{
	changePlayList(state,argList){
		state.playList = argList;
	},
	changePlayIndex(state,index){
		state.playIndex = index;
	},
	changePlayerShow(state){
		state.playerShowFlag = !state.playerShowFlag
	},
	nextPlaySong(){
		state.playIndex += 1;
		if(state.playIndex >= state.playList.length){
			state.playIndex = 0;
		}
	},
	pervPlaySong(){
		state.playIndex -= 1;
		if(state.playIndex <= 0){
			state.playIndex = ( state.playList.length - 1 );
		}
	}
	
}