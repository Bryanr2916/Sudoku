let time = 0;
let myTimer = setInterval(play,1000);

function play()
{
    time++;
    let pTime = document.getElementById('time');
    pTime.innerHTML = "Tiempo: " + convertTime(time);
}

function pause()
{
    clearInterval(myTimer);
    myTimer = undefined;
}

function pausePlay()
{
    if(!isGameOver())
    {
        let spanPausePlayDetail = document.querySelector('#pause-play-detail');
        let spanPausePlayIcon = document.querySelector('#pause-play-icon');

        if(typeof myTimer === 'undefined')
        {
            hideShowGrid(false);
            myTimer = setInterval(play,1000);
            spanPausePlayIcon.innerText = "stop";
            spanPausePlayDetail.innerText = "Pausar";
        }
        else
        {
            hideShowGrid(true);
            pause();
            spanPausePlayIcon.innerText = "play_arrow";
            spanPausePlayDetail.innerText = "Reanudar";
        }
    }
}

function convertTime(time)
{
    let minutes = Math.floor(time/60);
    let seconds = time - (minutes*60);

    let minutesString = minutes<10?"0"+minutes:""+minutes;
    let secondsString = seconds<10?"0"+seconds:""+seconds;

    return minutesString+":"+secondsString;
}

function resetTimer()
{
    time = 0;
    clearInterval(myTimer);
    myTimer = undefined;
}

function hideShowGrid(hide)
{
    let board = document.querySelector('.board');

    if(hide)
    {
        board.classList.add('blur');
    }
    else
    {
        board.classList.remove('blur');
    }
}