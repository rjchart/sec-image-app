import React from 'react';
import qs from 'query-string';
import { useLocation } from 'react-router-dom';

export const SecImageDetailView: React.FC = () => {
  const location = useLocation();
  const query = qs.parse(location.search);

  const createRange = (end: number): number[] => {
    return Array.from({ length: end }, (_, index) => index);
  };

  return (
    <div className={'flex flex-col items-center'}>
      <>
        {
          createRange(parseInt(query.pageCount as string ?? '0')).map((value) =>
            <img src={`https://minio-host.jakestory.me/sec-images/${query.code}/image/${value}.jpeg`}/>
          )
        }
      </>
      {/*<ImageList imageUrls={imageUrls} count={count}/>*/}
      {/*<div className={css(styles.button)} onClick={onClickSave}>Save</div>*/}
    </div>
  )
}
