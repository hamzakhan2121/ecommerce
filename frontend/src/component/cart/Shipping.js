import React,{useState} from 'react'
import { useSelector,useDispatch } from 'react-redux';
import "./shippping.css";
import MetaData from '../layout/metaData';
import { PinDrop,Home,LocationCity,Public,Phone,TransferWithinAStation } from '@material-ui/icons';
import {Country,State} from 'country-state-city'
import { useAlert } from 'react-alert';
import CheckoutSteps from "./Cart/Checkoutsteps.js";
import { saveShippingInfo } from '../../actions/cartAction';

const Shipping = ({history}) => {
    const dispatch = useDispatch();
    const alert=useAlert();
    const{shippingInfo}=useSelector((state)=>state.cart);
    const [address,SetAddress]=useState(shippingInfo.address);
    const[city,setCity]=useState(shippingInfo.city);
    const[state,setState]=useState(shippingInfo.state);
    const[country,setCountry]=useState(shippingInfo.country);
    const[pinCode,setPinCode]=useState(shippingInfo.pinCode);
    const[phoneNo,setPhoneNo]=useState(shippingInfo.phoneNo);
    
    const shippingSubmit=(e)=>{
        e.preventDefault();

        if(phoneNo.length<10 || phoneNo.length>10){
            alert.error("Phone No should be 10 digits long");
            return;
        }
        dispatch(
            saveShippingInfo({address,city,state,country,pinCode,phoneNo})
        );
        history.push("/order/confirm");

    }
    
    return (
        <>
        <MetaData title="Shipping Details"/>
        <CheckoutSteps activeStep={0} />
            <div className="shippingContainer">
                <div className="shippingBox">
                    <h2 className="shippingHeading">Shipping Details</h2>
                    <form className="shippingForm" encType="multipart/form-data" onSubmit={shippingSubmit}>
                        <div>
                            <Home />
                            <input type="text" placeholder="Address" required value={address} onChange={(e)=>SetAddress(e.target.value)}/>
                        </div>
                        <div>
                            <LocationCity />
                            <input type="text" placeholder="City" required value={city} onChange={(e)=>setCity(e.target.value)}/>
                        </div>
                        <div>
                            <PinDrop />
                            <input type="number" placeholder="Pin Code" required value={pinCode} onChange={(e)=>setPinCode(e.target.value)} />
                        </div>
                        <div>
                            <Phone />
                            <input type="number" placeholder="Phone Number" required value={phoneNo} onChange={(e)=>setPhoneNo(e.target.value)} />
                        </div>
                        <div>
                            <Public />
                            <select required value={country} onChange={(e)=>setCountry(e.target.value)}>
                                <option value="">Country</option>
                                {Country && Country.getAllCountries().map((item)=>(
                                    <option key={item.isoCode} value={item.isoCode}>{item.name}</option>
                                ))}
                                
                            </select>
                        </div>
                        {country && (
                            <div>
                                <TransferWithinAStation />
                                <select required value={state} onChange={(e)=>setState(e.target.value)}>
                                    <option value="">State</option>
                                    {State && State.getStatesOfCountry(country).map((item)=>(
                                        <option key={item.isoCode} value={item.isoCode}>{item.name}</option>
                                    ))}
                                </select>
                            </div>
                        )}
                        <input type="submit" value="Continue" className="shippingBtn" disabled={state?false:true}/>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Shipping;