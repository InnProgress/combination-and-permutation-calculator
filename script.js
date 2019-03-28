let additionalResValue = document.getElementById('additionalResult');
toggleAdditionalRes(false);

let sprendimas = document.getElementById('sprendimas');
let resultInput = document.getElementById('result');

let type = document.getElementById('type');
let img = document.getElementById('formul_img');

recalc();

function typeChange() {
  let imgSrc = (type.value === 'A') ? "a.png" : "c.png";
  img.src = "images/" + imgSrc;
  recalc();
}

function recalc() {
  let n = document.getElementById('n').value;
  let k = document.getElementById('k').value;

  if(!(k >= 1 && n >= 1)) {
    sprendimas.innerHTML = "";
    toggleAdditionalRes(false);
    resultInput.value = "";
    return;
  }

  let bottomRes = n - k;

  let tempRes = n;
  let topRes = n;

  let mainRes = 0;

  if(type.value === 'A') {

    let calcs = "";
    while(tempRes - 1 != bottomRes) {
      tempRes --;
      topRes *= tempRes;
      calcs += tempRes + " * ";
    }
    mainRes = topRes;

    sprendimas.innerHTML = '<span class="f"><div class="n">' + n + '!</div><div>(' + n + ' - ' + k + ')!</div></span> ';
    sprendimas.innerHTML += ' = <span class="f"><div class="n">' + n + '!</div><div>' + bottomRes  + '!</div></span>';
    sprendimas.innerHTML += ' = <span class="f"><div class="n">' + n + ' * ' + calcs + '<strike>' + bottomRes + '!</strike> </div><div><strike>' + bottomRes + '!</strike></div></span>';
    sprendimas.innerHTML += " = " + mainRes;

    toggleAdditionalRes(false);

  } else {
    let biggerRes = bottomRes > k ? bottomRes : k;
    let lastRes = bottomRes > k ? k : bottomRes;

    let calcs = "";
    while(tempRes - 1 != biggerRes) {
      tempRes --;
      topRes *= tempRes;
      calcs += tempRes + " * ";
    }

    let ress = 1;
    let bottomCalcs = "";
    let first = true;
    for(let i = lastRes; i > 1; i --) {
      ress *= i;

      if(first) {
        first = false;
      } else bottomCalcs += ' * ';
      bottomCalcs += i;
    }

    toggleAdditionalRes(true);
    additionalResValue.innerHTML = topRes + "&frasl;" + ress;

    mainRes = topRes / ress;

    sprendimas.innerHTML = '<span class="f"><div class="n">' + n + '!</div><div>' + k + '!(' + n + ' - ' + k + ')!</div></span> ';
    sprendimas.innerHTML += ' = <span class="f"><div class="n">' + n + '!</div><div>' + k + '! * ' + bottomRes  + '!</div></span>';
    sprendimas.innerHTML += ' = <span class="f"><div class="n">' + n + ' * ' + calcs + '<strike>' + bottomRes + '!</strike> </div><div>' + k + '! * <strike>' + bottomRes + '!</strike></div></span>';
    sprendimas.innerHTML += ' = <span class="f"><div class="n">' + topRes + '</div><div>' + bottomCalcs + '</div></span>';
    if(k > 2) sprendimas.innerHTML += ' = <span class="f"><div class="n">' + topRes + '</div><div>' + ress + '</div></span>';
    sprendimas.innerHTML += " = " + mainRes;

  }

  resultInput.value = mainRes;
}
function toggleAdditionalRes(toggle) {
  additionalResValue.style.display = toggle ? "block" : "none";
}
