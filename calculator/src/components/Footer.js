const Footer = () => {
    let year=new Date();
    year=year.getFullYear();
    return ( 
                <div style={{paddingRight:"20px", paddingTop:"60px",textAlign:"right"}} id="footer">
                  <p className="footer">VIIT Pune {year}</p>
                </div>
            );
          }
          
export default Footer;