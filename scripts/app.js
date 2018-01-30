document.addEventListener('DOMContentLoaded', () => {

    // Image Modal Box
    const imgView = Array.from(document.querySelectorAll('.flex-card img'));

    imgView.forEach( (img) => {
        img.addEventListener('click', (evt) => {

            // Get source attribute of clicked image
            let imgSrc = evt.target.getAttribute('src');

            // Create elements for Modal Box
            let testingAppend = document.getElementById('testing');
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
            testingAppend.insertAdjacentElement('afterbegin', overlayWrap);

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
                testingAppend.removeChild(overlayWrap)
            })

            // Click outside of Modal box to close
            window.onclick = function (event) {
                if (event.target == overlayWrap) {
                    testingAppend.removeChild(overlayWrap);
                }
            };
        })
    })

});