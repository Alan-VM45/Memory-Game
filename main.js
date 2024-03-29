let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado= null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer = 40;
let timerInicial = 40;
let tiempoRegresivoId = null;

let winAudio = new Audio('./sound/win.wav');
let loseAudio = new Audio('./sound/Lose.wav');
let clickAudio = new Audio('./sound/click.wav');
let rightAudio = new Audio('./sound/Right.wav');
let wrongAudio = new Audio('./sound/wrong.wav');

let mostrarMovimientos = document.getElementById('movimientos');
let mostrarAciertos = document.getElementById('aciertos');
let mostrarTiempo = document.getElementById('t-restante');

let numero = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
numero = numero.sort(()=>{return Math.random()-0.5});

//Funcion

function contarTiempo(){
    tiempoRegresivoId = setInterval(()=>{
        timer--;
        mostrarTiempo.innerHTML= `Tiempo: ${timer} segundos`;
        if (timer == 0){
            clearInterval(tiempoRegresivoId);
            bloclearTarjetas();
            loseAudio.play();
        }
    },1000)
}

function bloclearTarjetas(){
    for(let i= 0;i <=15; i++ ){
        let tarjetaBloqueada = document.getElementById(i);
        tarjetaBloqueada.innerHTML = `<img src="./img/${numero[i]}.png" alt="">`;
        tarjetaBloqueada.disabled = true;
    }
}



function destapar(id){
    
    if(temporizador == false){
        contarTiempo();
        temporizador = true
    }

    tarjetasDestapadas++;
    
    if(tarjetasDestapadas == 1){
        tarjeta1 = document.getElementById(id);
        primerResultado = numero[id];
        tarjeta1.innerHTML= `<img src="./img/${primerResultado}.png" alt="">`;
        clickAudio.play();

        tarjeta1.disabled = true;

    }else if(tarjetasDestapadas == 2){
        tarjeta2 = document.getElementById(id);
        segundoResultado = numero[id];
        tarjeta2.innerHTML = `<img src="./img/${segundoResultado}.png" alt="">`;
        

        tarjeta2.disabled = true;

        movimientos++;
        mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;
        if(primerResultado == segundoResultado){
            

            tarjetasDestapadas = 0;

            aciertos++;
            mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;
            rightAudio.play();

            if(aciertos == 8){
                winAudio.play();
                clearInterval(tiempoRegresivoId);
                mostrarAciertos.innerHTML = `Aciertos: ${aciertos} 😱`;
                mostrarTiempo.innerHTML = `Fantástico! Sólo demoraste ${timerInicial - timer} segundos`
                mostrarMovimientos.innerHTML = `Movimientos: ${movimientos} 😎`;
            } 

        }else{
            wrongAudio.play();
            setTimeout(()=>{
                tarjeta1.innerHTML = '  ';
                tarjeta2.innerHTML = '  ';
                tarjeta1.disabled = false;
                tarjeta2.disabled = false;
                tarjetasDestapadas = 0;
            },800)
            
        }
    }

}
