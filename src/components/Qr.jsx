import { useState } from "react";
import "./Qr.css"

export const Qr = () => {
   let [img,Setimg] = useState("")
   let [loading,Setloading] = useState(false);
   let [qrdata, Setqrdata] = useState("https://.in")
   let [qrsize,Setqrsize] = useState("150")
    async function generateQR(){
        Setloading(true)
        try{
         const url = `https://api.qrserver.com/v1/create-qr-code/?size=${qrsize}x${qrsize}&data=${encodeURIComponent(qrdata)}`
         Setimg(url)
        }catch (error) {
         console.error("Error generating QR code",error)
        } finally {
          Setloading(false)
        }
    }
    function downloadQR(){
         fetch(img).then((response) => response.blob())
         .then((blob) =>{
          const link = document.createElement("a");
          link.href= URL.createObjectURL(blob);
          link.download="qrcode.png"
          document.body.appendChild(link);
          link.click()
          document.body.removeChild(link);
         })
    }
  return (
   <div className="app-container">
   <h1>QR CODE GENERATOR</h1>   
   {loading && <p>please Wait...</p>}
   <img src={img} className="qr-code-image"/>
   <div>
    <label htmlFor="dataInput" className="input-label">Data for QR code:</label>
    <input type="text" value={qrdata} id="dataInput" placeholder="Enter data for QR code" onChange={(e) => Setqrdata (e.target.value)}/>
    <label htmlFor="sizeInput" className="input-label">Image size (e.g., 150):</label>
    <input type="text" id="sizeInput" placeholder="Enter image size" value={qrsize} onChange={(e) => Setqrsize(e.target.value)}/>
    <button onClick={generateQR} disabled={loading} className="generate-button">Generate QR Code</button>
    <button className="download-button" onClick={downloadQR}>Download QR Code</button>
   </div>
   </div>  
  )
}

export default Qr;