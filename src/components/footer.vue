<template>
<footer>
	<span class="fl"></span>
	<input v-model="val" placeholder="说点什么。。。" type="" name="">
	<span class="fr" @click="send">发送</span>
</footer>
</template>

<script>
import {getString} from '../js/common.js'
export default {
	data (){
		return {
			val:''
		}
	},
	methods:{
		send:function(){
			if(this.val == ''){
				alert('聊天内容不能为空！')
				return
			}

            let url = getString('0200',{val:this.val})
            io.send(url)
            this.val = ''
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
footer{height: 1.18rem;position: absolute;bottom: 0;width: 100%;background: #f9f6f6;padding: .18rem .3rem;z-index: 8;}
.fl{width: .51rem;height: .5rem;background: url(../assets/look.png);background-size: 100% 100%;margin-top: .17rem;}
input{background: #ffffff;height: .8rem;border: 1px solid #e0e0e0;padding: 0 .1rem;color: #999;font-size: .3rem;margin-left: .17rem;border-radius: .04rem;width: 4.4rem;}
span.fr{display: block;width: 1.28rem;height: .8rem;line-height: .8rem;color: #fff;font-size: .3rem;background: #60b8ee;border-radius: .04rem;text-align: center;}
</style>
