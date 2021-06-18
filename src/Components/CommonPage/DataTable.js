import React from 'react'
import '../../cssStyle/Style3.css'

function DataTable({tableData,detail,deleteStudent}) {
    const ageCalculator = (date) => [
        console.log(date)
    ]
    const checkStatus = (active, inactive) => {
        if (active === true) {
            return "Active";
        }
        if (inactive === true) {
            return "InActive";
        }
    }
    return (
        <table border="1" className="tablepagination" id="myTable" >
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Age</th>
                                    <th>School</th>
                                    <th>Class</th>
                                    <th>Division</th>
                                    <th>Status</th>
                                    <th>other</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableData.map((ele, ind) => {
                                    return (
                                        <tr key={ind}>
                                            <td>{ele.id}</td>
                                            <td>{ele.Username}</td>
                                            <td>{ageCalculator(ele.Dob)}</td>
                                            <td>{ele.Schoolname}</td>
                                            <td>{ele.Class}</td>
                                            <td>{ele.Division}</td>
                                            <td>{checkStatus(ele.Active, ele.Inactive)}</td>
                                            <td><span onClick={()=>detail(ele.id)}>Edit</span><span onClick={()=>deleteStudent(ele.id)}>Delete</span></td>
                                        </tr>
                                    )
                                })}

                            </tbody>
                        </table>
    )
}

export default DataTable
