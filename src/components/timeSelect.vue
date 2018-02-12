<template>
<div >
    <input type="text" placeholder="请选择" ref="input" v-model="text" onfocus="this.blur()">
    <div class="picker" ref="picker">
        <div class="picker-panel">
            <div class="picker-content">
                <div class="choose-hook">
                    <span class="picker-cancel left">取消</span>
                    <h2>{{title}}</h2>
                    <span class="picker-confirm right">确定</span>
                </div>
                <div class="wheel-hook">
                    <i></i>
                    <p class="picker-fullYear">年</p>
                    <p class="picker-month">月</p>
                    <p class="picker-day">日</p>
                    <ul class="picker-scroll left">
                        <li v-for="i in 31">{{i+1999}}</li>
                    </ul>
                    <ul class="picker-scroll left">
                        <li v-for="x in 12">{{x}}</li>
                    </ul>
                    <ul class="picker-scroll left">
                        <li v-for="y in day">{{y}}</li>
                    </ul>
                </div>
            </div>
        </div>
    </div> 
</div>
</template>

<script>
import Picker from '../config/scroll'
export default {
    data () {
        return {
            day: 0,
            text: '',
            indexTime: [0, 0, 0]
        }
    },
    props: ['title', 'initTime'],
    created() {
        let arr
        if (this.initTime) {
            arr = this.initTime.split('-')
            this.indexTime[2] = arr[2] - 1
        } else {
            arr = this.getDate()
            this.indexTime[2] = arr[2]
        }
        this.indexTime[0] = arr[0] - 2000
        this.indexTime[1] = arr[1] - 1
        this.day = this.getDay(arr[0], arr[1])
    },
    methods: {
        getDay(y, m) {
            return new Date(y, m, 0).getDate()
        },
        getDate() {
            let date = new Date()
            return [date.getFullYear(), date.getMonth() + 1, date.getDate()]
        }
    },
    mounted() {
        let picker = new Picker({
            el: this.$refs.picker,
            index: this.indexTime,
            color: '#23948e',
            select: (val) => {
                let time = val[0] + '-' + val[1] + '-' + val[2]
                this.text = time
                this.$emit('callback', time)
            },
            change: (index, list) => {
                if (index === 0 || index === 1) {
                    this.day = this.getDay(list[0].index + 2000, list[1].index + 1)
                    picker.refresh(2)
                }
            }
        })
        this.$refs.input.addEventListener('click', () => {
            picker.show()
        })
    }
}
</script>

<style lang="less" scoped>
input{
    margin: 20px;
    border: 1px solid #aaa;
}
.picker{
    display: none;
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    bottom: 0;
    transition: all .4s;
    .picker-panel{
        position: absolute;
        opacity: 1;
        z-index: 90;
        transform: translateY(200px);
        transition: all .4s;
        width: 100%;
        height: 220px;
        bottom: 0;
        left: 0;
        background: #fff;
        text-size-adjust: none;
        user-select: none;
        .picker-content{
            position: relative;
            .choose-hook{
                position: absolute;
                z-index: 100;
                top: 0;
                width: 100%;
                height: 40px;
                background: #fff;
                >h2{
                    color: #23948e;
                    text-align: center;
                    font-size: 14px;
                    line-height: 50px;
                }
                span{
                    position: absolute;
                    height: 30px;
                    width: 80px;
                    text-align: center;
                    line-height: 30px;
                    border: 1px solid #999;
                    top: 10px;
                    border-radius: 3px;
                    font-size: 14px;
                }
                span.left{
                    left: 10px;
                }
                span.right{
                    right: 10px;
                    color: #23948e;
                    border: 1px solid #23948e;
                }
            }
            .wheel-hook{
                position: absolute;
                z-index: 999;
                top: 45px;
                width: 100%;
                height: 170px;
                overflow: hidden;
                text-align: center;
                font-size: 18px;
                >i{
                    position: absolute;
                    z-index: 10;
                    display: block;
                    top: 70px;
                    height: 36px;
                    width: 100%;
                    border-top: 1px solid #ddd;
                    border-bottom: 1px solid #ddd;
                    pointer-events: none;
                }
                p{
                    position: absolute;
                    top: 77px;
                    color: #999;
                }
                .picker-fullYear{
                    left: 35%;
                }
                .picker-month{
                    right: 35%;
                }
                .picker-day{
                    right: 9%;
                }
                .picker-scroll{
                    margin-top: 70px;
                    width: 33%;
                    li{
                        text-overflow:ellipsis;
                        overflow: hidden;
                        white-space: nowrap;
                        width: 100%;
                        line-height: 36px;
                        height: 36px;
                        color: #999;
                    }
                }
                .picker-scroll:first-of-type{
                    width: 23%;
                    margin-left: 10%;
                }
                .picker-scroll:last-of-type{
                    width: 23%;
                    margin-right: 10%;
                }
            }
        }
    }
}
</style>