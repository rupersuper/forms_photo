import React from "react";
import "./App.css";

type ImageData = {
  url: string;
  id: number;
}

const fileToDataUrl = (file: File) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.addEventListener("load", (evt) => {
      resolve(evt.currentTarget.result);
    });

    fileReader.addEventListener("error", (evt) => {
      reject(new Error(evt.currentTarget.error));
    });

    fileReader.readAsDataURL(file);
  });
};
const PhotoManager: React.FC = () => {
  const [images, setImages] = React.useState<ImageData[]>([]);

const handleSelect = async (evt: React.ChangeEvent<HTMLInputElement>) => {
  const files = [...evt.target.files];
  const urls = await Promise.all(files.map((o) => fileToDataUrl(o)));
  const newImages = urls.map((url, index) => ({
    url,
    id: Date.now() + index,
  }));
  setImages((prevImages) => [...prevImages, ...newImages]);
};
const handleRemove = (id: number) => {
  setImages((prevImages) => prevImages.filter((image) => image.id !== id));
};
  return (
    <>
      <form>
        <input type="file" onChange={handleSelect} />
      </form>
      <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '20px' }}>
        {images.map((image) => (
          <div
            key={image.id}
            style={{
              position: 'relative',
              margin: '10px',
              width: '250px',
              height: '250px',
              backgroundImage: `url(${image.url})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <button
              onClick={() => handleRemove(image.id)}
              style={{
                position: 'absolute',
                top: '0',
                right: '0',
                background: 'red',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default PhotoManager;
