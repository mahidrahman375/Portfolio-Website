 
const API_URL = (
import.meta.env.VITE_API_URL || "http://localhost:5000"
).replace(/\/$/, "");
async function request(path, options = {}) {
const response = await fetch(`${API_URL}${path}`, {
headers: {
"Content-Type": "application/json", ...options.headers,
},
    ...options,
  });
const data = await response.json().catch(() => ({}));
if (!response.ok) {
throw new Error(data.message || "The request could not be completed.");
}
  return data;
}
                      export function getProjects() {
                         
return request("/api/projects"); }
export function sendContactMessage(formData) { return request("/api/contact", {
    method: "POST",
body: JSON.stringify(formData), });
}