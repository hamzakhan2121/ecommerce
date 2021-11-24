import React from 'react'
import "./sidebar.css";
import Logo from "../../images/logo.png";
import { Link } from 'react-router-dom';
import { TreeView, TreeItem } from '@material-ui/lab';
import { ExpandMore } from '@material-ui/icons';
import { PostAdd } from '@material-ui/icons';
import { Add } from '@material-ui/icons';
import { ImportExport, ListAlt, Dashboard, People, RateReview } from '@material-ui/icons';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <Link to="/">
                <img src={Logo} alt="Ecommerce" />
            </Link>
            <Link to="/admin/dashboard">
                <p>
                    <Dashboard /> Dashboard
                </p>
            </Link>
            <Link>
            <TreeView
            aria-label="file system navigator"
            defaultCollapseIcon={<ExpandMore />}
            defaultExpandIcon={<ImportExport />}
            sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
        >
            <TreeItem nodeId="1" label="Products">
            <Link to="/admin/products">
            <TreeItem nodeId="2" label="All" icon={<PostAdd />} />
            </Link>

            <Link to="/admin/product">
            <TreeItem nodeId="3" label="Create" icon={<Add />} />
            </Link>
            </TreeItem>
        </TreeView>
            </Link>
            <Link to="/admin/orders">
                <p>
                    <ListAlt />
                    Orders
                </p>
            </Link>
            <Link to="/admin/users">
                <p>
                    <People /> Users
                </p>
            </Link>
            <Link to="/admin/reviews">
                <p>
                    <RateReview />
                    Reviews
                </p>
            </Link>
        </div>
    );
};

export default Sidebar;

