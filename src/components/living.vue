<template>
<div class="living">
	<ul>
		<li v-for="i in historyArr">
			<h3>
				<span class="fl"></span>
				{{i.updateDate}}
			</h3>
			<article>{{i.content}}</article>
		</li>
	</ul>
	<div class="loadMore" @click="load"><span>{{morehis}}</span></div>
</div>
</template>

<script>
const addnum = 10
import {getString} from '../js/common'
import {dataTime} from '../js/common.js'
export default {
	data (){
		return {
			num:addnum
		}
	},
	props:{
		historyArr:{
			type:Array,
		},
		morehis:{
			type:String
		}
	},
	watch:{
		'historyArr':function(newVal,oldVal){
			for(let i = 0;i < this.historyArr.length; i++){
				this.historyArr[i].updateDate = dataTime(this.historyArr[i].updateDate)
			}
		}
	},
	methods:{
		load:function(){
			if(this.morehis == '没有更多了')
				return
			this.$parent.morehis = '加载中...'

            let url = getString('0340',{"start":this.num,"size":addnum})
            this.num += addnum
            io.send(url)
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.living{padding: .3rem;overflow-y:auto;height: 100%;}
span.fl{display: block;width: .21rem;height: .21rem;background: url(../assets/time.png);background-size: 100% 100%;margin-left: -.28rem;margin-top: .02rem;}
h3{color: #3472c5;font-size: .24rem;font-weight: normal;}
article{line-height: .45rem;color: #000;margin-top: .12rem;}
.living li{padding-left: .2rem;margin-bottom: .3rem;}
.living img{max-width: 100%;display: block;margin: .08rem 0;}
</style>
