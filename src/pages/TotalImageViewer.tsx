import React, { useCallback, useEffect, useState } from 'react';
import { ColorRing } from 'react-loader-spinner';
import axios from 'axios';

import { SecImage, SecImageItem } from './SecImageItem.tsx';
import { useLocation, useNavigate } from 'react-router-dom';
import qs from 'query-string';

export const TotalImageViewer: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const query = qs.parse(location.search);

  if (query.pageNo == null && query.pageCount == null) {
    navigate('/?pageNo=1&pageCount=32', { replace: true });
  }

  if (query.pageCount == null) {
    navigate(`/?pageNo=${query.pageNo}&pageCount=32`, { replace: true });
  }

  if (query.pageNo == null) {
    navigate(`/?pageNo=1&pageCount=${query.pageCount}`, { replace: true });
  }

  const scrapImages = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`https://sec-image-api.jakestory.me/sec-image?pageNo=${query.pageNo ?? 1}&pageCount=${query.pageCount ?? 32}`);
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
    <div className={'flex flex-col w-full h-full pt-[10px]'}>
      <div className={'flex flex-wrap gap-4 p-5 justify-between w-full'}>
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
