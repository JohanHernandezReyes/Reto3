//VALIDAR CAMPOS VACIOS
function validarvacio(campo, msj_vacio){
    if(campo==""){
        alert(msj_vacio);
        throw 'exit';
    }    
}

//1.FUNCIONES PARA LA TABLA CABIN
function ConsultarCabin(){
    $.ajax({
        url:"http://129.151.117.220:8080/api/Cabin/all",
        type:"GET",
        datatype:"JSON",    
        success:function(respuesta){
            $("#resultado").empty();
            $("#detalle").empty();
            console.log(respuesta)
            rta_cabin=respuesta;
            globalThis;
            mostrarCabin(respuesta.items);
            OcultarForm();
        } 
    });
}

function mostrarCabin(){
    let myTable="<table border='2'>";
    let thead = "<thead>";
            thead += "<tr>";
            thead += "<th>" +"ID" + "</th>"
            thead += "<th>" + "NOMBRE CABAÑA" + "</th>"
            thead += "<th>" + "ACCIONES" + "</th>"
        thead += "</tr>";
    thead+="<thead>";
    myTable+=thead;
    for(i=0;i<rta_cabin.length;i++){
        myTable+="<tr>";
            myTable+="<td align=center>"+rta_cabin[i].id+"</td>";
            myTable+="<td align=center>"+rta_cabin[i].name+"</td>";
            myTable+="<td> <button class='bacc' onclick='Consultar1Cabin("+rta_cabin[i].id+")'>Ver Detalles</button>"+
            "<button class='bacc' onclick='ConsultarMsgCabin("+rta_cabin[i].id+")'>Mensajes</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    myTable+="</div id='detalle'></div>";
    $("#resultado").append(myTable);
}

function Consultar1Cabin(idElemento){   
    let myData=idElemento;
    console.log(idElemento);
    $.ajax({
        url:"http://129.151.117.220:8080/api/Cabin/"+myData,
        type:"GET",
        data:myData,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuestaid){
            $("#detalle").empty();
            Cabin1=respuestaid;
            globalThis;
            let data={
                id:Cabin1.id,
                name:Cabin1.name,
                brand:Cabin1.brand,
                rooms:Cabin1.rooms,
                category:Cabin1.category.name,
                description:Cabin1.description,
            } 
            $("#resultado").empty();
            $("#detalle").empty();
            DetalleCabin(data)
            globalThis;
            OcultarForm();
        } 
    });
}

function DetalleCabin(data){
    console.log(data);
    let myTableD="<table border='2'>";
    let thead = "<thead>";
            thead += "<tr>";
            thead += "<th>" + "NOMBRE" + "</th>"
            thead += "<th>" + "BRAND" + "</th>"
            thead += "<th>" + "N° HABITACIONES" + "</th>"
            thead += "<th>" + "CATEGORIA" + "</th>"
            thead += "<th>" + "DESCRIPCION" + "</th>"
        thead += "</tr>";
    thead+="<thead>";
    myTableD+=thead;
    myTableD+="<tr>";
        myTableD+="<td align=center>"+data.name+"</td>";
        myTableD+="<td align=center>"+data.brand+"</td>";
        myTableD+="<td align=center>"+data.rooms+"</td>";
        myTableD+="<td align=center>"+data.category+"</td>";
        myTableD+="<td align=center>"+data.description+"</td>";
    myTableD+="</tr>";
    myTableD+="</table>";
    $("#detalle").append(myTableD);
}

function mostrarlabels(){
    document.getElementById("labid").removeAttribute("hidden");
    document.getElementById("labbrand").removeAttribute("hidden");
    document.getElementById("labrooms").removeAttribute("hidden");    
    document.getElementById("labcatid").removeAttribute("hidden");    
    document.getElementById("labname").removeAttribute("hidden");
    document.getElementById("labdesc").removeAttribute("hidden");
}

function AgregarCabin(){
    $("#category_id").load(location.href+" #category_id>*","");
    $("#resultado").empty();
    $("#detalle").empty();
    mostrarlabels();
    document.getElementById("brand").removeAttribute("hidden");$("#brand").val("");
    document.getElementById("rooms").removeAttribute("hidden");$("#rooms").val("");
    ListaCategorias();
    document.getElementById("BMCat").removeAttribute("hidden");
    document.getElementById("category_id").removeAttribute("hidden");$("#category_id").val("");
    document.getElementById("name").removeAttribute("hidden");$("#name").val("");
    document.getElementById("desc").removeAttribute("hidden");$("#desc").val("");
    document.getElementById("BGCab").removeAttribute("hidden");
    document.getElementById("BECab").setAttribute("hidden", "true");
}

function OcultarForm(){
    document.getElementById("labid").setAttribute("hidden", "true");
    document.getElementById("labbrand").setAttribute("hidden", "true");    
    document.getElementById("labrooms").setAttribute("hidden", "true");    
    document.getElementById("labcatid").setAttribute("hidden", "true");    
    document.getElementById("labname").setAttribute("hidden", "true");
    document.getElementById("labdesc").setAttribute("hidden", "true");
    document.getElementById("id").setAttribute("hidden", "true");
    document.getElementById("brand").setAttribute("hidden", "true");
    document.getElementById("rooms").setAttribute("hidden", "true");
    document.getElementById("category_id").setAttribute("hidden", "true");
    document.getElementById("name").setAttribute("hidden", "true");
    document.getElementById("desc").setAttribute("hidden", "true");
    document.getElementById("BGCab").setAttribute("hidden", "true");
    document.getElementById("BECab").setAttribute("hidden", "true");
    document.getElementById("categoria").setAttribute("hidden", "true");   
}

function guardarCabin(){
    validarvacio($("#brand").val(), "Debe ingresar un brand");
    validarvacio($("#rooms").val(), "Debe ingresar un N° de cuartos");
    validarvacio($("#category_id").val(), "Debe seleccionar una categoria");
    validarvacio($("#name").val(), "Debe ingresar un nombre para la cabaña");
    let myData={
        brand:$("#brand").val(),
        rooms:$("#rooms").val(),
        category:{id:$("#category_id").val()},
        name:$("#name").val(),
        description:$("#desc").val(),
    };
    let dataToSend=JSON.stringify(myData);
    console.log(myData);
    $.ajax({
        url:"http://129.151.117.220:8080/api/Cabin/save",
        type:"POST",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            $("#brand").val("");
            $("#rooms").val("");
            $("#category_id").val("");
            $("#name").val("");
            console.log(respuesta);
            alert("se ha guardado el dato");
            ConsultarCabin();
            OcultarForm(); 
        }
    });
}

function ListaCabañas(){
    $.ajax({
        url:"http://129.151.117.220:8080/api/Cabin/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            $("#detalle").empty();
            respuesta;
            console.log(respuesta);
            const $listcab=$("#cabin_msg");
            for(i=0;i<respuesta.length;i++){
                $listcab.append($("<option>", {value: respuesta[i].id, text: respuesta[i].name}))
            }
        } 
    });
}

//2.FUNCIONES PARA LA TABLA CLIENTE
function ConsultarClient(){
    $.ajax({
        url:"http://129.151.117.220:8080/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultClient").empty();
            $("#detalleClient").empty();
            rta_client=respuesta;
            globalThis;
            console.log(respuesta);
            mostrarClient(respuesta.items);
            OcultarFormClient();
        } 
    });
}

function mostrarClient(){
    let myTable="<table border= '2'>";
    let thead = "<thead>";
            thead += "<tr>";
            thead += "<th>" +"ID" + "</th>"
            thead += "<th>" + "NOMBRE" + "</th>"
            thead += "<th>" + "ACCIONES" + "</th>"
        thead += "</tr>";
    thead+="<thead>";
    myTable+=thead;
    for(i=0;i<rta_client.length;i++){
        myTable+="<tr>";
            myTable+="<td align=center>"+rta_client[i].idClient+"</td>";
            myTable+="<td align=center>"+rta_client[i].name+"</td>";
            myTable+="<td> <button class='bacc' onclick='Consultar1Client("+rta_client[i].idClient+")'>Ver Detalles</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultClient").append(myTable);
}

function Consultar1Client(idElemento){
    let myData=idElemento;
    console.log(idElemento);
    $.ajax({
        url:"http://129.151.117.220:8080/api/Client/"+myData,
        type:"GET",
        data:myData,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuestaid){
            $("#detalle").empty();
            Client1=respuestaid;
            globalThis;
            let dataClient={
                idClient:Client1.idClient,
                name:Client1.name,
                email:Client1.email,
                age:Client1.age,
                password:Client1.password,
            } 
            $("#resultClient").empty();
            $("#detalleClient").empty();
            DetalleClient(dataClient)
            globalThis;
            OcultarFormClient();
        } 
    });
}

function DetalleClient(dataClient){
    console.log(dataClient);
    let myTableD="<table border= '2'>";
    let thead = "<thead>";
            thead += "<tr>";
            thead += "<th>" + "ID" + "</th>"
            thead += "<th>" + "NOMBRE" + "</th>"
            thead += "<th>" + "EMAIL" + "</th>"
            thead += "<th>" + "EDAD" + "</th>"
            thead += "<th>" + "CONTRASEÑA" + "</th>"
        thead += "</tr>";
    thead+="<thead>";
    myTableD+=thead;
    myTableD+="<tr>";
        myTableD+="<td align=center>"+dataClient.idClient+"</td>";
        myTableD+="<td align=center>"+dataClient.name+"</td>";
        myTableD+="<td align=center>"+dataClient.email+"</td>";
        myTableD+="<td align=center>"+dataClient.age+"</td>";
        myTableD+="<td align=center><font color= 'red'>"+"Dato Privado"+"</font></td>";
    myTableD+="</tr>";
    myTableD+="</table>";
    $("#detalleClient").append(myTableD);
    
}

function mostrarlabelsC(){
    document.getElementById("labidC").removeAttribute("hidden");    
    document.getElementById("labnameC").removeAttribute("hidden");
    document.getElementById("labemail").removeAttribute("hidden");
    document.getElementById("labage").removeAttribute("hidden");
    document.getElementById("labclave").removeAttribute("hidden");   
}

function AgregarClient(){
    $("#resultadoClient").empty();
    $("#detalleClient").empty();
    mostrarlabelsC();
    document.getElementById("nameC").removeAttribute("hidden");$("#nameC").val("");
    document.getElementById("email").removeAttribute("hidden");$("#email").val("");
    document.getElementById("age").removeAttribute("hidden");$("#age").val("");
    document.getElementById("passwordC").removeAttribute("hidden");$("#passwordC").val("");
    document.getElementById("BGCl").removeAttribute("hidden");
    document.getElementById("BECl").setAttribute("hidden", "true");
}

function OcultarFormClient(){
    document.getElementById("labidC").setAttribute("hidden", "true");
    document.getElementById("labnameC").setAttribute("hidden", "true");
    document.getElementById("labemail").setAttribute("hidden", "true");
    document.getElementById("labage").setAttribute("hidden", "true");
    document.getElementById("labclave").setAttribute("hidden", "true");
    document.getElementById("idC").setAttribute("hidden", "true");
    document.getElementById("nameC").setAttribute("hidden", "true");
    document.getElementById("email").setAttribute("hidden", "true");
    document.getElementById("age").setAttribute("hidden", "true");
    document.getElementById("passwordC").setAttribute("hidden", "true");
    document.getElementById("BGCl").setAttribute("hidden", "true");
    document.getElementById("BECl").setAttribute("hidden", "true");
}

function guardarClient(){
    validarvacio($("#nameC").val(), "Debe ingresar un nombre");
    validarvacio($("#email").val(), "Debe ingresar un e-mail");
    validarvacio($("#age").val(), "Debe ingresar la edad del cliente");
    validarvacio($("#passwordC").val(), "Debe ingresar una contraseña");
    let myData={
        name:$("#nameC").val(),
        email:$("#email").val(),
        age:$("#age").val(),
        password:$("#passwordC").val(),
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://129.151.117.220:8080/api/Client/save",
        type:"POST",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultClient").empty();
            $("#detalleClient").empty();    
            $("#nameC").val("");
            $("#email").val("");
            $("#age").val("");
            $("#password").val("");
            ConsultarClient();
            alert("se ha guardado el dato");
            OcultarFormClient();
        }
    });
}

function ListaClientes(){
    $.ajax({
        url:"http://129.151.117.220:8080/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            $("#detalle").empty();
            respuesta;
            console.log(respuesta);
            const $listcli=$("#client_msg");
            for(i=0;i<respuesta.length;i++){
                $listcli.append($("<option>", {value: respuesta[i].idClient, text: respuesta[i].name}))
            }
        } 
    });
}

//3.FUNCIONES PARA LA TABLA MESSAGE
function ConsultarMsg(){   
    $.ajax({
        url:"http://129.151.117.220:8080/api/Message/all",
        type:"GET",
        datatype:"JSON",
        success:function r(respuesta){
            $("#resultMsg").empty();
            console.log(respuesta);
            rta_message=respuesta;
            globalThis;
            mostrarMsg(respuesta.items);
            document.getElementById("labcabinmsg").setAttribute("hidden", "true");
            document.getElementById("labclientmsg").setAttribute("hidden", "true");
            document.getElementById("cabin_msg").setAttribute("hidden", "true");
            document.getElementById("client_msg").setAttribute("hidden", "true");
            document.getElementById("msg").setAttribute("hidden", "true");
            document.getElementById("BGM").setAttribute("hidden", "true");
        } 
    });
}

function mostrarMsg(){
    let myTable="<table border= '2'>";
    let thead = "<thead>";
            thead += "<tr>";
            thead += "<th>" + "MENSAJE" + "</th>"
            thead += "<th>" + "CLIENTE" + "</th>"
            thead += "<th>" + "CABAÑA" + "</th>"
        thead += "</tr>";
    thead+="<thead>";
    myTable+=thead;
    for(i=0;i<rta_message.length;i++){
        myTable+="<tr>";
            myTable+="<td align=center>"+rta_message[i].messageText+"</td>";
            myTable+="<td align=center>"+rta_message[i].client.name+"</td>";
            myTable+="<td align=center>"+rta_message[i].cabin.name+"</td>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultMsg").append(myTable);
}

function guardarMsg(){
    validarvacio($("#msg").val(), "No ha ingresado ningún mensaje");
    validarvacio($("#cabin_msg").val(), "Debe seleccionar una cabaña");
    validarvacio($("#client_msg").val(), "Debe seleccionar un cliente");
    ConsultarMsg();
    let myData={
        messageText:$("#msg").val(),
        cabin:{id:$("#cabin_msg").val()},
        client:{idClient:$("#client_msg").val()},
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://129.151.117.220:8080/api/Message/save",
        type:"POST",
        contentType:"application/JSON",
        data:dataToSend,
        datatype:"JSON",
        success:function(respuesta){
            $("#resultMsg").empty();
            $("#msg").val("");
            console.log(respuesta);
            ConsultarMsg();
            document.getElementById("labcabinmsg").setAttribute("hidden", "true");
            document.getElementById("labclientmsg").setAttribute("hidden", "true");
            document.getElementById("cabin_msg").setAttribute("hidden", "true");
            document.getElementById("client_msg").setAttribute("hidden", "true");
            document.getElementById("msg").setAttribute("hidden", "true");
            document.getElementById("BGM").setAttribute("hidden", "true");
            alert("se ha guardado el dato")
        }
    });
}

function AgregarMsg(){
    $("#cabin_msg").load(location.href+" #cabin_msg>*","");
    $("#client_msg").load(location.href+" #client_msg>*","");
    $("#resultMsg").empty();
    document.getElementById("labcabinmsg").removeAttribute("hidden");
    document.getElementById("labclientmsg").removeAttribute("hidden");
    ListaCabañas();
    document.getElementById("cabin_msg").removeAttribute("hidden");$("#cabin_msg").val("");
    document.getElementById("NewCabin").removeAttribute("hidden");
    ListaClientes();
    document.getElementById("client_msg").removeAttribute("hidden");$("#client_msg").val("");
    document.getElementById("NewClient").removeAttribute("hidden");
    document.getElementById("msg").removeAttribute("hidden");$("#msg").val("");
    document.getElementById("BGM").removeAttribute("hidden");
}

function ConsultarMsgCabin(idElemento){   
    let myData=idElemento;
    console.log(idElemento);
    $.ajax({
        url:"http://129.151.117.220:8080/api/Cabin/"+myData,
        type:"GET",
        data:myData,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuestaid){
            $("#detalle").empty();
            MsgCabin1=respuestaid;
            globalThis;
            const listamsgs=MsgCabin1.messages;
            idsM=[];
            listamsgs.forEach(function(id){
                idsM.push(id.idMessage);
            });
            console.log(idsM);
            $("#resultado").empty();
            $("#detalle").empty();
            DetalleMsgCabin(idsM.items);
            globalThis;
            OcultarForm();
        } 
    });
}

function DetalleMsgCabin(){
    let myTableDM="<table id='tablaDM' border='2'>";
    let thead = "<thead>";
            thead += "<tr>";
            thead += "<th>" +"MENSAJE" + "</th>"
            thead += "<th>" + "CLIENTE" + "</th>"
        thead += "</tr>";
    thead+="<thead>";
    myTableDM+=thead;
    for(i=0;i< MsgCabin1.messages.length;i++){   
        ConsultarClientMsg(MsgCabin1.messages[i].idMessage, i);
        myTableDM+="<tr  id='fila'>";
            myTableDM+="<td align=center>"+MsgCabin1.messages[i].messageText+"</td>";
        myTableDM+="</tr>";
    }
    myTableDM+="</table>";
    myTableDM+="</div id='detalle'></div>";   
    $("#detalle").append(myTableDM);
}

function ConsultarClientMsg(idElemento, i){   
    let myData=idElemento;
    $.ajax({
        url:"http://129.151.117.220:8080/api/Message/"+myData,
        type:"GET",
        data:myData,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuestaidC){ 
            nomcliente=respuestaidC.client.name;
            if(i==0){
                var celda = document.createElement("td");
                var a = document.createTextNode(nomcliente);
                celda.appendChild(a);
                celda.style.textAlign = "center";
                x=document.getElementById("fila");
                x.appendChild(celda);
            }else{
                var a = document.createTextNode(nomcliente);
                const tabla = document.getElementById("tablaDM");
                var numfila= tabla.rows[i+1];
                console.log(numfila);
                var newcell = numfila.insertCell(1);
                newcell.appendChild(a);
                newcell.style.textAlign = "center";
            }
             
        }
    });
}


//4.FUNCIONES PARA LA TABLA CATEGORY
function ListaCategorias(){
    $.ajax({
        url:"http://129.151.117.220:8080/api/Category/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            $("#detalle").empty();
            respuesta;
            console.log(respuesta);
            const $listcat=$("#category_id");
            for(i=0;i<respuesta.length;i++){
                $listcat.append($("<option>", {value: respuesta[i].id, text: respuesta[i].name}))
            }
        } 
    });
}

function MostrarCategoria(){
    document.getElementById("categoria").removeAttribute("hidden");
    document.getElementById("labnameCat").removeAttribute("hidden");
    document.getElementById("labdescCat").removeAttribute("hidden");
    document.getElementById("nameCat").removeAttribute("hidden");
    document.getElementById("descCat").removeAttribute("hidden");
    document.getElementById("BGCat").removeAttribute("hidden");
}

function CrearCategoria(){
    validarvacio($("#nameCat").val(), "Por favor ingrese el nombre de la categoria");
    validarvacio($("#descCat").val(), "Por favor ingrese la descripcion de la categoria");
    let myData={
        name:$("#nameCat").val(),
        description:$("#descCat").val(),
    }
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://129.151.117.220:8080/api/Category/save",
        type:"POST",
        contentType:"application/JSON",
        data:dataToSend,
        datatype:"JSON",
        success:function(respuesta){
            $("#nameCat").val("");
            $("#descCat").val("");
            console.log(respuesta);
            alert("Categoría creada exitosamente")
            $("#category_id").load(location.href+" #category_id>*","");
            ListaCategorias();
            document.getElementById("labnameCat").setAttribute("hidden", "true");
            document.getElementById("labdescCat").setAttribute("hidden", "true");
            document.getElementById("nameCat").setAttribute("hidden", "true");
            document.getElementById("descCat").setAttribute("hidden", "true");
            document.getElementById("BGCat").setAttribute("hidden", "true");
            document.getElementById("categoria").setAttribute("hidden", "true");
            
        }        
    });    

}


//5.FUNCIONES PARA LA TABLA RESERVATION
function ConsultarReserva(){   
    $.ajax({
        url:"http://129.151.117.220:8080/api/Reservation/all",
        type:"GET",
        datatype:"JSON",
        success:function r(respuesta){
            $("#resultReserv").empty();
            console.log(respuesta);
            rta_reservation=respuesta;
            globalThis;
            mostrarReserva(respuesta.items);
            OcultarFormReserva();
        } 
    });
}

function mostrarReserva(){
    let myTable="<table id='tabla_reserva' border= '2'>";
    let thead = "<thead>";
        thead += "<tr id='tablareservas'>";
            thead += "<th>" +"FECHA INICIAL" + "</th>"
            thead += "<th>" + "FECHA ENTREGA" + "</th>"
            thead += "<th>" + "CLIENTE" + "</th>"
            thead += "<th>" + "EMAIL-CLIENTE" + "</th>"
            thead += "<th>" + "CABAÑA" + "</th>"
            thead += "<th>" + "CALIFICACIONES" + "</th>"
        thead += "</tr>";
    thead+="<thead>";
    myTable+=thead;
    for(i=0;i<rta_reservation.length;i++){
        myTable+="<tr id='filareserva'>";
            var FI = new Date(rta_reservation[i].startDate).toISOString().slice(0,10);
            var FF = new Date(rta_reservation[i].devolutionDate).toISOString().slice(0,10);
            myTable+="<td align=center>"+FI+"</td>";
            myTable+="<td align=center>"+FF+"</td>";
            myTable+="<td align=center>"+rta_reservation[i].client.name+"</td>";
            myTable+="<td align=center>"+rta_reservation[i].client.email+"</td>";
            myTable+="<td align=center>"+rta_reservation[i].cabin.name+"</td>";
            if(rta_reservation[i].score==null){
                myTable+="<td align=center> <button class='bacc2' onclick='CalificarReserva("+rta_reservation[i].idReservation+")'>Calificar Reserva</button>";
            }else{
                myTable+="<td align=center> <button class='bacc' onclick='MostrarScore("+rta_reservation[i].score.id+")'>Ver Calificación</button>";
            }    
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultReserv").append(myTable);
}

function AgregarReserva(){
    $("#cabin_msg").load(location.href+" #cabin_msg>*","");
    $("#client_msg").load(location.href+" #client_msg>*","");
    $("#resultReserv").empty();
    document.getElementById("labcabinreserv").removeAttribute("hidden");
    document.getElementById("labclientreserv").removeAttribute("hidden");
    ListaCabañas();
    document.getElementById("cabin_msg").removeAttribute("hidden");$("#cabin_msg").val("");
    document.getElementById("NewCabinR").removeAttribute("hidden");
    ListaClientes();
    document.getElementById("client_msg").removeAttribute("hidden");$("#client_msg").val("");
    document.getElementById("NewClientR").removeAttribute("hidden");
    document.getElementById("labFI").removeAttribute("hidden");
    document.getElementById("labFF").removeAttribute("hidden");
    document.getElementById("FI").removeAttribute("hidden");
    document.getElementById("FF").removeAttribute("hidden");
    document.getElementById("BGR").removeAttribute("hidden");
}


function guardarReserva(){
    validarvacio($("#cabin_msg").val(), "Debe seleccionar una cabaña");
    validarvacio($("#client_msg").val(), "Debe seleccionar un cliente");
    validarvacio($("#FI").val(), "Por favor seleccione una fecha inicial para su reserva");
    validarvacio($("#FF").val(), "Por favor seleccione una fecha final para su reserva");

    ConsultarReserva();
    let myData={
        startDate:$("#FI").val(),
        devolutionDate:$("#FF").val(),
        cabin:{id:$("#cabin_msg").val()},
        client:{idClient:$("#client_msg").val()},
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://129.151.117.220:8080/api/Reservation/save",
        type:"POST",
        contentType:"application/JSON",
        data:dataToSend,
        datatype:"JSON",
        success:function(respuesta){
            $("#resultReserv").empty();
            $("#FI").val("");
            $("#FF").val(""),
            console.log(respuesta);
            ConsultarReserva();
            OcultarFormReserva();
            alert("se ha creado su reservación")
        }
    });
}  

function OcultarFormReserva(){
    document.getElementById("labcabinreserv").setAttribute("hidden", "true");
    document.getElementById("labclientreserv").setAttribute("hidden", "true");
    document.getElementById("labFI").setAttribute("hidden", "true");
    document.getElementById("labFF").setAttribute("hidden", "true");
    document.getElementById("cabin_msg").setAttribute("hidden", "true");
    document.getElementById("client_msg").setAttribute("hidden", "true");
    document.getElementById("FI").setAttribute("hidden", "true");
    document.getElementById("FF").setAttribute("hidden", "true");
    document.getElementById("BGR").setAttribute("hidden", "true");
    document.getElementById("labscore").setAttribute("hidden", "true");
    document.getElementById("scores").setAttribute("hidden", "true");
    document.getElementById("msgscore").setAttribute("hidden", "true");
    document.getElementById("BGScore").setAttribute("hidden", "true");
}

function CalificarReserva(idReservation){
    $("#idreserva").val(idReservation);
    $("#resultReserv").empty();
    document.getElementById("score").removeAttribute("hidden");
    document.getElementById("labscore").removeAttribute("hidden");
    document.getElementById("scores").removeAttribute("hidden");
    document.getElementById("msgscore").removeAttribute("hidden");$("#msgscore").val("");
    document.getElementById("BGScore").removeAttribute("hidden");$("#BGScore").val("");
}  

function GuardarScore(){  
    validarvacio($("#scores").val(), "Elija una calificación para esta reserva"); 
    let myData={
        score:parseInt($("#scores").val()),
        mensajecalif:$("#msgscore").val(),
        reservation:{idReservation:parseInt($("#idreserva").val())},
    };
    let dataToSend=JSON.stringify(myData);
    console.log(dataToSend);
    $.ajax({
        url:"http://129.151.117.220:8080/api/Score/save",
        type:"POST",
        contentType:"application/JSON",
        data:dataToSend,
        datatype:"JSON",
        success:function(respuesta){
            $("#resultReserv").empty();
            $("#scores").val("");
            $("#msgcore").val(""),
            console.log(respuesta);
            OcultarFormReserva();
            alert("La calificación para la reserva #"+parseInt($("#idreserva").val())+" ha sido guardada");
        }
    });
}  

function MostrarScore(idScore){
    let myData=idScore
    $.ajax({
        url:"http://129.151.117.220:8080/api/Score/"+myData,
        type:"GET",
        data:myData,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuestaid){
            Score1=respuestaid;
            globalThis;

            const tabla = document.getElementById("tabla_reserva");
            var Score = document.createTextNode(Score1.score);
            var msgSc = document.createTextNode(Score1.mensajecalif);
            var registro=parseInt(Score1.reservation.idReservation);
          
            if(tabla.rows[0].cells.length==6){
                const tablahead = document.getElementById("tablareservas");
                var columna1=document.createElement("th");
                var title1 = document.createTextNode("Puntuación");
                columna1.appendChild(title1);
                var columna2=document.createElement("th");
                var title2 = document.createTextNode("Comentarios");
                columna2.appendChild(title2);
                tablahead.append(columna1);
                tablahead.append(columna2);
                var celda1 = document.createElement("td");
                celda1.appendChild(Score);
                celda1.style.textAlign = "center";
                var celda2 = document.createElement("td");
                celda2.appendChild(msgSc);
                celda2.style.textAlign = "center";
                x=document.getElementById("filareserva");
                x.appendChild(celda1);x.appendChild(celda2);
            } 
            else if(tabla.rows[registro].cells.length==8){
                throw 'exit';
            }  
            else{    
                var numfila= tabla.rows[registro];
                var newcell1 = numfila.insertCell(6);       
                newcell1.appendChild(Score);
                newcell1.style.textAlign = "center";
                var newcell2 = numfila.insertCell(7);
                newcell2.appendChild(msgSc);
                newcell2.style.textAlign = "center";
            }

            OcultarFormClient();
        } 
    });
}
