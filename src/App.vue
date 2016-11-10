<template>
    <div id="app">
        <my-header></my-header>
        <my-video></my-video>
        <div class="gray"></div>
        <my-nav></my-nav>
        <section>
            <living v-show="active==0" :historyArr="historyArr" :morehis=morehis></living>
            <chat v-show="active==1" :chatArr=chatArr :moreText=moreText></chat>
        </section>  
        <my-footer v-show="active==1"></my-footer>
        <!-- <no-login></no-login> -->
        <!-- 加载动画效果 -->
        <load v-show="model==10" :error="error"></load>
    </div>
</template>

<script>
import myHeader from './components/header'
import myVideo from './components/video'
import myNav from './components/nav'
import living from './components/living'
import chat from './components/chat'
import myFooter from './components/footer'
import load from './components/load'

import {socket} from './js/socket'
import send from './js/send'

export default {
    name: 'app',
    components: {
        myHeader,
        myVideo,
        myNav,
        living,
        chat,
        myFooter,
        load
    },
    data (){
        return {
            active:0,
            //直播回顾内容
            historyArr:new Array(),
            //房间状态
            model:0,
            //错误信息
            error:'',
            //聊天内容
            chatArr:new Array(),
            //聊天记录状态
            moreText:'加载更多',
            //历史图文列表状态
            morehis:'加载更多'
        }
    },
    mounted:function(){
        var $this = this

        //连接socket
        let link = function(){
            if(window.WebSocket){
                window.io = socket()

                io.onopen = function(){
                    $this.error = '连接成功'
                    send()
                }

                io.onerror = function(e){
                    $this.error = '连接失败，正在重连...'
                    link()
                    return
                }

                io.onmessage = function(d){
                    let str = d.data;
                    let num = str.slice(1,5);
                    let data = str.substr(5);
                    data = eval('(' + data + ')')
                    console.log(num)
                    console.log(data)

                    switch(num){
                        case '0100':
                            if(data.status != 200){
                                $this.error = data.message
                                //return
                            }
                        break
                        //获取图文列表
                        case '0340':
                            if(data.body.length < 10)
                                $this.morehis = '没有更多了'
                            else
                                $this.morehis = '加载更多'
                            $this.historyArr = $this.historyArr.concat(data.body)
                        break
                        //发布/修改图文通知
                        case '1341':
                            let ishas = 0
                            let picId = data.body.id

                            for(let i = 0;i < $this.historyArr.length;i++){
                                if($this.historyArr[i].id == picId){
                                    ishas = 1
                                    $this.historyArr.splice(i,1,data.body)
                                }
                            }               

                            //如果不是修改
                            if(ishas != 1)
                                $this.historyArr.unshift(data.body)
                            break
                        //直播
                        case '1800':
                        break
                        //历史聊天记录
                        case '0201':
                            if(data.body.length < 20){
                                $this.moreText = '没有更多了'
                            }else
                                $this.moreText = '加载更多'
                            $this.chatArr = $this.chatArr.concat(data.body)
                        break
                        //用户群聊通知
                        case '1200':
                            let arrVal = data.body
                            $this.chathistory.unshift(arrVal)
                            break
                    }
                }
            }
        }

        link()
    },
    methods:{
        navChange:function(index){
            this.active = index
        }
    }
}
</script>

<style>
@charset "UTF-8";
html{height: 100%;}
body{font-family: "Microsoft YaHei",Arial,Helvetica,sans-serif;font-size: .28rem;margin: 0 auto;max-width: 720px;position: relative;height: 100%;overflow: hidden;}
img{border: none;vertical-align: middle;}
li{list-style: none}
a{text-decoration: none;}
html,div,p,h2,h3,h4,h5,h6,img,ul,li{margin: 0;padding:0;}
* {
    tap-highlight-color: rgba(255,255,255,0);
 
    -ms-tap-highlight-color: rgba(255,255,255,0);
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    -ms-box-sizing: border-box;
    box-sizing: border-box;

  -webkit-appearance: none;
  -webkit-text-size-adjust: none;
  -webkit-touch-callout:none; 
  -webkit-tap-highlight-color: rgba(0,0,0,0);
    outline: 0;
}
.fl{float: left;}
.fr{float: right;}
.clear{clear:both;line-height:0;}
.clearfix:after {visibility: hidden; display: block; font-size: 0; content: " "; clear: both; height: 0; }
div.gray{background: #dadbdf;height: .15rem;position: absolute;left: 0;width: 100%;top: 4.98rem;z-index: 5;}
section{position: absolute;left: 0;top: 0;width: 100%;padding-top: 6rem;height: 100%;overflow: hidden;}
.loadMore{font-size: .3rem;text-align: center;color: #1360b0;}
</style>
