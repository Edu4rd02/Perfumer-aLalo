const checkFT = document.getElementById('addBrandFT');
const inputFT = document.getElementById('inputBrandFT');
const checkSF = document.getElementById('addBrandSF');
const inputSF = document.getElementById('inputBrandSF');
const checkHN = document.getElementById('addBrandHN');
const inputHN = document.getElementById('inputBrandHN');

const checkModelFT = document.getElementById('addModelFT');
const inputModelFT = document.getElementById('inputModelFT');
const checkModelSF = document.getElementById('addModelSF');
const inputModelSF = document.getElementById('inputModelSF');
const checkModelHN = document.getElementById('addModelHN');
const inputModelHN = document.getElementById('inputModelHN');

checkFT.addEventListener('change',function(event){
    algo(inputFT,checkFT);
});
checkSF.addEventListener('change',function(event){
    algo(inputSF,checkSF);
});
checkHN.addEventListener('change',function(event){
    algo(inputHN,checkHN);
});


checkModelFT.addEventListener('change',function(event){
    algo(inputModelFT,checkModelFT);
});
checkModelSF.addEventListener('change',function(event){
    algo(inputModelSF,checkModelSF);
});
checkModelHN.addEventListener('change',function(event){
    algo(inputModelHN,checkModelHN);
});


function algo(input,check){
    if (check.checked) {
        input.removeAttribute('disabled');
    }
    else{
        input.setAttribute('disabled','true');
    }
}

function otro(check){
    if (check.checked) {
        return true;
    }
    else{
        return false;
    }
}