import React, { useEffect, useState } from 'react'
import '../../cssStyle/Style3.css'
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { FaLessThanEqual, FaGreaterThanEqual } from "react-icons/fa";
import DataTable from './DataTable';

let URL = "http://localhost:3006/AllStudentData";

function ViewStudents() {

    const [studentData, setstudentData] = useState([])
    const [paginatedData, setPaginatedData] = useState([])
    const [CurrPage, setCurrPage] = useState(1)
    const [string, setString] = useState("")
    const history = useHistory();
    let pageSize = 8;


    useEffect(() => {
        axios.get(URL).then((res) => {
            console.log(res.data)
            let myData = res.data;
            setstudentData(myData)
            let firstPage = myData.slice(0, pageSize);
            console.log(firstPage);
            setPaginatedData(firstPage)
        }).catch((err) => {
            console.log(err)
        })
    }, [pageSize])
    console.log(paginatedData);

    // PAGINATION START HERE

    const pageCount = (studentData) ? Math.ceil(studentData.length / pageSize) : 0;
    if (pageCount === 1) return null;
    let pageCountArr = [];
    for (let i = 0; i < pageCount; i++) {
        pageCountArr[i] = i + 1;
    }

    const pagination = (pageNo) => {
        setCurrPage(pageNo)
        const startIndex = (pageNo - 1) * pageSize;
        console.log(startIndex);
        const paginationPost = studentData.slice(startIndex, startIndex + pageSize);
        setPaginatedData(paginationPost)
    }
    

    // PAGINATION END HERE


    const deleteStudent = (id) => {
        axios.delete(`${URL}/${id}`).then((res) => {
            console.log(res.data)
        }).catch((err) => console.log(err))
    }
    const showCandidateDetails = (id) => {

        history.push(`/commonPage/editStudentData/:${id}`)
    }

    // FILTER TABLE START HERE

    const searchTableData = (e) => {
        setString(e.target.value)

    }
    const search = (rows) => {
        const columns = rows[0] && Object.keys(rows[0]);
        return rows.filter((row) => {
            return (
                columns.some(
                    (column) => row[column].toString().toLowerCase().indexOf(string.toLowerCase()) > -1
                )
            )
        });
    }

    return (
        <div className="main">
            <div className="searchBar">
                <div>
                    <input type="text" placeholder="Name" onChange={searchTableData} ></input>
                </div>
                <div>
                    <input type="text" placeholder="Age" onChange={searchTableData} ></input>
                </div>
                <div>
                    <select onChange={searchTableData}>
                        <option value="" >Select school</option>
                        <option value="navbhar">School01</option>
                        <option value="swami">School02</option>
                        <option value="karmavir">School03</option>
                    </select>
                </div>
                <div>
                    <select onChange={searchTableData} >
                        <option value="">Select class</option>
                        <option value="1">Class01</option>
                        <option value="2">Class02</option>
                        <option value="3">Class03</option>
                    </select>
                </div>
                <div>
                    <select onChange={searchTableData}>
                        <option value="">Select division</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                    </select>
                </div>
                <div className="btnsearch">
                    <button type="button" className="searchbtn">Search</button>
                </div>
            </div>
            <div>
                <div className="fixheight">
                    {(!paginatedData ? <p>No Data Found</p> :
                        <DataTable tableData={search(paginatedData)} deleteStudent={deleteStudent} detail={showCandidateDetails} />
                    )}
                </div>
                <div className="pagination">
                    <nav className="pageNum">
                        <p onClick={() => pagination(CurrPage - 1)}><FaLessThanEqual className="direction" /> </p>
                        {pageCountArr.map((page) => {
                            return (
                                <p key={page} className={page === CurrPage ? "active" : "normal"}>
                                    <span onClick={() => pagination(page)}>{page}</span>
                                </p>)
                        })}

                        <p onClick={() => pagination(CurrPage + 1)}><FaGreaterThanEqual className="direction" /> </p>
                    </nav>
                </div>
                <div className="download">
                    <button type="button" className="btndownload">Download Excel</button>
                </div>
            </div>

        </div>
    )
}

export default ViewStudents
