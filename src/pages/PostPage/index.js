import * as React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import  Axios  from 'axios';
import { useSelector } from 'react-redux';
import {selectUser} from '../../features/userSlice'
import {Rating} from 'react-simple-star-rating'

import classNames from 'classnames/bind';
import styles from './PostPage.module.scss';
const cx = classNames.bind(styles);

function SearchPage() {

    const [selectedFiles, setSelectedFiles] = React.useState([]);
    const [thumbnail, setThumbnail]=React.useState();
    const [sliderList, setsliderList] = React.useState([]);
    const [utilities, setUtilities] = React.useState([]);
    const [name,setName]=React.useState("");
    const [licenseNumber,setLicenseNumber]=React.useState("");
    const [address,setAddress]=React.useState("");
    const [star,setStar]=React.useState(0);
    const [phone,setphone]=React.useState("");
    const [description,setDescription]=React.useState("");
    const [nameUtility,setNameUtility]=React.useState("")
    const [imgNameUtility,setImgNameUtility]=React.useState("")

    const user=useSelector(selectUser)
    //console.log(user.userId)

    const handleImageChange =(source) => {
        const file=source.target.value;
        setThumbnail(file)
    }

    const renderPhoto = (source) => {
        return <img src={source} alt="" width="20%"/>;
    };
   
    const handleName = (event)=>{
        // show the user input value to console
        const name = event.target.value;

        setName(name)
    };

    const handleLicenseNumber = (event)=>{
        // show the user input value to console
        const licenseNumber = event.target.value;
        setLicenseNumber(licenseNumber)
    };

    const handleAddress = (event)=>{
        // show the user input value to console
        const address = event.target.value;

        setAddress(address)
    };

    const handlePhone = (event)=>{
        // show the user input value to console
        const phone = event.target.value;

        setphone(phone)
    };

    const handleStar = (event)=>{
        // show the user input value to console
        const star = event.target.value;

        setStar(star)
    };

    const handleDescription = (event)=>{
        // show the user input value to console
        const description = event.target.value;

        setDescription(description)
    };

    const handleCheck = () =>{
        if (name.length===0) return false
        else if (address.length===0) return false
        else if (phone.length===0) return false
        else if (description.length===0) return false
        return true
    }

    const checkInputFillComplete = () => {

        if(handleCheck()) {
            console.log(star)
            console.log(sliderList)
            console.log(licenseNumber)
            console.log(utilities)
            console.log(user.userId)

        

            Axios.post("https://intro-to-software-be.bagang.ai/api/hotel/createhotel", {
                    userId: user.userId,
                    licenseNumber:licenseNumber,
                    hotelName: name,
                    hotelAddress: address,
                    hotelPhoneNumber: phone,
                    starNumber: star,
                    description: description,
                    descriptionImage: thumbnail,
                    utilities:utilities,
                    slider : sliderList,
                })
                .then((response) => {
                console.log(response);
            });
        }
        else {
            alert("You must fill in the information about Name hotel, Address, Phone Number, Star, Description, Thumbnail, Slider")
        }
    }

    const outputImage = (source) => {
        return <img src={source} alt="" width="20%"/>;
    }

    const handleUtilitiesChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...utilities];
        list[index][name] = value;
        setUtilities(list);
      };
      
      const handleUtilitiesRemove = (index) => {
        const list = [...utilities];
        list.splice(index, 1);
        setUtilities(list);
      };
      
      const handleUtilitiesAdd = () => {
        // const nameValue=nameInput.current.value;
        // const imgValue=imgInput.current.value;

        if(nameUtility!=="" && imgNameUtility!=="")  {
            setUtilities([...utilities, { name: nameUtility, imageURL: imgNameUtility }]);
            // nameInput.current.value="";
            // imgInput.current.value="";

            setNameUtility("")
            setImgNameUtility("")
        }
          
          
      };

      //console.log(utilities)

      const renderUtilities = () => {
        return <>
                <form className="App" autoComplete="off">
                    <div className="form-field">
                    {utilities.map((singleUtilities, index) => (
                        <div key={index} className="Utilities">
                        <div className="first-division">
                            <br/>
                            <p className='bt'>Name utility: {singleUtilities.name}</p>
                            <img src={singleUtilities.imageURL} alt="" width="20%"/>
                        {/* value={singleUtilities.Utilities} onChange={(e) => handleUtilitiesChange(e, index)} */}
                            {/* <input className='Utilities-style' placeholder="Name" name="Utilities" type="text" id="utilities" ref={nameInput}/>
                            <br></br>
                            <br></br>
                            <input className='Utilities-style' placeholder="Image Link" name="Utilities-img" type="text" id="utilities-img" ref={imgInput}/> */}
                            
                            
                            <div className="second-division">
                            {utilities.length !== 0 && (
                            <button
                                type="button"
                                onClick={() => handleUtilitiesRemove(index)}
                                className="sbt remove-btn"
                            >
                                <span>X</span>
                            </button>
                            )}
                        </div>
                            
                        </div>

                        
                        <br></br>
                        </div>
                        
                    ))}
                    <input className='fctr form-control' placeholder="Name" name="Utilities" type="text" id="utilities" value={nameUtility} onChange={(e) => setNameUtility(e.target.value)}/>
                    <br></br>
                    <br></br>        
                    <input className='fctr form-control' placeholder="Image Link" name="Utilities-img" type="text" id="utilities-img" value={imgNameUtility} onChange={(e) => setImgNameUtility(e.target.value)}/>
                    
                    <br></br>
                    <br></br>
                    <button type="button" onClick={handleUtilitiesAdd} className="bt btn btn-success add-btn-utilitie">
                        <span>Add an Utility</span>
                    </button>
                    
                    </div>
                </form>
        </>
    }


    
    const handleSliderChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...sliderList];
        list[index][name] = value;
        setsliderList(list);
      };
      
      const handleSliderRemove = (index) => {
        const list = [...sliderList];
        list.splice(index, 1);
        setsliderList(list);
      };
      
      const handleSliderAdd = () => {
        setsliderList([...sliderList, { Slider: "" }]);
      };
 
      const renderSlider = () => {
        return <>
                <form className="App" autoComplete="off">
                    <div className="form-field">
                    {sliderList.map((singleSlider, index) => (
                        <div key={index} className="Sliders">
                            <div className="first-division">
                                <input className='fctr form-control' name="Slider" type="text" id="Slider" value={singleSlider.Slider} onChange={(e) => handleSliderChange(e, index)}/>
                            
                                <div className="second-division">
                                {sliderList.length !== 0 && (
                                <button
                                    type="button"
                                    onClick={() => handleSliderRemove(index)}
                                    className="sbt remove-btn"
                                >
                                    <span>X</span>
                                </button>
                                )}
                                </div>  
                            </div>
                        </div>
                        
                    ))}
                    <button type="button" onClick={handleSliderAdd} className="bt btn btn-success add-btn">
                        <span>Add an image to Slider</span>
                    </button>
                    
                    </div>
                    <br/>
                    <div className="output">
                    {sliderList &&
                        sliderList.map((singleSlider, index) => (
                        <ul key={index}>
                            {singleSlider.Slider && <li>{outputImage(singleSlider.Slider)}</li>}
                        </ul>
                        ))}
                    </div>
                </form>
        </>
    }
   

    return (
        <section className={cx("post")}>
            <br/>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <div className={cx("wrapper")}>
                            <div className="row no-gutters">
                                    <div className="post-section rounded-5">
                                        <h1>POST PAGE</h1>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
                <br/>
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <div className={cx("wrapper")}>
                            <div className="row no-gutters">
                                <div className="post-wrap w-100 p-lg-5 p-4 rounded-5">
                                    {/* <h3 className="mb-4 text-center">POST    PAGE</h3> */}
                                    <Form>
                                        <Form.Group className="post-group mb-3">
                                            <Form.Label className={cx('label')}>Name hotel:</Form.Label>
                                            <br></br>
                                            <input className='fctr form-control' type="text" placeholder="HOBO Hotel" required
                                            onChange={handleName}/>
                                        </Form.Group>

                                        <Form.Group className="post-group mb-3">
                                            <Form.Label className={cx('label')}>License number:</Form.Label>
                                            <br></br>
                                            <input className='fctr form-control' type="text" placeholder="0000-0000" required
                                            onChange={handleLicenseNumber}/>
                                        </Form.Group>

                                        <Form.Group className="post-group mb-3">
                                            <Form.Label className={cx('label')}>Address:</Form.Label>
                                            <br></br>
                                            <input 
                                            className='fctr form-control' 
                                            type="text" 
                                            placeholder="227 Nguyen Van Cu Street, Ward 4, District 5, Ho Chi Minh City, Viet Nam"
                                            required
                                            onChange={handleAddress}
                                            />
                                        </Form.Group>
                                        
                                        <Form.Group className="post-group mb-3">
                                            <Form.Label className={cx('label')}>Phone Number:</Form.Label>
                                            <br></br>
                                            <input className='fctr form-control' type="text" placeholder="(+028) XX XXX XXX" required
                                            onChange={handlePhone}/>
                                        </Form.Group>

                                        <Form.Group className="post-group mb-3">
                                            <Form.Label className={cx('label')}>Star:</Form.Label>
                                            <br></br>
                                            <input className='fctr form-control' type="number" placeholder="star" required min='0' max='5'
                                            onChange={handleStar}/>
                                        </Form.Group>

                                        <Form.Group className="post-group mb-3">
                                            <Form.Label className={cx('label')}>Description:</Form.Label>
                                            <br></br>
                                            <textarea className="fctr form-control" cols="40" rows="5" required
                                            onChange={handleDescription}></textarea>
                                        </Form.Group>
                                    
                                        <Form.Group className="post-group mb-3">
                                            <Form.Label className={cx('label')}>Thumbnail:</Form.Label>
                                            <br></br>
                                            <input className='fctr form-control' type="text" id="text-thumbnail" title=" " onChange={handleImageChange}/>
                                            <br></br>
                                            <br></br>
                                            {thumbnail  && 
                                                <div className="result">{renderPhoto(thumbnail)}</div>}
                                        </Form.Group>
                                    </Form>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <br />
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <div className={cx("wrapper")}>
                            <div className="row no-gutters">
                                <div className="post-wrap w-100 p-lg-5 p-4 rounded-5">
                                    <Form>
                                        <Form.Group className="post-group mb-3">
                                            <Form.Label className={cx('label')}>Utility:</Form.Label>
                                            <br></br>
                                            {renderUtilities()}
                                        </Form.Group>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <br />
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <div className={cx("wrapper")}>
                            <div className="row no-gutters">
                                <div className="post-wrap w-100 p-lg-5 p-4 rounded-5">
                                    <Form>
                                        <Form.Group className="post-group mb-3">
                                            <Form.Label className={cx('label')}>Slider:</Form.Label>
                                            <br></br>
                                            {renderSlider()}
                                        </Form.Group>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Form.Group className="post-group mb-3">
                    <div className='text-center'>
                        <button type="button" className="mbt btn btn-primary" onClick={checkInputFillComplete}>Submit</button>
                    </div>
                </Form.Group>
            </div>
        </section>
    );


}

export default SearchPage;
