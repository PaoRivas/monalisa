window.addEventListener('DOMContentLoaded', event => {
    // Simple-DataTables
    // https://github.com/fiduswriter/Simple-DataTables/wiki

    // const datatablesSimple = document.getElementById('datatablesSimple');
    // if (datatablesSimple) {
    //     new simpleDatatables.DataTable(datatablesSimple, {
    //         layout: {
    //             top: "{search}",
    //             bottom: "{select}{pager}"
    //         },
    //     });
    // }

    const datatablesSimple = document.querySelectorAll('[id="datatablesSimple"]');
    if (datatablesSimple) {
        for (let data of datatablesSimple)
        new simpleDatatables.DataTable(data, {
            layout: {
                top: "{search}",
                bottom: "{select}{pager}"
            },
        });
    }
});
