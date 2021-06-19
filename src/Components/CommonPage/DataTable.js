import React from 'react'
import '../../cssStyle/Style3.css'

function DataTable({ tableData, detail, deleteStudent }) {

    // Age Calculation Logic start Here

    const ageCalculator = (date) => {
        const CurrYear = new Date().getFullYear()
        const studentYear = new Date(Date.parse(date)).getFullYear()
        console.log(CurrYear);
        return CurrYear - studentYear;
    }

    // Status Checking Logic start Here

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
                    <th></th>
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
                            <td><span className="linkbtn" onClick={() => detail(ele.id)}>Edit</span>   <span className="linkbtn" onClick={() => deleteStudent(ele.id)}>Delete</span></td>
                        </tr>
                    )
                })}

            </tbody>
        </table>
    )
}

export default DataTable
