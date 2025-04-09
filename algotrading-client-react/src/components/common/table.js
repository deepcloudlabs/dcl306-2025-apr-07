export default function Table({headers,values,fields,keyField,handleRowClick}) {
    if (values && values.length > 0)
    console.log(values[0]["fulltime"]? "TRUE" : "FALSE")
    return (
        <table className="table table-striped table-bordered table-responsive table-hover">
            <thead>
            <tr>
                {
                    headers.map(header => (
                        <th key={header}>{header}</th>
                    ))
                }
            </tr>
            </thead>
            <tbody>
            {
                values.map((value, index) => (
                    <tr key={value[keyField]} onClick={() => handleRowClick(value,index) }>
                        {
                            fields.map((field,fieldIndex) =>
                                <>
                                    { typeof(value[field]) == 'boolean' && (<td key={index}>{value[field] ? "TRUE" : "FALSE"}</td>)}
                                    { typeof(value[field]) != 'boolean' && (<td key={index}>{value[field]}</td>)}
                                </>
                           )
                        }
                    </tr>
                ))
            }
            </tbody>
        </table>
    )
}