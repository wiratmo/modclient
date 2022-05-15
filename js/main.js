const coutdown = document.querySelector('.coutdown')
const instruction = document.querySelector('.instruction')
const btn_play = document.getElementById('btn_play')
const music = document.getElementById('music')

function getMusic(){
	return music.options[music.selectedIndex].text
}
function check(music){
	console.log(getMusic())
	if (getMusic() != '') {
		btn_play.disabled = false
	} else {
		btn_play.disabled = true
	}
}

function countDown () {
	var timeleft = 3;
	var downloadTimer = setInterval(function(){
		if(timeleft <= 0){
			coutdown.classList.toggle('isVisible')
			clearInterval(downloadTimer);
		} else{
			document.getElementById("count_num").innerHTML = timeleft;
			timeleft -= 1;
		}

	}, 1000);
}

btn_play.addEventListener('click', (e)=>{
	instruction.classList.toggle('isVisible')
	console.log('klik')
	countDown()
})
