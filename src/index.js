document.addEventListener("DOMContentLoaded", () =>  {

    const API_ENDPOINT = 'http://localhost:3000/pups'

    const fetchAPI = url => fetch(url).then(response => response.json())

    fetchAPI(API_ENDPOINT).then(data => data.forEach(pup => renderPups(pup)) )

    const dogDiV = document.querySelector('#dog-bar')

    const renderPups = pup => {
        const dogSpan = document.createElement('span')
        dogSpan.innerText = pup.name
        dogSpan.addEventListener('click', () => showInfo(pup))

        dogDiV.appendChild(dogSpan)
    }


    const changeDogMood = (pup, dogBtn) => {
        pup.isGoodDog = !pup.isGoodDog
        pupButton(pup, dogBtn)
        updateGoodDog(pup)
    }

    const updateGoodDog = pup => {
        fetch(API_ENDPOINT, {
            "method": "PATCH",
            "headers": {
                "application/json":
            }
        }
    }

    const pupButton = (pup, dogBtn) => {
        if (pup.isGoodDog)
        dogBtn.innerText = "Good Dog!"
        else
        dogBtn.innerText = "Bad Dog!"
    }


    const showInfo = pup => {
        
        console.log(pup)
        const showDiv = document.querySelector('#dog-info')
        showDiv.innerText = ""


        const dogPic = document.createElement('img')
        dogPic.src = pup.image

        const dogName = document.createElement('h2')
        dogName.innerText = pup.name

        const dogBtn = document.createElement('button')
        if (pup.isGoodDog)
        dogBtn.innerText = "Good Dog!"
        else
        dogBtn.innerText = "Bad Dog!"

        dogBtn.addEventListener('click', () => changeDogMood(pup, dogBtn))



        showDiv.append(dogPic, dogName, dogBtn)
    }

    // debugger

})