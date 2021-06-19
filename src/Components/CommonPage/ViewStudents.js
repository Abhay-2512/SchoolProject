import React, { useEffect, useState,useRef } from 'react'
import '../../cssStyle/Style3.css'
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { FaLessThanEqual, FaGreaterThanEqual } from "react-icons/fa";
import DataTable from './DataTable';

let URL = "https://my-json-server.typicode.com/abhay-2512/myserver/AllStudentData";

function ViewStudents() {

    const [studentData, setstudentData] = useState([])
    const [paginatedData, setPaginatedData] = useState([])
    const [CurrPage, setCurrPage] = useState(1)
    const [refresh,setRefresh]=useState({})
    const [string, setString] = useState("")
    // console.log(string);
    const history = useHistory();
    let Username=useRef()
    let Age=useRef()
    let Class=useRef()
    let Schoolname=useRef()
    let Division=useRef()
    let pageSize = 8;


    useEffect(() => {
        axios.get(URL).then((res) => {
            // console.log(res.data)
            let myData = res.data;
            setstudentData(myData)
            let firstPage = myData.slice(0, pageSize);
            // console.log(firstPage);
            setPaginatedData(firstPage)
        }).catch((err) => {
            console.log(err)
        })
    }, [pageSize,refresh])
    // console.log(paginatedData);

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
        // console.log(startIndex);
        const paginationPost = studentData.slice(startIndex, startIndex + pageSize);
        setPaginatedData(paginationPost)
    }
    

    // PAGINATION END HERE

    // DELETE BUTTON LOGIC START HERE
    const deleteStudent = (id) => {
        axios.delete(`${URL}/${id}`).then((res) => {
            // console.log(res.data)
            setRefresh(res.data);
        }).catch((err) => console.log(err))
    }
    const showCandidateDetails = (id) => {

        history.push(`/commonPage/editStudentData/:${id}`)
    }

    // FILTER TABLE START HERE

    const searchTableData = (e) => {
        let search1="";
        let search2="";
        let search3="";
        let search4="";
        let search5="";
        if(Username.current.value!==""){
            search1+=Username.current.value;
        }
        if(Class.current.value!==""){
            search1+=Class.current.value;
        }
        if(Age.current.value!==""){
            search1+=Age.current.value;
        }
        if(Schoolname.current.value!==""){
            search1+=Schoolname.current.value;
        }
        if(Division.current.value!==""){
            search1+=Division.current.value;
        }

        let AllData=search1+search2+search3+search4+search5;
        setString(AllData);
        

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
                    <input type="text" placeholder="Name" ref={Username}  ></input>
                </div>
                <div>
                    <input type="text" placeholder="Age" ref={Age}  ></input>
                </div>
                <div>
                    <select ref={Schoolname} >
                        <option value="" >Select school</option>
                        <option value="Nav Bharat Vidyalaya">Nav Bharat Vidyalaya</option>
                        <option value="Swami Vivekanand Vidyalaya">Swami Vivekanand Vidyalaya</option>
                        <option value="karmavir Vidyalaya">karmavir Vidyalaya</option>
                    </select>
                </div>
                <div>
                    <select ref={Class}  >
                        <option value="">Select class</option>
                        <option value="1">Class01</option>
                        <option value="2">Class02</option>
                        <option value="3">Class03</option>
                    </select>
                </div>
                <div>
                    <select ref={Division} >
                        <option value="">Select division</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                    </select>
                </div>
                <div className="btnsearch">
                    <button type="button" className="searchbtn" onClick={searchTableData}>Search</button>
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
                        <p onClick={() => (CurrPage>1)?pagination(CurrPage - 1):pagination(CurrPage)}><FaLessThanEqual className="direction" /> </p>
                        {pageCountArr.map((page) => {
                            return (
                                <p key={page} className={page === CurrPage ? "active" : "normal"}>
                                    <span onClick={() => pagination(page)}>{page}</span>
                                </p>)
                        })}

                        <p onClick={() => (CurrPage<pageCount)?pagination(CurrPage + 1):pagination(CurrPage)}><FaGreaterThanEqual className="direction" /> </p>
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
