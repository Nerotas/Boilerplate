import { ImageList, ImageListItem } from '@mui/material';

interface ImageCell {
    images: string[];
    colWidth?: number;
}
const ImageListCell = ({ colWidth = 100, images }: ImageCell) => (
    <ImageList cols={2} rowHeight={164} sx={{ width: colWidth, height: 500 }}>
        {images.map((item, index) => (
            <ImageListItem key={`${item}_${index}`}>
                <img
                    loading="lazy"
                    src={`${item}?w=${colWidth / 2}&fit=crop&auto=format`}
                    srcSet={`${item}?w=${colWidth / 2}&fit=crop&auto=format&dpr=2 2x`}
                />
            </ImageListItem>
        ))}
    </ImageList>
);

export default ImageListCell;
