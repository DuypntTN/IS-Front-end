import React, { useState } from 'react';
import axios from "~/api/auth";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import classNames from 'classnames/bind';
import styles from './ContactPage.module.scss';
const cx = classNames.bind(styles);

function ContactPage() {
    const [formStatus, setFormStatus] = useState('Send Message');
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        const contentSend = {
            toName: name,
            toEmail: email,
            fromEmail: "hobovn.website@gmail.com",
            subject: "[HOBOVN | Contact] " + subject,
            message: "We will reply you soon about your contact: \"" + message + "\"",
        };
        const contentReply = {
            toName: name,
            toEmail: "hobovn.website@gmail.com",
            fromEmail: email,
            subject: "[" + email + "] " + subject,
            message: message,
        };

        //Send userAccount to server and back to home page
        try {
            const response = await axios.post('/api/mail/sendNewMail', contentSend);
            const response2 = await axios.post('/api/mail/sendNewMail', contentReply);
            setFormStatus('Sending...');
            if (response.status === 200 && response2.status === 200) {
                toast.success("Form submitted successfully");
                setName('');
                setEmail('');
                setSubject('');
                setMessage('');
                setFormStatus('Send Message')
            }
        } catch (error) {
            console.log(error);
        }

        
    };
    return (
        <section className={cx("contact-section")}>
            <div className="container">
                <ToastContainer position="top-center"/>
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <div className={cx("wrapper", "rounded-5")}>
                            <div className="row no-gutters">
                                <div className="col-md-6">
                                    <div className={cx("contact-wrap", "w-100 p-lg-5 p-4 rounded-5")}>
                                        <h3 className="mb-4">Send us a message</h3>
                                        <form
                                        id="contactForm"
                                        className="contactForm"
                                        onSubmit={handleSubmit}
                                        >
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="form-group">
                                                        <input
                                                        type="text"
                                                        className="fctr form-control"
                                                        name="name"
                                                        placeholder="Name"
                                                        onChange={(e) => setName(e.target.value)}
                                                        value={name}
                                                        required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-12">
                                                    <div className="form-group">
                                                        <input
                                                        type="email"
                                                        className="fctr form-control"
                                                        name="email"
                                                        placeholder="Email"
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        value={email}
                                                        required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-12">
                                                    <div className="form-group">
                                                        <input
                                                        type="text"
                                                        className="fctr form-control"
                                                        name="subject"
                                                        placeholder="Subject"
                                                        onChange={(e) => setSubject(e.target.value)}
                                                        value={subject}
                                                        required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-12">
                                                    <div className="form-group">
                                                        <textarea
                                                        type="text"
                                                        className="fctr form-control"
                                                        name="message"
                                                        placeholder="Message"
                                                        cols="30"
                                                        rows="6"
                                                        onChange={(e) => setMessage(e.target.value)}
                                                        value={message}
                                                        required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-12">
                                                    <div className="form-group">
                                                        <input
                                                        type="submit"
                                                        value={formStatus}
                                                        className={cx("bt btn btn-primary")}
                                                        />
                                                </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className="col-md-6 d-flex align-items-stretch">
                                    <div className="info-wrap w-100 p-lg-5 p-4 img">
                                        <h3>Contact us</h3>
                                        <p className="mb-4">
                                        We're open for any suggestion or just to have a chat
                                        </p>
                                        <div className="dbox w-100 d-flex align-items-start">
                                            <div className="icon d-flex align-items-center justify-content-center">
                                            <span className="fa fa-map-marker"></span>
                                        </div>
                                        <div className="text pl-3">
                                            <p>
                                            <span>Address:</span> 227 Nguyen Van Cu Street, Ward 4, District 5, Ho Chi Minh City, Viet Nam
                                            </p>
                                        </div>
                                    </div>
                                    <div className="dbox w-100 d-flex align-items-center">
                                        <div className="icon d-flex align-items-center justify-content-center">
                                            <span className="fa fa-phone"></span>
                                        </div>
                                        <div className="text pl-3">
                                            <p>
                                                <span>Phone: </span>
                                                <a href="tel://123456789">
                                                    Undone
                                                </a>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="dbox w-100 d-flex align-items-center">
                                        <div className="icon d-flex align-items-center justify-content-center">
                                            <span className="fa fa-paper-plane"></span>
                                        </div>
                                        <div className="text pl-3">
                                            <p>
                                                <span>Email: </span>
                                                <a href="mailto:hobovn.website@gmail.com">
                                                    hobovn.website@gmail.com
                                                </a>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="dbox w-100 d-flex align-items-center">
                                        <div className="icon d-flex align-items-center justify-content-center">
                                            <span className="fa fa-globe"></span>
                                        </div>
                                        <div className="text pl-3">
                                            <p>
                                                <span>Website: </span>
                                                <a href="#">
                                                    Undone
                                                </a>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ContactPage;