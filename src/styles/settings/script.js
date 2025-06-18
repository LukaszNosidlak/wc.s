import Swiper from 'swiper';
import { Autoplay, Pagination } from 'swiper/modules';

const swiperSolution = new Swiper('.swiper-solution', {
  slidesPerView: 1,
  spaceBetween: 30,
  loop: true,
  modules: [Autoplay,Pagination],
  autoplay: {
    delay: 1000,
    disableOnInteraction: false,
  },
  pagination: {
    el: '.solution__dots', 
    dynamicBullets:true,
    type:'bullets',
    clickable:true,
  },  
  breakpoints: {
    768: {
      slidesPerView: 2,
      spaceBetween: 20
    },
    992: {
      slidesPerView: 2,
      spaceBetween: 30
    },
    1200: {
      slidesPerView: 3,
      spaceBetween: 30
    },
    1400: {
      slidesPerView: 4,
      spaceBetween: 30
    }
  },

});


const swiperReference = new Swiper('.swiper-reference', {
  modules: [Autoplay,Pagination],
  autoplay: {
    delay: 1000,
    disableOnInteraction: false,
  },
  pagination: {
    el: '.reference__dots', 
    dynamicBullets:true,
    type:'bullets',
    clickable:true,
  },  
  slidesPerView: 1,
  spaceBetween: 20,

  loop:true,
  breakpoints: {
    992: {
      spaceBetween: 30
    },
  },
});




document.addEventListener('DOMContentLoaded',function(e){
  
  // dzialanie swiperReference   
  const reference__clients=document.getElementById("reference__clients");
  const clients=Array.from(reference__clients.querySelectorAll('.reference__client'));

  const reference__bullets=document.getElementById("reference__dots");
  const bullets=Array.from(reference__bullets.querySelectorAll('span.swiper-pagination-bullet'));

  swiperReference.on('slideChangeTransitionEnd',function(){
    let currentIndex=parseInt(swiperReference.realIndex);
    clients.forEach(function(client,i){
        client.classList.remove("reference__client--active");
        if(i==currentIndex){
          client.classList.add("reference__client--active");
        }
      });

  })

  clients.forEach(function(client){
    client.addEventListener('click',function(){
      let clientID = parseInt(client.id.slice(-1)) -1;
      swiperReference.slideTo(clientID);
    })
  })



//działanie wyboru jezyka(flagi)
  if (!localStorage.getItem("flag")) {
    localStorage.setItem("flag", "Polish"); 
  }

  const lang=document.getElementById("lang__wrap");
  const flag__wrap=document.getElementById("lang__flag_wrap");
  const arrow=document.getElementById("lang__arrow");
  const flags = Array.from(flag__wrap.querySelectorAll('.lang__flag'));

  document.body.addEventListener('click',function(){

    lang.classList.remove("lang--active");
    arrow.classList.remove("lang__arrow--active");
    flag__wrap.classList.remove("lang__flag_wrap--active");

    lang.classList.add("lang--inactive");
    arrow.classList.add("lang__arrow--inactive");
    flag__wrap.classList.add("lang__flag_wrap--inactive");

  });

  setFlag(localStorage.getItem("flag"));

  function setFlag(flagName){
    deactivatingFlags();
    flags.forEach(function(flag){
      if(flagName==flag.alt){

        flag.classList.remove("lang__flag--inactive");
        flag.classList.add("lang__flag--active");
      }
    })
  }

  arrow.addEventListener('click',function(e){
    e.stopPropagation();  
    if(arrow.classList.contains("lang__arrow--active")){

      flag__wrap.classList.remove("lang__flag_wrap--active");
      arrow.classList.remove("lang__arrow--active");
      lang.classList.remove("lang--active");

      flag__wrap.classList.add("lang__flag_wrap--inactive");
      arrow.classList.add("lang__arrow--inactive");
      lang.classList.add("lang--inactive");

    }else if(arrow.classList.contains("lang__arrow--inactive")){

      flag__wrap.classList.remove("lang__flag_wrap--inactive");
      lang.classList.remove("lang--inactive");
      arrow.classList.remove("lang__arrow--inactive");

      flag__wrap.classList.add("lang__flag_wrap--active");
      lang.classList.add("lang--active");
      arrow.classList.add("lang__arrow--active");
      activatingFlags();
      

    }
    
  });


  lang.addEventListener('click',function(e){
    e.stopPropagation();
    if(lang.classList.contains("lang--active")){
      lang.classList.toggle("lang--active");
      arrow.classList.toggle("lang__arrow--active");
      flag__wrap.classList.toggle("lang__flag_wrap--active");
      activatingFlags();
      flagClick();
    };
    if(lang.classList.contains("lang--inactive")){
      lang.classList.toggle("lang--inactive");
      arrow.classList.toggle("lang__arrow--inactive");
      flag__wrap.classList.toggle("lang__flag_wrap--inactive");
      flagClick();

    };
    flags.forEach(function(flag){
      flag.addEventListener('click',function(){
        lang.classList.remove("lang--inactive");
        lang.classList.add("lang--active");
  
      })
    });
  })
      
  flag__wrap.addEventListener('click',function(e){
    e.stopPropagation(); 
    flagClick();
    if(flag__wrap.classList.contains("lang__flag_wrap--active")){
      
    }else
     if(flag__wrap.classList.contains("lang__flag_wrap--inactive")){

      flag__wrap.classList.remove("lang__flag_wrap--inactive");
      lang.classList.remove("lang--inactive");
      arrow.classList.remove("lang__arrow--inactive");

      flag__wrap.classList.add("lang__flag_wrap--active");
      lang.classList.add("lang--active");
      arrow.classList.add("lang__arrow--active");
      activatingFlags();

    }else{
      
    }

  })

  function flagClick(){
    flags.forEach(function(flag){
      flag.addEventListener('click',function(e){
        e.stopPropagation();
        if(flag__wrap.classList.contains("lang__flag_wrap--inactive")){
          flag__wrap.classList.remove("lang__flag_wrap--inactive");
          lang.classList.remove("lang--inactive");
          arrow.classList.remove("lang__arrow--inactive");

          flag__wrap.classList.add("lang__flag_wrap--active");
          lang.classList.add("lang--active");
          arrow.classList.add("lang__arrow--active");
          activatingFlags();
        }else if(flag__wrap.classList.contains("lang__flag_wrap--active")){
          deactivatingFlags();
          flag__wrap.classList.remove("lang__flag_wrap--active");
          flag__wrap.classList.add("lang__flag_wrap--inactive");
          arrow.classList.remove("lang__arrow--active");
          arrow.classList.add("lang__arrow--inactive");
          
          
          flag.classList.remove("lang__flag--inactive");
          flag.classList.add("lang__flag--active");
          localStorage.setItem("flag",flag.alt);
        }

      })
      });
  }
  flagClick();
  function deactivatingFlags(){
    flags.forEach(function(flag){
      flag.classList.remove("lang__flag--active");
      flag.classList.add("lang__flag--inactive");
      
    });
  }
  function activatingFlags(){
    flags.forEach(function(flag){
      flag.classList.remove("lang__flag--inactive");
      flag.classList.add("lang__flag--active");
      
    });
  }



  
  
  
  
  
  

  const news__items = document.getElementById("news__items");
  const news__description = Array.from(news__items.querySelectorAll("p.news__description"));


  news__description.forEach(function (el) {
    if (el.textContent.length > 100) {
      let cutText = el.textContent.slice(0, 98) + "...";
      el.textContent = cutText;
    }
  });


  
});
