import { useState } from "react";
import { sendContactMessage } from "../api";
const initialForm = {
  name: "Yeamin Rahman Mahid",
  email: "yeaminmahid@gmail.com",
  message: "",
};
function Contact() {
    const [formData, setFormData] = useState(initialForm);
    const [submitting, setSubmitting] = useState(false);
    const [feedback, setFeedback] = useState({ type: "", message: "" });
    function handleChange(event) {
        const { name, value } = event.target; 
        setFormData((current) => ({ ...current, [name]: value }));
    }
    async function handleSubmit(event) { 
        event.preventDefault(); 
        setSubmitting(true);
        setFeedback({ type: "", message: "" });
        try {
        const data = await sendContactMessage(formData); 
        setFeedback({ type: "success", message: data.message }); 
        setFormData(initialForm);
        } catch (error) {
           setFeedback({ type: "error", message: error.message });
        } finally { 
            setSubmitting(false);
        } 
    }
    return (
    <section className="section section-muted" id="contact">
        <div className="container contact-grid"> 
            <div>
                <p className="section-label">Contact</p> 
                <h2>Let us build something useful.</h2> 
                <p> 
                    Send a message through the form. The frontend sends it to the live
                    Express API after deployment. </p>
                <a className="text-link" href="mailto:you@example.com"> you@example.com
                </a> 
            </div>
            <form className="contact-form" onSubmit={handleSubmit}> 
                <label htmlFor="name">Name</label>
                <input
                    id="name"
                    name="name"
                    type="text" 
                    minLength="2" 
                    maxLength="80" 
                    value={formData.name} 
                    onChange={handleChange} 
                    required
                />
                <label htmlFor="email">Email</label> 
                <input
                    id="email"
                    name="email" 
                    type="email" 
                    maxLength="120" 
                    value={formData.email} 
                    onChange={handleChange} 
                    required
                />
                <label htmlFor="message">Message</label> 
                <textarea
                    id="message" 
                    name="message"
                    rows="6"
                    minLength="10" 
                    maxLength="1500" 
                    value={formData.message} 
                    onChange={handleChange} 
                    required 
                />
                <button className="button button-primary" type="submit" disabled={submitting}> 
                    {submitting ? "Sending..." : "Send message"}
                </button>

                {feedback.message && ( 
                    <p
                        className={`form-feedback ${feedback.type}`}
                        role={feedback.type === "error" ? "alert" : "status"} 
                    >
                    {feedback.message} 
                    </p>
                )} 
                </form>
            </div>
        </section>
    ); 
}
export default Contact;
                    