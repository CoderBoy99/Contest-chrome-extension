const months = {
  'Jan': "January",
  'Feb': "February",
  'Mar': "March",
  'Apr': "April",
  'May': "May",
  'Jun': "June",
  'Jul': "July",
  'Aug': "August",
  'Sept': "September",
  'Oct': "October",
  'Nov' :"November",
  'Dec' : "December",
};

var alarm_time;
var alarm_id;

function addSuffix(date){
    var n = date.length;
    const lastChar = date.charAt(n-1);

    if(lastChar=="1")
    return "st";
    else if(lastChar=="2")
    return "nd";
    else if(lastChar=="3")
    return "rd";
    else
    return "th";

}


    $(document).ready(function(){
    $.getJSON("https://contest-server.herokuapp.com/getData", function (data) {
      
        var htmlTemplate;

        for(var i=0;i<3;i++){

            htmlTemplate = "";
            const details = data[i];
            const contest_url = details["contest_url"];
            const contest_date = details["contest_date"];
            const duration = details["duration"];
            const start_time = details["start_time"];
            const contest_name = details["contest_name"];
            const website_name = details['website_name'];
            const name = website_name.charAt(0).toUpperCase()+website_name.slice(1); 

            htmlTemplate = `<h3> ${name} </h3>
                            <p>Contest Name : ${contest_name}</p> 
                            <p>Start Time : ${start_time}</p> 
                            <p>Duration : ${duration}</p> 
                            <p>Contest date : ${contest_date}</p> 
                            <a target="_blank" href="${contest_url}">Link</a>`;

            $(`#${website_name}`).after(htmlTemplate);        
            
            
            // if(website_name=="leetcode"){
            //         const time_info = contest_date.split(" ");
            //         const date = time_info[1].slice(0,2);
            //         const time = months[time_info[0]] + " " + date + addSuffix(date) +" "+time_info[2]+" ";
            //         formattedTimeLeetcode = time + formattedTimeLeetcode;
            // }else if(website_name=="codeforces"){
            //     const time_info = contest_date.split("/");
            //     formattedTimeCodeforces = months[time_info[0]] + " " + time_info[1] + addSuffix(time_info[1]) + " " + time_info[2] + " "+formattedTimeCodeforces;

            // }else if(website_name=="codechef"){

            //     var time_suffix = "am";
            //     var formated_time = start_time.slice(0,2);

            //     if(formated_time>"12"){
            //         var time_val = parseInt(formated_time);
            //         time_val -= 12
            //         formated_time = time_val.toString();
            //         time_suffix = "pm";
            //     }  
            //     formated_time += start_time.slice(2) + " "+time_suffix;

            //     const date_info = contest_date.split(",");
            //     const date_month = date_info[1].trim().split(" ");
            //     formattedTimeCodechef = date_month[1]+" "+date_month[0]+" "+date_info[2].trim()+" "+ formated_time;

            // }
        
        }

    })
});

    
//  document.getElementById('triggerAlarm').addEventListener('click',function(){

//         document.getElementById('triggerAlarm').remove();

//         var startTime = moment();
//         var LeetcodeTime = moment(`${formattedTimeLeetcode}`,"MMMM Do YYYY HH:mm a");
//         var CodechefTime = moment(`${formattedTimeCodechef}`,"MMMM Do YYYY HH:mm a");
//         var CodeforcesTime = moment(`${formattedTimeCodeforces}`,"MMMM Do YYYY HH:mm a");

//         var diff_leetcode = Math.ceil(parseInt(moment.duration(LeetcodeTime.diff(startTime)).asSeconds()));
//         var diff_codeforces = Math.ceil(parseInt(moment.duration(CodeforcesTime.diff(startTime)).asSeconds()));
//         var diff_codechef = Math.ceil(parseInt(moment.duration(CodechefTime.diff(startTime)).asSeconds()));

//         const time_arr = [diff_leetcode,diff_codeforces,diff_codechef];
//          alarm_time = Math.min(...time_arr);
//          alarm_time -= 10;

//         var lastest_contest;

//         if (alarm_time == diff_leetcode) lastest_contest = "Leetcode";
//         else if (alarm_time == diff_codeforces) lastest_contest = "Codeforces";
//         else lastest_contest = "Codechef";


//         if(alarm_time<0){
//             alert(`Contest is already started on ${lastest_contest}`)
//             return false;
//         }else{
//             alert(`Alarm is set for the ${lastest_contest}`)
  
//         }

//         alarm_id = setInterval(updateCounDown, 1000, lastest_contest);

//     });


//      updateCounDown = (lastest_contest) => {

//          if (alarm_time < 0) {
//              showAlert(lastest_contest)
//              clearInterval(alarm_id);
//              return false;
//          }

//          var days = Math.floor((alarm_time % (86400 * 30)) / 86400);
//          var hours = Math.floor((alarm_time % 86400) / 3600);
//          var minutes = Math.floor((alarm_time % 3600) / 60);
//          var seconds = alarm_time % 60;

//          days = days < 10 ? "0" + days : days;
//          hours = hours < 10 ? "0" + hours : hours;
//          minutes = minutes < 10 ? "0" + minutes : minutes;
//          seconds = seconds < 10 ? "0" + seconds : seconds;

//          $(".showAlarm").html(
//            ` <div class="timer">

//     <div class="timer_box">
//       <div class="time_info">
//     ${days}
        
        
//       </div>
//       <div class="time_tag">
//         <p>Day</p>
//       </div>

//     </div>
      
//     <div class="dots">:</div>


//     <div class="timer_box">
//       <div class="time_info">
//      ${hours}

        
//       </div>
//       <div class="time_tag">
//         <p>Hrs</p>  
//       </div>
//     </div>
    
//      <div class="dots">:</div>

//     <div class="timer_box">
//       <div class="time_info">
//         ${minutes}
        
//       </div>
      
//               <div class="time_tag">
//                 <p>Min</p>
//               </div>
//     </div>
      
//  <div class="dots">:</div>

//     <div class="timer_box">
//       <div class="time_info">
//         ${seconds}
        
//       </div>
//       <div class="time_tag">
//         <p>Sec</p>
//       </div>
//     </div>
    
//   </div>`
//          );

//        alarm_time -= 1;

//     }

//     showAlert = (lastest_contest) =>{
//         alert(`Contest is about start in 10 seconds on ${lastest_contest}`);
//     }

     