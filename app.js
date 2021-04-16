let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();

const apiKey='d43561fad5cd9c93dd95acb0a94a8d49';

let baseURL='https://api.openweathermap.org/data/2.5/weather?zip=';

let button = document.querySelector('#generate')

let getWeatherApp = async()=>{

try{


const res = await fetch (baseURL + document.getElementById('zip').value+ '&units=metric&appid=' + apiKey)

const data = await res.json()

console.log(data)
console.log(data.main.temp)
return data.main.temp;

}catch(error){

console.log("error",error);
}

}

function getWeatherData (a){

a.preventDefault();



let zipCode= document.getElementById('zip').value;

let feeling= document.getElementById('feelings').value;


getWeatherApp()



.then(function (userData) {

console.log(userData)

sendData('/add',{date:newDate, temp:userData,  content:feeling});




}).then(function(newData){
    updateUI()});



   





      

const sendData= async (url = '' , data = {}) =>{

    console.log(data);

    

    const res= await fetch(url, {

    

        method: 'POST',

    

        credentials: 'same-origin',

    

        headers: {'content-type': 'application/json',},

    

        body: JSON.stringify(data),

    

        date: data.date,

    

        temp: data.temp,

    

        content: data.content,

    

    });

    

    try{

    

        const newData= await res.json();

    

        console.log(newData);

    

        return newData;

    

    }catch(error){

    

        console.log("error", error);

    

    }

    }
const updateUI =async ()=> {

const request = await fetch('/all');

try{

  const fullData = await request.json();

  document.getElementById('date').innerHTML = `Date: ${fullData.date}`;

  document.getElementById('temp').innerHTML = `Temperature: ${fullData.temp}`;

  document.getElementById('content').innerHTML = `Feeling: ${fullData.content}`;



}catch(error){

  console.log("error", error);

}
}}
button.addEventListener('click',getWeatherData)