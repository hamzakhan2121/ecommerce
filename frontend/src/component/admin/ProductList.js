import React,{useEffect} from 'react'
import { DataGrid } from '@material-ui/data-grid';
import "./productList.css";
import { useSelector,useDispatch } from 'react-redux';
import { getAdminProducts,clearErrors,deleteProduct } from '../../actions/productAction';
import { Link } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { Button } from '@material-ui/core';
import MetaData from '../layout/metaData';
import { Edit,Delete } from '@material-ui/icons';
import Sidebar from './Sidebar';
import { DELETE_PRODUCT_RESET } from '../../constants/productConstants';
const ProductList = ({history}) => {
    const dispatch=useDispatch();
    const alert=useAlert();

    const {error,products}=useSelector((state)=>state.products);
    const{error:deleteError,isDeleted} =useSelector((state)=>state.product)

    const deleteProductHandler=(id)=>{
        dispatch(deleteProduct(id));
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
        alert.success("Product Deleted Successfully");
        history.push("/admin/dashboard");
        dispatch({type:DELETE_PRODUCT_RESET});
    }
    dispatch(getAdminProducts());
}, [dispatch,alert,error,deleteError,history,isDeleted]);

    const columns=[
        {field:"id" ,headerName:"Product ID" ,minWidth:200 , flex:0.5},
        {field:"name", headerName:"Name",minWidth:350,flex:1 },
        {field:"stock", headerName:"Stock",type:"number",minWidth:150,flex:0.3 },
        {field:"price", headerName:"Price",type:"number",minWidth:270,flex:0.5 },
        {field:"action", headerName:"Actions",type:"number",minWidth:150,flex:0.3,sortable:false
        ,renderCell:(params)=>{
            return(
                <>
                <Link to ={`/admin/product/${params.getValue(params.id,"id")}`} >
                    <Edit />
                </Link>
                <Button onClick={()=>deleteProductHandler(params.getValue(params.id,"id"))}><Delete /></Button>
                </>
            )
        }
    },
        
    ]

    const rows=[];
    products && products.forEach((item) => {
        rows.push({
            id:item._id,
            stock:item.stock,
            price:item.price,
            name:item.name
        })
    });
    return (
        <>
            <MetaData title={"ALL PRODUCTS - ADMIN"}/>
            <div className="dashboard">
                <Sidebar />
                <div className="productListContainer">
                <h1 id="productListHeading">All Products</h1>

                <DataGrid rows={rows} columns={columns} pageSize={10} disableSelectionOnClick className="productListTable" autoHeight/>
            </div>
            </div>
        </>
    )
}

export default ProductList
