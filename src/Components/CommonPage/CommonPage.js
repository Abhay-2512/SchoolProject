import React from 'react'
import { Link } from 'react-router-dom';
import '../../cssStyle/Style2.css';
import AddStudent from './AddStudent';
import ViewStudents from './ViewStudents';
import { FaBell,FaUser } from "react-icons/fa";
import EditStudentData from './EditStudentData';


function CommonPage({text}) {
    
    let screenHeight=window.innerHeight;

    return (
        <div className="main" style={{height:`${screenHeight}px`}}>
            <div className="topBar">
                <div className="topLeft">
                    LEADLOGO
                </div>
                <div className="topRight">
                <FaBell />
                <FaUser />
                   <b> Person Name</b>
                </div>
            </div>
            <div className="bottomBar">
            <div className="sideFixed">
            <div className="sideTabs">Students</div>
            <div className="sideTabs" style={{backgroundColor:`${(text==="addStudent")?"white":"lightblue"}`}}><Link className="link" to="/commonPage">- View Students</Link></div>
            <div className="sideTabs" style={{backgroundColor:`${(text==="viewStudent")?"white":"lightblue"}`}}><Link className="link" to="/commonPage/addStudent">- Add Student</Link></div>
            <div className="sideTabs"></div>
            <div className="sideTabs"></div>
            <div className="sideTabs"></div>
            <div className="sideTabs"></div>
            <div className="sideTabs"></div>
            <div className="sideTabs"></div>
            <div className="sideTabs"></div>
            <div className="sideTabs"></div>
            <div className="sideTabs"></div>
            <div className="sideTabs"></div>
            <div className="sideTabs"></div>
            
            </div>
            <div className="changable">
                {(text==="addStudent")?<AddStudent />:
                ((text==="viewStudent")?<ViewStudents />:<EditStudentData />)}
            </div>
            </div>
        </div>
    )
}

export default CommonPage
