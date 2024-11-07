// ImageDetail.jsx
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
            <h1>{item.data[0].title}</h1>
            <img src={item.links[0].href} alt={item.data[0].description} />
            <p>{item.data[0].description}</p>
            <button onClick={() => downloadImage(item.links[0].href)}>Download</button>
        </div>
    );
};

export default ImageDetail;
