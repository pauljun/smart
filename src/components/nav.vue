<template>
<nav>
	<span v-bind:class="[index == 0 ? 'active' : '']" @click="change(0)">直播回顾</span>
	<em>|</em>
	<span v-bind:class="[index == 1 ? 'active' : '']" @click="change(1)">聊天室</span>
	<em>|</em>
	<span v-bind:class="[index == 2 ? 'active' : '']" @click="change(2)">抢先预售</span>
	<div class='fr' @click="show"></div>

	<div class="list" v-show="isKF">
		<ul>
			<li>客服</li>
			<li>销售</li>
			<li>技术</li>
		</ul>
	</div>
</nav>
</template>

<script>
export default {
	data (){
		return {
			isKF:false,
			index:0
		}
	},
	methods:{
		show:function(){
			if(this.isKF)
				this.isKF = false
			else
				this.isKF = true
		},
		change:function(index){
			this.$parent.navChange(index)
			this.index = index
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
nav{border-bottom: 1px solid #cccccc;height: .86rem;line-height: .86rem;padding: 0 .3rem;font-size: .32rem;color: #666;position: absolute;width: 100%;top: 5.13rem;left: 0;z-index: 5;}
nav em{margin:0 .2rem;font-style: normal;color: #aaaaaa;}
div.fr{width: .78rem;height: .69rem;background: url(../assets/kefu.png);background-size: 100% 100%;margin-top: .08rem;}
nav span.active{color: #60b8ee;border-bottom: 2px solid #60b8ee;padding: .2rem 0}
.list{position: absolute;z-index: 5;right: 0;top: .86rem;background: rgba(19,96,176,0.8);width: 1.6rem;height: 2rem;color: #fff;font-size: .34rem;}
.list ul li{line-height: .66rem;padding-left: .65rem;background: url(../assets/icon.png) no-repeat .2rem center;background-size: .35rem .35rem;}
</style>