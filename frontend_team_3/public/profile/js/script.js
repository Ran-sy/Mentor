
//Mentor functionality
//searching in messages
const  searching =() =>{
 const message_items=document.getElementById("message-items");
const messages=document.querySelectorAll(".message");
const messag_searching=document.getElementById('message-search');
const val= messag_searching.value.toUpperCase();
const pname=message_items.getElementsByTagName("h5");


   messages.forEach(user =>{
    let name=user.querySelector('h5').textContent.toLocaleUpperCase();
    if(name.indexOf(val)!=-1){
        user.style.display="block";
    }
    else{
        user.style.display='none'; 
    }
   }

   )

}
var butt_message=document.getElementById("message-button");

var message_content=document.getElementById("message_content");

const sending_newmessage =()=>{

    message_content.insertAdjacentElement('afterend',message_content)
    

    

    message_content.style.display="block";
    send_message.style.display="block";
 
    
}
 //sending  Message
var send_message=document.getElementById("send_message");
var messagecontainer=document.querySelector('.message-part ')

send_message.addEventListener('click',submitt)

const To=document.getElementById("To");

const bodyy=document.getElementById("bodyy");
var feddback=[];
function submitt(e){
   
    const value1=To.value;
    const value2=bodyy.value;
    var messagecontainer=document.querySelector('.message-part ')
    messagecontainer.parentNode;
    
    
    if(value1&&value2 !==''){
        result={
        "Too":value1,
        "bodyyy":value2
       
        }
        feddback.push(result)
        console.log(result)
       addresult(result)  
       reset()
    }
   
    e.preventDefault();
}

function addresult(item){
    const div=document.createElement('div');
    // butt_message.before(div);
   
  
    div.innerHTML=`<div class="message " id="Message">

    <div class="message-img mt-3  " style="width: 70px; height: 70px;">
    <img src="images/woman2.png"  alt="" style="width: 50px; height: 50px;"  >
     
      </div>   

    <div class="message-body">
      <h5 class="small fw-bold">${item.Too}  </h5>
      <p class="small message-p">${item.bodyyy}
        <a href="#"> <i class="fa-solid fa-trash-can d-md-none d-block" id="trash" ></i></a></p>
     
     
    </div>    
    
    </div>
    
     
    `
    
   
  messagecontainer.appendChild(div)
    
  send_message.style.display="none";
   
  message_content.style.display="none";
  messagecontainer.append(butt_message)
 

}

function reset(){
    To.value='';
    bodyy.value='';
}



//message functionality at mobile view
const envlpoe_messag=()=>{
    var data=document.querySelector('.data');
    var messagecontainer=document.querySelector('.message-part ');
    var contentt=document.querySelector('.content')
    const messages=document.querySelectorAll(".message");
    
    data.style.display="none";
  
    messagecontainer.style.cssText=" visibility: visible ; postion:absolute ; margin-top:380px; right:5px;  "
   

}


//trash


   var message=document.querySelectorAll(".message")
var trash=document.querySelectorAll("#trash")
trash.forEach(function(item){
    var message=document.querySelectorAll(".message")
    var message_body=document.querySelectorAll(".message-body")
    item.onclick=function(){
message_body.remove();
message.style.display="none";
    }
})







 //////////// Mentee functionality







//searching in messages
const  searching2 =() =>{
    const message_items2=document.getElementById("messag_items");
   const messages2=document.querySelectorAll(".message3");
   const messag_searching2=document.getElementById('message-search2');
   const val3= messag_searching2.value.toUpperCase();
   const pname2=message_items2.getElementsByTagName("h5");
   
   
      messages2.forEach(user =>{
       let name=user.querySelector('h5').textContent.toLocaleUpperCase();
       if(name.indexOf(val3)!=-1){
           user.style.display="block";
       }
       else{
           user.style.display='none'; 
       }
      }
   
      )
   
   }
   var butt_message2=document.querySelector('.message-button2');
   
   var message_content2=document.querySelector('.message_content2');
   var sn=document.querySelector('.sn')
   
   const sending_newmessage2 =()=>{
   
    //    message_content2.insertAdjacentElement('afterend',message_content2)
       
   
       
   
       message_content2.style.display="block";
       sn.style.display="block";
    
       
   }
    //sending  Message

   var messagecontainer2=document.querySelector('.message-part2')
   
   sn.addEventListener('click',submittt)
   
   const To3=document.querySelector('.To3');
   
   const bodyy3=document.querySelector('.bodyy3')
   var feddback2=[];
   function submittt(n){
      
       const value12=To3.value;
       const value22=bodyy3.value;
       var messagecontainer2=document.querySelector('.message-part2')
       messagecontainer2.parentNode;
       
       
       if(value12&&value22 !==''){
           result2={
           "to":value12,
           "content":value22
          
           }
           feddback2.push(result2)
           console.log(result2)
          addresult2(result2)  
         
        }
    
        // resett()
        n.preventDefault();
   }
   
   function addresult2(item){
       const div3=document.createElement('div');
       // butt_message.before(div);
      
     
       div3.innerHTML=`  
       
       <div class="message " id="Message">

       <div class="message-img mt-3  " style="width: 70px; height: 70px;">
       <img src="images/woman2.png"  alt="" style="width: 50px; height: 50px;"  >
        
         </div>   
   
       <div class="message-body">
         <h5 class="small fw-bold">${item.to}  </h5>
         <p class="small message-p">${item.content}
           <a href="#"> <i class="fa-solid fa-trash-can d-md-none d-block" id="trash" ></i></a></p>
        
        
       </div>    
       
       </div>
       `
       
      
     messagecontainer2.appendChild(div3)
       
     sn.style.display="none";
      
     message_content2.style.display="none";
     messagecontainer2.append(butt_message2)
    
   
   }
   
   function resett(){
       To3.value='';
       bodyy3.value='';
   }
   
   
   
   //message functionality at mobile view
   const envlpoe_messag2=()=>{
       var data2=document.querySelector('#data2');
       var messagecontainer2=document.querySelector('.message-part2');
       var contentt2=document.querySelector('.content')
       const message2=document.querySelectorAll(".message");
       
       data2.style.cssText="display:none;"
     
       messagecontainer2.style.cssText=" visibility: visible ; postion:absolute ; margin-top:380px; right:5px;  "
      
   
   }
   
   
   //trash
   
   
//       var message=document.querySelectorAll(".message")
//    var trash=document.querySelectorAll("#trash")
//    trash.forEach(function(item){
//        var message=document.querySelectorAll(".message")
//        var message_body=document.querySelectorAll(".message-body")
//        item.onclick=function(){
//    message_body.remove();
//    message.style.display="none";
//        }
//    })
   
   
   
   
   // ////////////



