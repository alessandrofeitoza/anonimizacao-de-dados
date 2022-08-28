search.addEventListener('click', () => {

    table_body.innerHTML = '';
    loading.classList.remove('d-none');

    fetch(`/export/${type_anon.value}.csv`)
        .then((file) => file.text())
        .then((file) => {

            let rows = [];

            file = Papa.parse(file, {
                worker: true,
                header: true,
                step: (results) => {
                    if (0 === rows.length) {
                        table_header.innerHTML = `
                            <tr>
                                ${results.meta.fields.map(field => `<th>${field}</th>`).join('')}
                            </tr>
                        `;
                    }

                    let columns = results.meta.fields.map((col) => {
                        return `<td>${results.data[col]}</td>`;
                    });

                    rows.push(`<tr>${columns.join('')}</tr>`);
                },
                complete: () => {

                    loading.classList.add('d-none');
                
                    table_body.innerHTML = rows.join('');

                   table =  $('#table').DataTable(config);
                   
                   table.destroy();
                   table =  $('#table').DataTable(config);
                }
            });
        });
});