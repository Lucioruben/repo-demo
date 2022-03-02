var TABLE_RESERVACIONES;
var ID_ELIMINAR_RESERVACION;
var CARGAR_ID_RESERVACION;

$(document).ready(function() {

TABLE_RESERVACIONES=$('#listReservaciones').DataTable( {
        "ajax":{
            type: 'get',
            url: 'http://apis-app-proyecto.com/api/v1/reservaciones',
            dataSrc: 'data',
            cache: true
            },
        columns: [
            {data: 'dni'},
            {data: 'apellido'},
            {data: 'nombre'},
            {data: 'nivel'},
            {data: 'grado'},
            {data: 'condicion'},
            {data: 'celular'},
            {
                "targets": 8,
                "render": function ( data, type, row ){

                    return "<a href='#' onclick=\"showEditarReservacion('"+row.id+"')\">Editar</a> | <a href='#' onclick=\"confirmarEliminacion('"+row.id+"')\">Eliminar</a>"
                    
                }
            },
        ]
    } );
} );


function showNewReservacion(){

    var url="/views/reservaciones/frm-new-reservaciones.html";

    $('#modalContainer1').load(url, function (result){
        $('#mdCreate').modal({show: true, backdrop: 'static', size: 'lg', keyboard: false});
    });
}

function showEditarReservacion(id)
{
    CARGAR_ID_RESERVACION=id;
    var url="/views/reservaciones/frm-editar-reservaciones.html";

    $('#modalContainer1').load(url, function (result){
        $('#mdCreate').modal({show: true, backdrop: 'static', size: 'lg', keyboard: false});

        loadDataReservacion();

    });
}

function loadDataReservacion()
{
    $.ajax({
        method:"GET",
        url:"http://apis-app-proyecto.com/api/v1/reservaciones/"+CARGAR_ID_RESERVACION       
      }).done(function(response){
        $("#txtdni").val(response.data.dni);
        $("#txtapellido").val(response.data.apellido);
        $("#txtnombre").val(response.data.nombre);
        $("select").val(response.data.nivel);
        $("select").val(response.data.grado);
        $("select").val(response.data.condicion);
        $("#txtcelular").val(response.data.celular);
      });
}

function updateDataTable()
{
    TABLE_RESERVACIONES.ajax.reload();
}

function confirmarEliminacion(id)
{
    ID_ELIMINAR_RESERVACION=id;
    var url="/views/reservaciones/frm-confirmar-eliminar.html";

    $('#modalContainer1').load(url, function (result){
        $('#mdCreate').modal({show: true, backdrop: 'static', size: 'lg', keyboard: false});
    });
}

function eliminarReservacion()
{
    console.log(ID_ELIMINAR_RESERVACION);

    $.ajax({
        method:"DELETE",
        url:"http://apis-app-proyecto.com/api/v1/reservaciones/"+ID_ELIMINAR_RESERVACION        
      }).done(function(response){
        
        $('#mdCreate').modal('hide');

        updateDataTable();
      });
}
