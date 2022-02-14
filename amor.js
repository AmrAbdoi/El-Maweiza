let exploreBtn=document.querySelector('.title .btn'),//title
HadithSectoin = document.querySelector('click',()=>{
    HadithSectoin.scrollIntoView({
        behavior:"smooth"
    })
})



let fixedNad =document.querySelector('.header'),
scrollBtn= document.querySelector('.scrollBtn');
window=addEventListener("scroll",()=>{
    window.scrollY>150? fixedNad.classList.add('active'):fixedNad.classList.remove('active');
  window.scrollY>300?scrollBtn.classList.add('active'):scrollBtn.classList.remove('active');
    /*if(window.scrollY>300)
    {
      scrollBtn.classList.add('active')
    }
    else
    {
      scrollBtn.classList.remove('active')
    }*/
   
})
scrollBtn.addEventListener('click',()=>{
  window.scrollTo({
    top:0,
    behavior:"smooth"
  })
})


//hadith channger
let hadithContainer=document.querySelector('.hadithContainer'),
next=document.querySelector('.buttons .next'),
prev=document.querySelector('.buttons .prev'),
number=document.querySelector('.buttons .number');
let hadithIndex=1;
HadithChanger();
function HadithChanger()
{
  
    fetch("https://api.hadith.sutanlab.id/books/muslim?range=1-300")
    //fetch("https://raw.githubusercontent.com/Mohamed-Nagdy/Quran-App-Data/main/Hadith%20Books%20Json/abi_daud.json")
    .then(response =>response.json())
    .then(data=>{
       // console.log(data);
        let Hadiths = data .data.hadiths;
       //console.log(Hadiths[hadithIndex].arab);
      changeHadith();
      next.addEventListener('click',()=>{
          hadithIndex==299? hadithIndex =0:hadithIndex++;
        //  console.log(hadithIndex);
          changeHadith()
      })
      prev.addEventListener('click',()=>{
        hadithIndex==0? hadithIndex =299:hadithIndex--;
        //console.log(hadithIndex);
        changeHadith()
        })
      function changeHadith(){
        hadithContainer.innerText = Hadiths[hadithIndex].arab;
        number.innerText=`300 - ${hadithIndex+1}`
      }
     
    })
}


//link section
let sectoins = document.querySelectorAll("section"),
    links=document.querySelectorAll('.header ul li');
links.forEach(link =>{
     link.addEventListener('click',()=>{
       document.querySelector('.header ul li.active').classList.remove('active');
       link.classList.add('active');
       let target =link.dataset.filter;
       sectoins.forEach(sectoin=>{
         if (sectoin.classList.contains(target))
         {
           sectoin.scrollIntoView({
             behavior : "smooth"
           })
         }
       })
     })
})
  
       

  

//surah api
let SurahsContainer = document.querySelector('.surahsContainer')
getsurahs()
function getsurahs()
{
  //fetch surahs meta data {name of surahs}
  fetch('https://api.quran.sutanlab.id/surah')//change api
  .then(response => response.json())
  .then(data=>{
    let surahs = data.data;
    let numberofSurahs = 114;
    SurahsContainer.innerHTML ="";
    for(let i=0;i<numberofSurahs;i++){
    
      SurahsContainer.innerHTML +=`
      
      <div class="surah">
      
        <p>${surahs[i].name.long}</p>
        <p>${surahs[i].name.transliteration.en}</p>
        <p>${surahs[i].revelation.arab}</p>
      </div>
      `
    }
    let SurahsTitels = document.querySelectorAll('.surah');
    let popup = document.querySelector('.surah-popup'),
    AyatContainer = document.querySelector('.ayat');
    SurahsTitels.forEach((title,index)=>{
      title.addEventListener('click',()=>{
        fetch(`http://api.alquran.cloud/v1/surah/${index+1}`)
        .then(response=>response.json())
        .then(data=>{
          AyatContainer.innerHTML="";
          let Ayat = data.data.ayahs;
          Ayat.forEach(aya=>{
            popup.classList.add('active');
            AyatContainer.innerHTML +=`
            <p>(${aya.numberInSurah}) - ${aya.text}</p>
            `
          })
        })

      })
    })
    let closePopup = document.querySelector('.close-popup');
    closePopup.addEventListener('click',()=>{
      popup.classList.remove('active');
      //console.log(SurahsTitels);
    })
  })
}



//azkar channger

/*let azkarContainer=document.querySelector('.azkarContainer'),
next=document.querySelector('.buttons .next'),
prev=document.querySelector('.buttons .prev'),
number=document.querySelector('.buttons .number');
let azkarIndex=1;
AzkarChanger();
function AzkarChanger()
{
  
    fetch("https://github.com/ahegazy/muslimKit/blob/master/docs/json/azkar_sabah.json")
    
    .then(response =>response.json())
    .then(data=>{
     
        let Azkar = data .title.content.zekr;
    
      changeAzkar();
      next.addEventListener('click',()=>{
          azkarIndex==30? azkarIndex =0:azkarIndex++;
          changeAzkar()
      })
      prev.addEventListener('click',()=>{
        azkarIndex==0? azkarIndex =30:azkarIndex--;
        changeAzkar()
        })
      function changeAzkar(){
        azkarContainer.innerText = zekr[azkarIndex].zekr;
        number.innerText=`300 - ${azkarIndex+1}`
      }
     
    })
}
*/
/*azkar()
function azkar()
{
  fetch("azkar.json")
  .then(response=>response.json())
  .then(data=>{
    let azkar= azkar.json();
    azkar.innerHTML="";
    
  })
}*/
/*fetch('azkar.json')
.then(response => response.json())
.then(data=>{
  let azkar = data.azkar.json();
  let numberofAzkar = 470;
  AzkarContainer.innerHTML ="";
  for(let i=0;i<numberofAzkar;i++){
  
    AzkarContainer.innerHTML += `
    
    <div class="azkar">
    
      <p>${azkar[i].azkar.json().count}</p>
      <p>${azkar[i].azkar.json().description}</p>
      <p>${azkar[i].azkar.json().reference}</p>
      <p>${azkar[i].azkar.json().zekr}</p>
    </div>
    `
  }*/




//pray time api
let cards = document.querySelector('.cards');
getPrayTimes();
function getPrayTimes()
{
  fetch("http://api.aladhan.com/v1/timingsByCity?city=Dubai&country=UnitedArabEmirates&method=8")
  .then(response=>response.json())
  .then(data=>{
    let times = data.data.timings;
    cards.innerHTML="";
    for (let time in times)
    {
      cards.innerHTML +=
      `
      <div class="card">
      <div class="circle">
      <svg>
      <circle cx="100" cy="100" r="100"><circle>
      </svg>
      <div class="praytime">${times[time]}</div>
      </div>
      <p>${time}</p>
      </div>
      `
    }
  })
}


/*active side bar*/
let bars = document.querySelector('.bars'),
SideBar = document.querySelector('.header ul');
bars.addEventListener('click',()=>{
  SideBar.classList.toggle("active");
})