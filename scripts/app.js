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
    getData('https://official-joke-api.appspot.com/jokes/programming/random')
    .then((data) => {

        var span = document.createElement('span')

        span.innerText = data[0].setup
        textAppend.append(span)

        
        var punchSpan = document.createElement('span')

        punchSpan.innerText = data[0].punchline
        punchAppend.append(punchSpan)
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