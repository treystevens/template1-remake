document.addEventListener('DOMContentLoaded', () => {

    // Image Modal Box
    const imgView = Array.from(document.querySelectorAll('.flex-card img'));

    imgView.forEach( (img) => {
        img.addEventListener('click', (evt) => {

            // Get source attribute of clicked image
            let imgSrc = evt.target.getAttribute('src');

            // Create elements for Modal Box
            let modalImgBox = document.querySelector('.js-modalImg div');
            let overlayWrap = document.createElement('div');
            let imgContainer = document.createElement('div');
            let imgTag = document.createElement('img');
            let closeBtn = document.createElement('button');
            let leftBtn = document.createElement('button');
            let rightBtn = document.createElement('button');

            // Defining button content
            closeBtn.textContent = "Close";
            rightBtn.innerHTML = "&rarr;";
            leftBtn.innerHTML = "&larr;";

            // Changing the source of the imgTag
            imgTag.src = imgSrc;
            imgTag.classList.add('img-full');


            // Adding classes to elements
            imgContainer.classList.add('img-full__container');
            overlayWrap.classList.add('overlay-wrapper')
            closeBtn.classList.add('close-btn');
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


    // function animateValue(classes, start, end, duration) {
    //     // assumes integer values for start and end
    
    //     var classArr = Array.from(document.getElementsByClassName(classes));
    //     console.log(classArr);
    //     var range = end - start;    // 100
    //     // no timer shorter than 50ms (not really visible any way)
    //     var minTimer = 50;
    //     // calc step time to show all interediate values
    //     var stepTime = Math.abs(Math.floor(duration / range)); // 2000 / 1000 =  2
    
    //     // never go below minTimer
    //     stepTime = Math.max(stepTime, minTimer); // chooses the highest number which is 50 minTimer
    //     console.log(stepTime);
    
    //     // get current time and calculate desired end time
    //     var startTime = new Date().getTime(); // this gets current time
    //     var endTime = startTime + duration; // time you want to end, you add the duration to the current time
    //     var timer;
    
    //     function run() {
    //         var now = new Date().getTime();
    //         var remaining = Math.max((endTime - now) / duration, 0);
    //         var value = Math.round(end - (remaining * range));
    //         classArr[0].innerHTML = value;
    //         classArr[1].innerHTML = value;
    //         if (value == end) {
    //             clearInterval(timer);
    //         }
    //     }
    
    //     var timer = setInterval(run, stepTime); // set interval takes a function and milliseconds as its argument.. so every 50 ms it runs that function
    //     run();
    // }
    
    
    // animateValue("animated-numbers",  0,  1000,  2000);
    

    function animateValue(classes, start, end, duration) {
        // assumes integer values for start and end
    
        var classArr = Array.from(document.getElementsByClassName(classes));
        var range = end.map((classEndTimes) => {
            return classEndTimes - start;
        })
        var minTimer = 50;
        // calc step time to show all interediate values

        for( let i = 0; i < classArr.length; i++){
        let stepTime = Math.abs(Math.floor(duration / range[i])); 
    
        // never go below minTimer
        stepTime = Math.max(stepTime, minTimer); // chooses the highest number which is 50 minTimer
    
        // get current time and calculate desired end time
        let startTime = new Date().getTime(); // this gets current time
        let endTime = startTime + duration; // time you want to end, you add the duration to the current time
        var timer;
    
        function run() {
            var now = new Date().getTime();
            var remaining = Math.max((endTime - now) / duration, 0);
            var value = Math.round(end - (remaining * range));
            classArr[i].innerHTML = value;
            if (value == end) {
                clearInterval(timer);
            }
        }
    
        var timer = setInterval(run, stepTime); // set interval takes a function and milliseconds as its argument.. so every 50 ms it runs that function
        run();
        }
    }
    
    
    animateValue("animated-numbers",  0,  [196, 97, 12402, 12202],  2000);



});