const resultDisplay = document.getElementById("result");
      /*  gets textarea content */
 function getInputText(){
  let inputtedText = document.getElementById("text").value;
  if(inputtedText!=="")
   assignValue(inputtedText);
   else alert("Please Input Some Text");
}
          /*  showing the results */
async function assignValue(input){
   
    resultDisplay.innerText = "loading..."
    resultDisplay.classList.add("loader");       //  adding loading animation
     const results = await sendToAPI(input);
     resultDisplay.classList.remove("loader");    //  removing loading animation
     switch(results[0]) {      // checking the type for color
      case "neutral":
          resultDisplay.style.color = "gray";
          break;
      case "negative":
        resultDisplay.style.color = "red";
          break;
          case "positive":
            resultDisplay.style.color = "green";
          break;
      default:
        resultDisplay.textContent = "There was an Error"
    }
  
     resultDisplay.innerText = `The type is: ${results[0]}   
     The polarity is: ${results[1]}`;     // line break in backticks wrapped string
}

 async function sendToAPI(userText) {
  const response = await fetch("https://sentim-api.herokuapp.com/api/v1/", {
    method: "POST",
    headers: {
      Accept: "application/json",
       "Content-Type": "application/json",
    },
    body: JSON.stringify({"text": userText})

  }).catch(     /* code executed on bad fetch */
    function(error) {
    resultDisplay.classList.remove("loader");
    resultDisplay.textContent = "There was an Error"
    showCat(error);
    }); 
    
    if(response.ok){      
      /* code executed on good fetch */
        const data = await response.json();
          const resultType = data.result.type;
          const resultPolarity = data.result.polarity;
          showCat(200)
            return [resultType, resultPolarity];
       }
       }
       
       /* setting the img source */
       async function showCat(status){
        document.getElementById("catsImage").setAttribute("src",
         (`https://http.cat/${status}.jpg`));
        
      }


      /*  clear button */
  function clearText(){
    document.getElementById("text").value = "";
    document.getElementById("result").textContent = "";
  }
  /*  event listeners */
  const runBtn = document.getElementById("run");
  runBtn.addEventListener("click",getInputText);
  
  const clearB = document.getElementById("clear")
  clearB.addEventListener("click", clearText);
  