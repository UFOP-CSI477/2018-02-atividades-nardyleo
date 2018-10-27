
var list = [
];

function setList(list){
    var table = '<thead><tr><td>Competidor</td><td>Largada</td><td>Tempo Gasto</td><td>Acao</td></tr></thead><tbody>';
    var o = 0;
    for(var key in list){
        if (key <= 5){
        table += '<tr><td>'+ list[key].nome +'</td><td>'+ (key) +'</td><td>'+ formatAmount(list[key].tempo) +'</td><td><button class="btn btn-default" onclick="setUpdate('+key+');" >Editar Competidor</button>  <button class="btn btn-default" onclick="deleteData('+key+');" >Deletar</button></td></tr>';
        }
    }
    table += '</tbody>';
    document.getElementById("listTable").innerHTML = table;
    // $("#listTable").append(table);
    // saveListStorage(list);
}

function imprimirResultado(){

    var linhas = $("#listTable").find("tbody").find("tr");
    var competidores = [];

    for (let index = 0; index < linhas.length; index++) {
        var nome = $(linhas[index]).children('td:nth-child(1)').text();
        var tempo = $(linhas[index]).children('td:nth-child(3)').text();
        competidores.push({"nome": nome, "tempo": tempo});
    }

    competidores.sort(function(a, b) {return a.tempo - b.tempo;});

    var j = 0;
    var vencedor = "";
    var tr = "";
        for (var i = 0; i < competidores.length; i++){
            j++;
            if(j == 1){
                vencedor = "Vencedor(a)!";
            }
            else{
                vencedor = "";
            }
            var tr = "<tbody>" +
                            "<tr>" +
                              "<td>" + j + "</td>" +
                              "<td>" + competidores[i].nome + "</td>" +
                              "<td>" + competidores[i].tempo + "</td>" +
                              "<td>" + vencedor + "</td>" +
                           "</tr>" +
                      "</tbody>";

            $("#listTable2").append(tr);
            tr = "";
        }
}

function goBack() {
    window.history.back();
}

function limpar(){
    $("#listTable2").empty();
}


function  formatAmount(tempo){
    return parseInt(tempo);
}

function addData(){
    if(!validation()){
        return;
    }
    var nome = document.getElementById("nome").value;
    var tempo = document.getElementById("tempo").value;

    list.unshift({"nome":nome , "tempo":tempo});
    setList(list);
}

function setUpdate(id){
    var obj = list[id];
    document.getElementById("nome").value = obj.nome;
    document.getElementById("tempo").value = obj.tempo;
    document.getElementById("btnUpdate").style.display = "inline-block";
    document.getElementById("btnAdd").style.display = "none";

    document.getElementById("inputIDUpdate").innerHTML = '<input id="idUpdate" type="hidden" value="'+id+'">';
}

function resetForm(){
    document.getElementById("nome").value = "";
    document.getElementById("tempo").value = "";
    document.getElementById("btnUpdate").style.display = "none";
    document.getElementById("btnAdd").style.display = "inline-block";

    document.getElementById("inputIDUpdate").innerHTML = "";
    document.getElementById("errors").style.display = "none";
}

function updateData(){
    if(!validation()){
        return;
    }
    var id = document.getElementById("idUpdate").value;
    var nome = document.getElementById("nome").value;
    var tempo = document.getElementById("tempo").value;

    list[id] = {"nome":nome, "tempo": tempo};
    resetForm();
    setList(list);
}

function deleteData(id){
    if(confirm("Delete this item?")){
        if(id === list.length - 1){
            list.pop();
        }else if(id === 0){
            list.shift();
        }else{
            var arrAuxIni = list.slice(0,id);
            var arrAuxEnd = list.slice(id + 1);
            list = arrAuxIni.concat(arrAuxEnd);
        }
        setList(list);
    }
}

function validation(){
    var nome = document.getElementById("nome").value;
    var tempo = document.getElementById("tempo").value;
    var errors = "";
    document.getElementById("errors").style.display = "none";
    if(nome === ""){
        errors += '<p>Preencha o nome</p>';
    }
    if(tempo === ""){
        errors += '<p>Preencha o tempo do competidor</p>';
    }else if(tempo != parseInt(tempo)){
        errors += '<p>Preencha um tempo valido</p>';
    }

    if(errors != ""){
        document.getElementById("errors").style.display = "block";
        document.getElementById("errors").style.backgroundColor = "rgba(85, 85, 85, 0.3)";
        document.getElementById("errors").style.color = "white";
        document.getElementById("errors").style.padding = "10px";
        document.getElementById("errors").style.margin = "10px";
        document.getElementById("errors").style.borderRadius = "13px";

        document.getElementById("errors").innerHTML = "<h3>Erro:</h3>" + errors;
        return 0;
    }else{
        return 1;
    }
}

function deleteList(){
    if(confirm("Deletar os registros?")){
        list = [];
        setList(list);
    }
}


//Funcao para manter a lista, porem nao foi necessario

// function saveListStorage(list){
//     var jsonStr = JSON.stringify(list);
//     localStorage.setItem("list",jsonStr);
// }

// function initListStorage(){
//     var testList = localStorage.getItem("list");
//     if(testList){
//         list = JSON.parse(testList);
//     }
//     setList(list);
// }


// initListStorage();