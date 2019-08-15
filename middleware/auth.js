import { log } from "util";
// console.log(log);
const axios = require('axios')
export default function (context) {
  // context.userAgent = process.server ? context.req.headers['user-agent'] : navigator.userAgent;
  console.log('middleware');
  // axios
  //   .get("api/zllublogAdmin/article/get.article.php")
  //   .then(res => {

  //      console.log(res.data.list);
    
  //        context.reqData = res.data.list;
     
      
  //   });
}