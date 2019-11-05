var intro = document.querySelector('.intro')
var button = document.querySelector('.joke-btn')
var textAppend = document.querySelector('.text')
document.querySelector('progress').style.display = 'none'

button.style.visibility = 'hidden'

function delayThis(){
    
    intro.style.visibility = "hidden"
    var punchAppend = document.querySelector('.punch-line')
    
    punchAppend.style.display = 'none'
    document.querySelector('progress').style.display = 'flex'
    getData('https://sv443.net/jokeapi/category/programming')
    .then((data) => {

        var span = document.createElement('span')

        span.innerText = data.setup || data.joke
        textAppend.append(span)

        var punchSpan = document.createElement('span')

        if(data.delivery == undefined){
            var img = document.createElement('img')
            img.setAttribute('src', 'https://blog.joypixels.com/content/images/2019/06/nerd_face_1024.gif')
            img.setAttribute('class', 'nerd-img')
            punchAppend.append(img)
        }
        else{
            punchSpan.innerText = data.delivery
            punchAppend.append(punchSpan)
        }
        
    })


    ProgressCountdown(10, 'pageBeginCountdown', 'pageBeginCountdownText').then();

    function ProgressCountdown(timeleft, bar, text) {
    return new Promise((resolve, reject) => {
        var countdownTimer = setInterval(() => {
        timeleft--;

        document.getElementById(bar).value = timeleft;
        
        if (timeleft <= 0) {

            button.style.visibility = ''
            document.querySelector('progress').style.display = 'none'
            punchAppend.style.display = 'flex'
            clearInterval(countdownTimer);
            resolve(true);

        }
        }, 1000);
    });
    }
}

button.addEventListener('click', function(){
    document.querySelector('.text').innerHTML = ""
    document.querySelector('.punch-line').innerHTML = ""
    button.style.visibility = 'hidden'

    delayThis()

})

setTimeout(delayThis, 6000)


function getData(url){
    return fetch(url)
    .then(function(response){
        return response.json()
    })
}