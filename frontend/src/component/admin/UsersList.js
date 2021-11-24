import React,{useEffect} from 'react'
import { DataGrid } from '@material-ui/data-grid';
import "./productList.css";
import { useSelector,useDispatch } from 'react-redux';

import { Link } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { Button } from '@material-ui/core';
import MetaData from '../layout/metaData';
import { Edit,Delete } from '@material-ui/icons';
import Sidebar from './Sidebar';
import { getAllUsers,clearErrors, deleteUser } from '../../actions/userAction';
import { DELETE_USER_RESET } from '../../constants/userConstants';
const UsersList = ({history}) => {
    const dispatch=useDispatch();
    const alert=useAlert();

    const{users,error} =useSelector((state)=>state.allUsers)
    const {error:deleteError,isDeleted,message}=useSelector((state)=>state.profile)

    const deleteUserHandler=(id)=>{
        dispatch(deleteUser(id));
    }
useEffect(() => {
    if(error){
        alert.error(error)
        dispatch(clearErrors())
    }
    if(deleteError){
        alert.error(deleteError)
        dispatch(clearErrors())
    }
    if(isDeleted){
        alert.success(message);
        history.push("/admin/users");
        dispatch({type:DELETE_USER_RESET});
    }
    dispatch(getAllUsers());
}, [dispatch,alert,error,history,deleteError,isDeleted,message]);

    const columns=[
        {field:"id" ,headerName:"User ID" ,minWidth:180 , flex:0.8},
        {field:"email", headerName:"Email",minWidth:200,flex:1 },
        {field:"name", headerName:"Name",minWidth:150,flex:0.5 },
        {field:"role", headerName:"Role",type:"number",minWidth:150,flex:0.3,
        cellClassName:(params)=>{
            return(
                params.getValue(params.id,"role") ==="admin" ? "greenColor" : "redColor"
            )
        } },
        {field:"action", headerName:"Actions",type:"number",minWidth:150,flex:0.3,sortable:false
        ,renderCell:(params)=>{
            return(
                <>
                <Link to ={`/admin/user/${params.getValue(params.id,"id")}`} >
                    <Edit />
                </Link>
                <Button onClick={()=>deleteUserHandler(params.getValue(params.id,"id"))}><Delete /></Button>
                </>
            )
        }
    },
        
    ]

    const rows=[];
    users && users.forEach((item) => {
        rows.push({
            id:item._id,
            email:item.email,
            name:item.name,
            role:item.role
        })
    });
    return (
        <>
            <MetaData title={"ALL USERS - ADMIN"}/>
            <div className="dashboard">
                <Sidebar />
                <div className="productListContainer">
                <h1 id="productListHeading">All Users</h1>

                <DataGrid rows={rows} columns={columns} pageSize={10} disableSelectionOnClick className="productListTable" autoHeight/>
            </div>
            </div>
        </>
    )
}



export default UsersList