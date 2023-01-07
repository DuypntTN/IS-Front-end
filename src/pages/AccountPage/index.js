import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
import Axios from 'axios';
import * as React from 'react';
import { Button, Col, Form, Image, InputGroup, Row, Toast } from 'react-bootstrap';

import classNames from 'classnames/bind';
import styles from './AccountPage.module.scss';
const cx = classNames.bind(styles);

function AccountPage() {
    const [inforUser, setInforUser] = React.useState({});

    const user = useSelector(selectUser);
    //console.log(user.userId)
    React.useEffect(() => {
        Axios.get(`https://intro-to-software-be.bagang.ai/api/user/info/${user._id}`)
            .then((res) => {
                setInforUser(res.data);

                console.log(inforUser.avatar);
            })
            .catch((err) => console.log(err));
    }, [user]);

    const [showSetting, setShowSetting] = React.useState(false);
    const [isEditingPro5, setIsEditingPro5] = React.useState(false);

    /* Info */
    const [phoneNumber, setPhoneNumber] = React.useState(null);
    const [firstName, setFirstName] = React.useState(null);
    const [lastName, setLastName] = React.useState(null);
    const [email, setEmail] = React.useState(null);
    const [avatar, setAvatar] = React.useState(null);
    const [showToast, setShowToast] = React.useState(false);
    const [toastContent, setToastContent] = React.useState('');
    const showToastFunc = (content) => {
        setShowToast(true);
        setToastContent(content);
        setTimeout(() => {
            setShowToast(false);
            setToastContent('');
        }, 2000);
    };
    const clickRef = React.useRef(null);
    React.useEffect(() => {
        const handleClickOutside = (event) => {
            if (clickRef.current && !clickRef.current.contains(event.target)) {
                setShowSetting(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showSetting]);
    const [validated, setValidated] = React.useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        const emailReg = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
        const phoneReg = /^[0-9]{10}$/;
        if (emailReg.test(email || inforUser.email) === false) {
            showToastFunc('Your email is not valid');
            event.preventDefault();
            event.stopPropagation();
            return;
        }
        if (!phoneReg.test(phoneNumber || inforUser.phoneNumber)) {
            showToastFunc('Your phone number is not valid');
            event.preventDefault();
            event.stopPropagation();
            return;
        }
        if (form.checkValidity() === false) {
            console.log('form invalid');
            event.preventDefault();
            event.stopPropagation();
            setValidated(true);
        } else {
            console.log('form valid');
            const payload = {
                username: inforUser.username,
                phoneNumber: phoneNumber || inforUser.phoneNumber,
                firstName: firstName || inforUser.firstName,
                lastName: lastName || inforUser.lastName,
                email: email || inforUser.email,
                avatar: avatar || inforUser.avatar,
            };
            console.log(payload);
            event.preventDefault();
            event.stopPropagation();
            Axios.post(`https://intro-to-software-be.bagang.ai/api/user/changeinfo`, payload)
                .then((res) => {
                    console.log(res.data);
                    setIsEditingPro5(false);
                    setShowSetting(false);
                    // clear form
                    setPhoneNumber(null);
                    setFirstName(null);
                    setLastName(null);
                    setEmail(null);
                    setAvatar(null);
                    // reload page
                    window.location.reload();
                })
                .catch((err) => console.log(err));
        }
    };

    return (
        <div className="container text-center position-relative">
            <Toast show={showToast} className="position-absolute end-0  top-0">
                <Toast.Body>{toastContent}</Toast.Body>
            </Toast>
            <div className="position-absolute top-0 start-0 ">
                <div className={cx("dropdown")} ref={clickRef}>
                    <button
                        className={'btn btn-info w-100 text-bg-dark' + (showSetting ? ' active' : '')}
                        onClick={() => {
                            setShowSetting(!showSetting);
                            if (isEditingPro5) {
                                setIsEditingPro5(false);
                                // clear form
                                setPhoneNumber(null);
                                setFirstName(null);
                                setLastName(null);
                                setEmail(null);
                                setAvatar(null);
                                setValidated(false);
                            }
                        }}
                    >
                        {showSetting ? (
                            isEditingPro5 ? (
                                <i className="fas fa-times"></i>
                            ) : (
                                <i className="fas fa-cog"></i>
                            )
                        ) : isEditingPro5 ? (
                            <i className="fas fa-times"></i>
                        ) : (
                            <i className="fas fa-cog"></i>
                        )}
                    </button>
                    <div>
                        {showSetting && !isEditingPro5 && (
                            <div className="setting">
                                <div
                                    className="setting_item"
                                    onClick={() => {
                                        setShowSetting(false);
                                        setIsEditingPro5(true);
                                    }}
                                >
                                    <div>Edit profile</div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <br />
            <div className="row justify-content-center h-100">
                <h1>PROFILE PAGE</h1>
            </div>

            {/* <img src={inforUser.avatar} alt="#" style={{width:'30%'}}/> */}
            {/* <h1>{inforUser.email}</h1>
            <img src={inforUser.avatar} alt="harry potter" style={{ width: '400px', }}/> */}
            <br />
            <div className="row justify-content-center">
                <div className="col-md-5">
                    <div className={cx("wrapper")}>
                        <div className="row no-gutters">
                            {!isEditingPro5 ? (
                                <div className="user-wrap w-100 p-lg-5 p-4 rounded-5">
                                    <img className={cx("avar", "rounded-circle")} src={inforUser.avatar} alt="#" />
                                    <h3>{inforUser.username}</h3>
                                    <p className="title">
                                        {inforUser.firstName} {inforUser.lastName}
                                    </p>
                                    <p className="mail">{inforUser.email}</p>
                                    <p className="phone">{inforUser.phoneNumber}</p>
                                </div>
                            ) : (
                                <div className=" w-100 p-lg-5 p-4 rounded-5">
                                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                        <Row className="mb-3">
                                            <Form.Group as={Col} md="6" controlId="validationCustom02">
                                                <Form.Label>
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <i className="fas fa-user m-2"></i>
                                                        <span
                                                            style={{
                                                                fontSize: '1.2rem',
                                                                fontWeight: 'bold',
                                                            }}
                                                        >
                                                            First name
                                                        </span>
                                                    </div>
                                                </Form.Label>
                                                <Form.Control
                                                    required
                                                    type="text"
                                                    placeholder="First name"
                                                    defaultValue={inforUser.firstName || ''}
                                                    value={firstName}
                                                    onChange={(e) => {
                                                        setFirstName(e.target.value);
                                                    }}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    Firstname is required
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                            <Form.Group as={Col} md="6" controlId="validationCustom02">
                                                <Form.Label>
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <i className="fas fa-user m-2"></i>
                                                        <span
                                                            style={{
                                                                fontSize: '1.2rem',
                                                                fontWeight: 'bold',
                                                            }}
                                                        >
                                                            Last name
                                                        </span>
                                                    </div>
                                                </Form.Label>
                                                <Form.Control
                                                    required
                                                    type="text"
                                                    placeholder="Last name"
                                                    defaultValue={inforUser.lastName || ''}
                                                    value={lastName}
                                                    onChange={(e) => {
                                                        setLastName(e.target.value);
                                                    }}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    Firstname is required
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </Row>
                                        <Row className="mb-3">
                                            <Form.Group as={Col} md="6" controlId="validationCustom05">
                                                <Form.Label>
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <i className="fas fa-phone m-2"></i>
                                                        <span
                                                            style={{
                                                                fontSize: '1.2rem',
                                                                fontWeight: 'bold',
                                                            }}
                                                        >
                                                            Phone number
                                                        </span>
                                                    </div>
                                                </Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Phone number"
                                                    required
                                                    defaultValue={inforUser.phoneNumber || ''}
                                                    onChange={(e) => {
                                                        setPhoneNumber(e.target.value);
                                                    }}
                                                    value={phoneNumber}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    Phone number is required
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                            <Form.Group as={Col} md="6" controlId="validationCustom03">
                                                <Form.Label>
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <i className="fas fa-envelope m-2"></i>
                                                        <span
                                                            style={{
                                                                fontSize: '1.2rem',
                                                                fontWeight: 'bold',
                                                            }}
                                                        >
                                                            Email
                                                        </span>
                                                    </div>
                                                </Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Email"
                                                    required
                                                    defaultValue={inforUser.email || ''}
                                                    value={email}
                                                    onChange={(e) => {
                                                        setEmail(e.target.value);
                                                    }}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    Email is required
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </Row>
                                        <Row className="mb-3 align-items-center justify-content-center">
                                            <Form.Group as={Col} md="12" controlId="validationCustom03">
                                                <Form.Label>
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <i className="fas fa-image m-2"></i>
                                                        <span
                                                            style={{
                                                                fontSize: '1.2rem',
                                                                fontWeight: 'bold',
                                                            }}
                                                        >
                                                            Avatar
                                                        </span>
                                                    </div>
                                                </Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Avatar link"
                                                    defaultValue={inforUser.avatar || ''}
                                                    required
                                                    onChange={(e) => {
                                                        setAvatar(e.target.value);
                                                    }}
                                                    isValid={avatar && avatar?.length > 0 ? true : false}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    Avatar link is required
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                            <Image
                                                src={avatar && avatar?.length > 0 ? avatar : inforUser.avatar}
                                                alt="harry potter"
                                                style={{
                                                    width: '400px',
                                                    alignSelf: 'center',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                }}
                                            />
                                        </Row>
                                        <Button className="btn btn-info" type="submit">
                                            <div className={cx("btn-text")}>Update</div>
                                        </Button>
                                    </Form>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AccountPage;
