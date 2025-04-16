//let table = new DataTable('myTable');

var DatatableDataSourcesContactos = function () {

    var table = document.getElementById('myTable');
    var datatable;

    var initContactTableF = function () {

        if (!$().DataTable) {
            console.warn('Warning - datatables.min.js is not loaded.');
            return;
        }

        // Setting datatable defaults
        $.extend($.fn.dataTable.defaults, {
            language: {
                url: '/scripts/datatable.es-cl.json'
            },
        });


        var datatable = $(table).DataTable({
            "info": false,
            "pageLength": 10,
            "lengthChange": true,
            "lengthMenu": [
                [5, 10, 25, -1],
                [5, 10, 25, "Todos"]
            ],
            buttons: [{
                extend: "csvHtml5",
                className: "d-none",
                title: 'Resumen de contactos'
            },
            {
                extend: "pdfHtml5",
                className: "d-none",
                title: 'Resumen de contactos'
            },
            {
                extend: "excelHtml5",
                className: "d-none",
                title: 'Resumen de contactos'
            },
            {
                extend: "print",
                className: "d-none",
                title: 'Resumen de contactos'
            }
            ],
            "columnDefs": [{
                targets: [0],
                orderable: true,
                searchable: true
            },
            {
                targets: [1],
                orderable: true,
                searchable: true
            },
            {
                targets: [2],
                orderable: true,
                searchable: true
            }
            ]
        });
        $('#btn_export_csv_contacto').click(function () {
            datatable.button('0').trigger();
        });
        $('#btn_export_pdf_contacto').click(function () {
            datatable.button('1').trigger();
        });
        $('#btn_export_excel_contacto').click(function () {
            datatable.button('2').trigger();
        });
        $('#btn_export_print_contacto').click(function () {
            datatable.button('3').trigger();
        });

    };

    return {
        init: function () {
            initContactTableF();
        }
    }
}();

$(document).ready(function () {

    DatatableDataSourcesContactos.init();
});


