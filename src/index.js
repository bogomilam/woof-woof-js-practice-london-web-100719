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
        fetch(`${API_ENDPOINT}/${pup.id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'Application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(pup)
        }).then(res => res.json())
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

    const toggleFilter = () => {
        const dogFilter = document.querySelector('#good-dog-filter')

        if (dogFilter.innerText.includes("OFF")) {
            dogFilter.innerText = "Filter good dogs: ON"
            updateDogBar(true)
        } else {
            dogFilter.innerText = "Filter good dog: OFF"
            updateDogBar()
        }
    }

    const updateDogBar = (filter = false) => {
        const dogFilter = document.querySelector('#good-dog-filter')
        if (filter) {
            let dogs = fetchAPI(API_ENDPOINT).then(data => console.log(data.filter(d => d.isGoodDog)))
            dogs.forEach(d => console.log(d.isGoodDog))
            // .then(dogs => dogs.filter(d => d.isGoodDog = true))
            // let goodDogs = dogs.filter(d => d.isGoodDog = true)
            console.log(dogs)
        }
    }

    const dogFil = document.querySelector('#good-dog-filter')
    dogFil.addEventListener('click', toggleFilter )


    // debugger

})