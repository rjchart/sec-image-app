import React, { useRef, useState } from 'react';
import qs from 'query-string';
import { useLocation } from 'react-router-dom';
// import { TagList } from './TagList';

export const SecImageDetailView: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const imageUrlsRef = useRef<string[]>([]);
  const [count, setCount] = useState(0);
  const [tags, setTags] = useState([]);
  const [title, setTitle] = useState('');
  const location = useLocation();
  const query = qs.parse(location.search);

  const createRange = (end: number): number[] => {
    return Array.from({ length: end }, (_, index) => index);
  };

  // const [source] = useState(new EventSource(`https://api.jakestory.me/image-scraper/detail-code/${query.url}`));
  // const imageUrls = imageUrlsRef.current;
  // useEffect(() => {
  //   if (query.url == null) {
  //     return;
  //   }
  //   console.log('start');
  //   const source = new EventSource(`https://minio.jakestory.me/sec-images/${query.code}`);
  //   source.onmessage = (event) => {
  //     // console.log('onmessage', event);
  //     try {
  //       // const { data } = JSON.parse(event.data) ?? {};
  //       if (event.data != null) {
  //         const image = event.data as string;
  //         if (!_.includes(imageUrlsRef.current, image)) {
  //           imageUrlsRef.current.push(image);
  //         }
  //         console.log(imageUrlsRef.current);
  //         setCount(count => count + 1);
  //       }
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };
  //   return () => source.close();
  // }, [query.url]);

  // const onClickSave = useCallback(() => {
  //   const { url } = query;
  //   console.log(url)
  //   if (url == null) {
  //     return
  //   }
  //   setIsLoading(true)
  //   axios.post('https://api.jakestory.me/image-scraper/save', { url })
  //     .finally(() => setIsLoading(false))
  // }, [query])

  // useEffect(() => {uploadImages()}, [query])

  return (
    <div className={'flex flex-col items-center'}>
      <h1>{title}</h1>
      {/*<TagList tags={tags}/>*/}
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
