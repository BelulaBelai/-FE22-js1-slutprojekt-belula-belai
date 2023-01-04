const formButton = document.getElementById("form-button");
formButton.addEventListener("click", (e) => {
    e.preventDefault();

    const textInputError = document.getElementById("text-input-error");
    const zeroImagesError = document.getElementById("zero-images-error");
    const randomError = document.getElementById("random.error");
    const textInput = document.getElementById("text-input");
    searchedText = textInput.value;
    textInput.value = "";
    const sortedBy = document.getElementById("sort-input").value;
    const chosenSize = document.getElementById("size-input").value;
    const imgQuantity = document.getElementById("img-quantity").value;
    const imgContainer = document.getElementById("img-container");
    imgContainer.innerText = "";
    const progressBar = document.getElementById("my-progress");
    let elem = document.getElementById("myBar");

    anime({
        targets: '#myBar',
        keyframes: [
            { translateY: -40 },
            { translateX: 250 },
            { translateY: 40 },
            { translateX: 0 },
            { translateY: 0 }
        ],
        duration: 2500,
        easing: 'easeOutElastic(1, .8)',
        loop: true
    });

    if (searchedText == "") {
        textInputError.style.display = "block";
        zeroImagesError.style.display = "none";

    }

    else {
        textInputError.style.display = "none";

        const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=53fcbe7b260fda7110317694d6a221d6&text=${searchedText}&sort=${sortedBy}&per_page=${imgQuantity}&format=json&nojsoncallback=1`;

        elem.style.visibility = "visible";

        zeroImagesError.style.display = "none";

        fetch(url)
            .then((response) => {
                if (response.status >= 200 && response.status < 300) {
                    return response.json();
                } else {
                    throw "Error! data could not be found";
                }
            })

            .then((searchResult) => {
                // setTimeout på 3sek för att man ska hinna se hela animationen
                setTimeout((response) => {
                    elem.style.visibility = "hidden";
                    if (searchResult.photos.photo.length == 0) {
                        zeroImagesError.style.display = "block";
                    } else {
                        zeroImagesError.style.display = "none";

                        const photos = searchResult.photos.photo;
                        photos.forEach((result) => {
                            const searchResultImg = document.createElement("img");
                            imgContainer.append(searchResultImg);
                            searchResultImg.src = `https://live.staticflickr.com/${result.server}/${result.id}_${result.secret}_${chosenSize}.jpg`;
                        });
                    }
                }, 3000);
            })
            .catch((error) => {
                randomError.style.display = "block";
            });

    }

})

