<template>
<div >
    <h1>components</h1>
    <ul class="list">
       <router-link v-for="i in list" :to="i" tag="li" :key="i" class="clearfix">
           <h2 class="left">{{i}}</h2>
           <p class="right">&gt;</p>
       </router-link> 
    </ul>
</div>
</template>

<script>
export default {
    name: 'index',
    data () {
        return {
            list: [
                'picker',
                'citySelect',
                'timeSelect',
                'banner',
                'switch',
                'alert',
                'upRefresh',
                'downRefresh',
                'keyboard',
                'pictureView',
                'upLoad'
            ]
        }
    }
}
</script>

<style lang="less">
h1{
    height: 40px;
    line-height: 40px;
    text-align: center;
    background: #404a53;
    color: #fff;
}
.list{
    li{
        height: 40px;
        width: 100%;
        background: #6aaadd;
        margin-bottom: 1px;
        color: #fff;
        font-size: 13px;
        h2{
        line-height: 40px;
        padding-left: 15px;
        }
        p{
            font-family: "PingFang SC,Microsoft YaHei";
            font-weight: bold;
            font-size: 27px;
            line-height: 40px;
            margin-right: 10px;
        }
    }
}
</style>