function validarCampo(campo, alerta, label) {

  console.log("validarCampo: " + campo + " " + alerta + " " + label);

  // Validar campo
  var valor = parseInt($(campo).val());

  if ( isNaN(valor) ) {
    $(alerta).slideDown();
    $(campo).addClass("is-invalid");
    $(label).addClass("text-danger");
    $(campo).val("");
    $(campo).focus();
    return false;
  }

  $(alerta).hide();
  $(campo).removeClass("is-invalid");
  $(label).removeClass("text-danger");
  $(campo).addClass("is-valid");
  return true;
}

function goBack() {
    window.history.back();
}


function calcular(){

if (validarCampo("input[name='kilos']", "#alertaV1", "#labelV1") &&
    validarCampo("input[name='metros']", "#alertaV2", "#labelV2")) {


    var formulario = document.getElementById("formulario");
    var kilos     = +formulario.kilos.value;
    var metros    = +formulario.metros.value;

    //Calculando o IMC
    var imc = kilos / (metros * metros);
    formulario.imc.value = imc.toFixed(2);


    if(imc < 18.5){
      alert('Subnutricao!');
    } else if(imc >= 18,5 && imc < 25){
      alert("Peso Ideal");
    } else if(imc >= 25 && imc < 30){
      alert("Sobrepeso");
    } else if(imc >= 30 && imc < 35){
      alert("Obesidade grau 1");
    } else if(imc >= 35 && imc < 40){
      alert("Obesidade grau 2");
    }else{
      alert('Obesidade grau 3');
    }

    var pesoIdeal = 21.5 * (metros * metros);
    $("#pesoIdeal").text(pesoIdeal.toFixed(2));


  } else {
    $("input[name='resultado']").val("");
  }

  $("input[name='kilos']").focusout(function(){
    validarCampo("input[name='kilos']", "#alertaV1", "#labelV1");
  });

  $("input[name='metros']").focusout(function(){
    validarCampo("input[name='metros']", "#alertaV2", "#labelV2");
  });
}
