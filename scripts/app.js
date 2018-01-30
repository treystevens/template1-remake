document.addEventListener('DOMContentLoaded', () => {

    // Image Modal Box
    const imgView = Array.from(document.querySelectorAll('.flex-card img'));
    const imgViewA = document.getElementsByClassName('.flex-card');
    var imgViewT = document.querySelectorAll('.js-imgView .flex-card');

    imgView.forEach((img) => {
        img.addEventListener('click', (evt) => {

            // Get source attribute of clicked image
            var imgSrc = evt.target.getAttribute('src');
            // Create elements for Modal Box
            var testingAppend = document.getElementById('testing');
            const overlayWrap = document.createElement('div');
            const imgDiv = document.createElement('div');
            var imageTag = document.createElement('img');
            var closeBtn = document.createElement('button');

            // Adding content to btn
            closeBtn.textContent = "Close"

            // Changing the source of the imageTag.
            imageTag.src = imgSrc;
            imageTag.classList.add('img-full');


            // Add class to the div
            imgDiv.classList.add('img-full__container');
            overlayWrap.classList.add('overlay-wrapper')
            closeBtn.classList.add('close-btn');

            // Appending 
            imgDiv.appendChild(imageTag);
            imgDiv.appendChild(closeBtn)
            overlayWrap.appendChild(imgDiv);
            testingAppend.insertAdjacentElement('afterbegin', overlayWrap);


            // Close the image
            closeBtn.addEventListener('click', () => {
                testingAppend.removeChild(overlayWrap)
            })

            window.onclick = function (event) {
                if (event.target == overlayWrap) {
                    testingAppend.removeChild(overlayWrap);
                }
            };
        })
    })

});