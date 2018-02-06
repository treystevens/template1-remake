document.addEventListener('DOMContentLoaded', () => {

    function newElement(elem) {
        return document.createElement(elem);
    }

    function idGrab(id) {
        return document.getElementById(id);
    }

    function multiClassAdd(elems, className){
        elems.forEach( (elem) =>{
            return elem.classList.add(className)
        })
    }
    
    // Modal Box
    const imgView = Array.from(document.querySelectorAll('.flex-card img'));
    let closeBtn = newElement('button');
    closeBtn.textContent = "Close";
    closeBtn.classList.add('close-btn');

    imgView.forEach( (img) => {
        img.addEventListener('click', (evt) => {

            // Get source attribute of clicked image
            let imgSrc = evt.target.getAttribute('src');

            // Create elements for Modal Box
            let modalImgBox = document.querySelector('.js-modalImg div');
            let overlayWrap = newElement('div');
            let imgContainer = newElement('div');
            let imgTag = newElement('img');
          
            let leftBtn = newElement('button');
            let rightBtn = newElement('button');

            // Defining button content
           
            rightBtn.innerHTML = "&rarr;";
            leftBtn.innerHTML = "&larr;";

            // Changing the source of the imgTag
            imgTag.src = imgSrc;
            imgTag.classList.add('img-full');


            // Adding classes to elements
            imgContainer.classList.add('img-full__container');
            overlayWrap.classList.add('overlay-wrapper')
            rightBtn.classList.add('next-btn');
            leftBtn.classList.add('prev-btn');

            // Appending to DOM
            imgContainer.appendChild(imgTag);
            imgContainer.appendChild(closeBtn)
            overlayWrap.appendChild(imgContainer);
            overlayWrap.insertAdjacentElement('afterbegin', rightBtn);
            overlayWrap.insertAdjacentElement('afterbegin', leftBtn);
            modalImgBox.insertAdjacentElement('afterbegin', overlayWrap);

            // Navigating Modal box w/ next & previous buttons
            let imgNav = Array.from(document.querySelectorAll('.js-imageNav img'));
            let imgNavSrcArr = imgNav.map((image, index) =>{
                return imgNav[index].attributes[0].nodeValue
            })
        
            // Get index of current image in DOM array
            let imgIndex;
            for(let  i = 0; i < imgNavSrcArr.length; i++){
                if(imgSrc === imgNavSrcArr[i]){
                   imgIndex = i;
                }
            };

            // Next Image
            rightBtn.addEventListener('click', (evt) => {
                imgIndex = (1 + imgIndex) % imgNavSrcArr.length;
                imgTag.src = imgNavSrcArr[imgIndex];
            })

            // Previous Image
            leftBtn.addEventListener('click', (evt) => {
                imgIndex -= 1;
                if(imgIndex == -1){
                    imgIndex = 5;
                }
                imgTag.src = imgNavSrcArr[imgIndex];
            });

            // Close the Modal Box
            closeBtn.addEventListener('click', () => {
                modalImgBox.removeChild(overlayWrap)
            })

            // Click outside of Modal box to close
            window.onclick = function (event) {
                if (event.target == overlayWrap) {
                    modalImgBox.removeChild(overlayWrap);
                }
            };
        })
    });

        function animateValue(classes, start, end, duration) {
    
        var classArr = Array.from(document.getElementsByClassName(classes));
        var range = end.map((classEndTimes) => {
            return classEndTimes - start;
        })
        var minTimer = 50;

        for( let i = 0; i < classArr.length; i++){
        let stepTime = Math.abs(Math.floor(duration / range[i])); 
        // never go below minTimer
        stepTime = Math.max(stepTime, minTimer); 
    
        let startTime = new Date().getTime(); // this gets current time
        let endTime = startTime + duration; // time you want to end, you add the duration to the current time
        var timer;
    
        function run() {
            var now = new Date().getTime();
            var remaining = Math.max((endTime - now) / duration, 0);
            var value = Math.round(end[i] - (remaining * range[i]));
            classArr[i].innerHTML = value;
            if (value == end[i]) {
                clearInterval(timer);
            }
        }
    
        var timer = setInterval(run, stepTime); // set interval takes a function and milliseconds as its argument.. so every 50 ms it runs that function
        run(i);
        }
    }
    
    animateValue("animated-numbers",  0,  [196, 97, 12402, 12202],  2000);


// Start of API
// 
// 
// 
// 
// 

    const api = 'https://api.sandbox.amadeus.com/v1.2/flights/inspiration-search?';
    const apiKey = config.flightApiKey;
    const iacaAPI = config.cityNameApiKey;
    let checkBox = idGrab('oneway-trip');
    let formSub = idGrab('formsub');
    let returnDateDiv = idGrab('form__returndate');


    // If user wants one way trip hide roundtrip div
    checkBox.addEventListener('click', (evt) =>{
        if(checkBox.checked){
            checkBox.checked = true;
            returnDateDiv.style.display = 'none';
        }
        else{
            checkBox.checked = false;
            returnDateDiv.style.display = 'block'
        }
        
    })
    

    formSub.addEventListener('submit', (evt) => {
        let flightResultsDiv = newElement('div');
        let availableFlightList = newElement('ul');

        let submitBtn = idGrab("submit-btn");
        let buildUrlArr = [];
        let jsModalBox = document.getElementsByClassName('js-modalBox')
        let origin;
        let maxPrice;
        let tripDestination;
        let tripDate;
        let roundTrip
        let returnDate;
        let customURL = '';
        const emptyInput = Array.from(document.getElementsByTagName('input'));
        evt.preventDefault();

        // Clear array on every submission
        buildUrlArr.length = 0;

        // Make sure URL Params are not empty or have spaces
        if (idGrab('origin').value !== '') {
            origin = 'origin=' + idGrab('origin').value;
            buildUrlArr.push(origin.trim());
        }
        if (idGrab('max_price').value !== '') {
            maxPrice = '&max_price=' + parseFloat(idGrab('max_price').value.replace(/\$|,/g, ''));
            buildUrlArr.push(maxPrice.trim());
        }
        if (idGrab('trip-destination').value !== '') {
            tripDestination = '&destination=' + idGrab('trip-destination').value;
            buildUrlArr.push(tripDestination.trim());
        }
        if (idGrab('trip-date').value !== ''){
            if(idGrab('return-date').value !== ''){
                roundTrip = '&departure_date=' + idGrab('trip-date').value + '--' + idGrab('return-date').value;
                buildUrlArr.push(roundTrip);
            }
            else{
                tripDate = '&departure_date=' + idGrab('trip-date').value;
            buildUrlArr.push(tripDate);
            }
        } 


        //Clear forms
        for(var j = 0; j < emptyInput.length; j++){
            emptyInput[j].value = ""
        }
        

        // Build URL for API request
        for (let i = 0; i < buildUrlArr.length; i++) {
            customURL += buildUrlArr[i];
        }


        console.log(customURL)

        // Get available flights
        fetch(api + customURL + apiKey)
            .then((response) => {
                response.json()
                // Returned avaiable flight data from the response
                .then((data) => {
                    let flight = data;
                    let tripResults = flight.results;
                    let overlayWrap = newElement('div');
                    let sectionHook = document.querySelector('.hero div');

                    console.log(api+customURL+apiKey)
                    console.log(flight);


                    closeBtn.classList.add('close-btn');
                    closeBtn.classList.add('close-btn--flight');
                    flightResultsDiv.classList.add('flight-results');
                    overlayWrap.classList.add('overlay-wrapper--flight')

                    overlayWrap.appendChild(flightResultsDiv);
    
                    sectionHook.insertAdjacentElement('afterbegin', overlayWrap);

                    closeBtn.addEventListener('click', (evt) => {
                        jsModalBox[0].removeChild(overlayWrap)
                    })
            
                    window.onclick = function (evt) {
                        if (evt.target == overlayWrap) {
                            jsModalBox[0].removeChild(overlayWrap);
                        }
                    };
                    // Make list nodes for each city available. Also send to another API for IACA Code -> City Name
                    tripResults.forEach( (result) => {
                        let flightDetails = newElement('article');
                        let outboundFlight = newElement('h1');
                        let flightPrice = newElement('h3');
                        let datesContainer = newElement('div');
                        let flightDates = newElement('p');
                        let dateFormat = newElement('p');
                        let bookTrip = newElement('a');
                        let cityCode = result.destination;
                        let addClassTo =[outboundFlight, flightPrice, datesContainer]

                        multiClassAdd(addClassTo, 'flight__item');
                        flightDetails.classList.add('flight-info');
                        bookTrip.classList.add('flight-info__book');
                        dateFormat.classList.add('date-format');
                        datesContainer.classList.add('dates-container');
                        
                        

                        dateFormat.textContent = '(year/mm/dd)';
                        outboundFlight.textContent = `${flight.origin} to ${result.destination}`;
                        flightPrice.textContent = `$${result.price}`;
                        flightDates.textContent = `${result.departure_date}`;
                        dateFormat.textContent = '(yyyy/mm/dd)';
                        if(roundTrip !== undefined){
                            flightDates.textContent = `${result.departure_date} -- ${result.return_date}`;
                        };
                        bookTrip.textContent = `Book a Trip!`;
                        
                        datesContainer.appendChild(flightDates);
                        datesContainer.appendChild(dateFormat)
                        flightDetails.appendChild(outboundFlight);
                        flightDetails.appendChild(flightPrice);
                        flightDetails.appendChild(datesContainer);
                        flightDetails.appendChild(bookTrip);
                        flightResultsDiv.appendChild(closeBtn)
                        flightResultsDiv.appendChild(flightDetails)


                    })
                })
            })
            .catch((err) => {
                console.log(err, `Something went wrong`);
            })

            


    })


    // Below is code to another API. Which takes the IACA Code of cities (NYC, MIA, WAS) and outputs the name of the city instead of the IACA code. Exceeded the limit cannot test further.
    var myInit = { method: 'GET',
    mode: 'cors',
    outboundFlights: {  "Access-Control-Allow-Origin" : "*" },
    cache: 'default' };

    function getCityName(cityCode) {
        fetch(iacaAPI + cityCode)
            .then((response) => {
                response.json()
                
                .then((iaca) => {
                    let iacaArray = iaca.response
                    if(iacaArray == undefined){
                        return;
                    }
                    else{
                        let cityName = iaca.response[0].name
                        console.log(`im inside the function`)
                        // let cityName = iaca.response.name
                        console.log(iacaArray);
                        console.log(iaca.response[0].name)
                        return cityName;
                        
                    }
                })
            })
            .catch((err) => {
                console.log(err, 'WHOA! AN ERROR')
            })
    }



});

