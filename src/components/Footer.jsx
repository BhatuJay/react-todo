import "./Footer.css"
export function Footer() {
    return (
        <footer>
            <div className="footer__copyright">
                <div className="footer__socials">
                    <a href="https://youtube.com/@bhatujay" target="_blank"><i className='bx bxl-youtube yt'></i></a>
                    <a href="https://www.facebook.com/AhirBhatuJay" target="_blank"><i className='bx bxl-facebook fb'></i></a>
                    <a href="https://www.instagram.com/jay_bhatu_2135" target="_blank"><i className='bx bxl-instagram inst'></i></a>
                    <a href="https://www.linkedin.com/in/jay-bhatu-77b619303" target="_blank"><i className='bx bxl-linkedin linkedin'></i></a>
                    <a href="https://x.com/AhirBhatuJay" target="_blank"><i className="bx bxl-twitter twitter"></i></a>
                    <a href="https://github.com/BhatuJay" target="_blank"><i className="bx bxl-github github"></i></a>
                </div>
                <div>
                    <small>Copyright &copy; 2025 React Todo aka BHATU JAY 2025 <br />Project – User Todo Manager</small>
                </div>
            </div>
        </footer>
    )
}