import React from 'react';

export const ImageList: React.FC<{ imageUrls: string[], count: number }> = React.memo(({ imageUrls, count }) => {
  console.log(imageUrls, count);
  return <>
    {imageUrls?.map((url, index) => (
      <img
        key={'image-' + index}
        src={url}
        className={'max-w-full h-[120vh]'}
      />
    ))}
  </>;
});
