<template>
<div class="load">
	加载中......
	<h4>{{error}}</h4>
</div>
</template>

<script>
export default {
	props:{
		error:{
			type:String
		}
	}
}
</script>

<style scoped>
.load{position: absolute;width: 100%;height: 100%;left:0;top: 0;z-index: 10;background: #fff;padding-top: 40%;text-align: center;color: #1360b0;font-size: .48rem;padding-top: 2rem;}
h4{font-size: .36rem;color: #C60000;margin-top: .8rem;}
</style>