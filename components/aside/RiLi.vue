<template>
  <div class="box-bj-sd">
    <h3>
      <i class="fa fa-calendar"></i>日历
    </h3>
    <div class="day_box">
      <div class="day_top">
        <span class="day1">{{year}}年{{month}}月</span>
        <span class="day2">星期{{week}}</span>
      </div>
      <div class="day_bottom">{{date}}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "asdie",
  data: () => ({
    year:'',
    month:'',
    date:'',
    week:''
  }),
  created() {
    const date = new Date();
    const arr = new Array("日", "一", "二", "三", "四", "五", "六");  
    this.year =  date.getFullYear() ;
    this.month = date.getMonth() + 1;
    this.date = date.getDate();
    const week = date.getDay();
    this.week = arr[week];
  }
};
</script>
