
var pushArr=[];

function handleData(data){
    // console.log(data);
    
    var divcontainerEl=document.createElement("div");
    divcontainerEl.setAttribute("class","container");
    
    divcontainerEl.classList.add("row","mx-auto","bg-success");

    var headingEl=document.createElement("h1");
    headingEl.setAttribute("id","title");
    headingEl.setAttribute("class","text-center");
    headingEl.innerHTML="Countries and Temperatue Card";




    for(let i=0;i<data.length;i++){

        var divEl=document.createElement("div");
        divEl.setAttribute("class","col-lg-4");
        divEl.classList.add("mb-3","mt-3","col-sm-12","mx-auto");
        divEl.innerHTML=` <div class="card text-center" style="width: 18rem;height:26rem; margin: 0 auto;">
        <h5 class="card-header py-2 bg-dark mb-0 text-white">${data[i].name}</h5>
        <div class="div-image" style="height:250px" ><img src=${data[i].flag} class="card-img-top" alt="country-flag">
        </div>
        <div class="card-body">
             <h5 class="card-title">Capital : ${data[i].capital}</h5>
             <h5 class="card-title">Region : ${data[i].region}</h5>
             <h5  class="card-title">Country Code: ${data[i].alpha3Code}</h5>    
                   
          <a href="#" id= ${data[i].alpha3Code} onclick="displayTemp(this.id)" class="btn btn-primary">click for weather</a>
        </div>
      </div>`;
      divcontainerEl.append(divEl);

      pushArr.push(data[i]);

    }

    document.body.append(divcontainerEl);

}

var res=fetch("https://restcountries.com/v2/all")
.then((packetdata)=>packetdata.json())
.then(handleData)
.catch((error)=>console.log(error));


// console.log("con",countryDetails);
console.log("pushArr",pushArr);

function displayTemp(alphacode){

  var lat,lon;
  for(let i=0;i<pushArr.length;i++){

    if(pushArr[i].alpha3Code===alphacode){
      console.log(pushArr[i].latlng);
      [lat,lon]=pushArr[i].latlng;
    }
   
  }
    
  // console.log(lat,lon);

  openData(lat,lon,alphacode);
}


//async await

async function openData(lat,lon,alphacode){

  var res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=caf7428b4923d4ee806cf035f1070c9a`);
  var res1 = await res.json();
  var Temp= res1.main.temp;
  document.getElementById(alphacode).innerHTML=Temp;
  // console.log("temp is", Temp);
  // console.log("re1 is",res1);

}

