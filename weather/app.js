// vars:
const  generate = document.querySelector('#generate');
const  generate1 = document.querySelector('#generate1');
const apiKey = 'eb4b67d0e8172b8274c952d40b229b9a&units=metric';
const weatherDiv = document.querySelector('.weather');
const feelings = document.querySelector('#feelings');
let date = new Date();

// GET data from website:
const getWeather = async (zip,apiKey)=>{
  const res = await fetch (`https://api.openweathermap.org/data/2.5/weather?zip=${zip},us&appid=${apiKey}`);
  try{
    const data = await res.json();
    weatherIs = data.weather[0].main;
    console.log(data.weather[0].main);
    weatherDiv.textContent = weatherIs;
    weatherDiv.style.backgroundColor = '#e1e1e1';
    return data;
  }catch(error){
    console.log('Error: ', error);
  }
}

// Add Event: It's will help us to knowing what the weather is.
function weather(){
  const zipCode = document.querySelector('#zip').value;
    getWeather(zipCode,apiKey);
    generate.style.display = 'none';
    feelings.style.display = 'block';
    generate1.style.display = 'block';
};

generate.addEventListener('click', weather);

// get data from server:
// vars:
const dateDiv = document.querySelector('#date');
const tempDiv = document.querySelector('#temp');
const contentDiv = document.querySelector('#content');

const getProjectData = async (url)=>{
  const res = await fetch('/getData');
  try{
    const proData = await res.json();
    console.log(proData);
    dateDiv.innerHTML = `The date is: ${date}`;
    tempDiv.innerHTML = `The temperature is: ${proData.temp}`;
    contentDiv.innerHTML = `Your feeling abot the ${proData.weather} weather is: ${proData.feelings}`;

  }catch(error){
    console.log('Error: ', error);
  }
}

//post Data roate:
const postData = async (url = '', data = {})=>{
  const res = await fetch('/saveData', {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type':'application/json',
    },
    body: JSON.stringify(data),
  });

  try{
    const newData = await res.json();
    console.log(newData);
    return newData;
  }catch(error) {
      console.log("Error: ", error);
      }
};

// Add Event listener to post the data and change the UI:
function postAndChangeUI(){
  const zipCode = document.querySelector('#zip').value;
  const feelingsText = feelings.value;
    getWeather(zipCode,apiKey)
    .then(function(data){
      postData('/saveData',{weather:data.weather[0].main,temp:data.main.temp,feelings:feelingsText,});
      getProjectData('/getData');
    });
}
generate1.addEventListener('click',postAndChangeUI)
