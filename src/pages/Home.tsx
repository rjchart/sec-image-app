import React, { useCallback, useEffect, useState } from 'react';
import { ColorRing } from 'react-loader-spinner';
import axios from 'axios';

import { SecImage, SecImageItem } from './SecImageItem.tsx';

export const Home: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState([]);

  const scrapImages = useCallback(async () => {
    // const { keyword, count } = query;
    // console.log(query);
    // if (keyword == null) {
    //   return;
    // }

    setIsLoading(true);
    try {
      const { data } = await axios.get(`https://sec-image-api.jakestory.me/sec-image?pageNo=1&pageCount=30`);
      console.log(data);
      setImages(data);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    scrapImages();
  }, []);

  return (
    <div className={'flex flex-col w-full h-full items-center justify-center pt-[50px]'}>
      <div className={'flex flex-wrap gap-2.5 justify-between w-full'}>
        {images.map((item: SecImage, index) => (
          <SecImageItem item={item} index={index}/>
        ))}
      </div>
      {isLoading && (
        <div className={'absolute top-0 left-0 w-full h-full flex justify-center items-center'}>
          <ColorRing/>
        </div>
      )}
    </div>
  );
};
