var inSound = new Audio('toastcraft/in.wav')
var outSound = new Audio('toastcraft/out.wav')


function displayToast(message,subtitle,icon){
    let toast = document.createElement('div');

    let toastIMG = document.createElement('img');
    let toastText = document.createElement('div');
    toastText.innerHTML = '<p/ class="toast-title">'+message+'<p/>'+subtitle
    toastText.className = 'toast-text'
    toastIMG.src='toastcraft/icons/'+icon
    toast.appendChild(toastIMG)
    toast.appendChild(toastText)
    toast.className = 'toast-message toast-out'
    let body = document.getElementsByTagName('body')[0];
    body.appendChild(toast)
    inSound.play()
    setTimeout(function() {
        toast.classList.remove('toast-out');
    }, 100);
    setTimeout(function() {
        outSound.play()
        toast.classList.add('toast-out');
    }, 5000);
    setTimeout(function() {
        toast.remove()
    }, 7000);
}
