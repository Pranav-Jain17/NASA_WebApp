import { useParams } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "./AppContext";

const ImageDetail = () => {
    const { id } = useParams();
    const { data } = useContext(AppContext);
    const item = data[id];

    if (!item) return <div>Image not found.</div>;

    const downloadImage = (url) => {
        const link = document.createElement('a');
        link.href = url;
        link.download = url.split('/').pop(); // Get the image file name
        link.click();
    };

    return (
        <div className="image-detail">
            <nav className="navDetailPage">
                <img src="/src/assets/NASA_logo.png" width="60px" height="60px"></img>
                <p className="title">NASA WEBAPP</p>
            </nav>
            <h1>{item.data[0].title}</h1>
            <div className="imageDetailContent">
                <img src={item.links[0].href} alt={item.data[0].description} />
                <div>
                    <p>{item.data[0].description}</p>
                    <button id="downloadBtn" onClick={() => downloadImage(item.links[0].href)}>Download</button>
                </div>
            </div>
        </div >
    );
};

export default ImageDetail;
