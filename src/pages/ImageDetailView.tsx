import React, { useCallback, useEffect, useRef, useState } from 'react';
import { atom, useSetRecoilState } from 'recoil';
import qs from 'query-string';
import * as _ from 'lodash';
import { useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';
import { css, StyleSheet } from 'aphrodite';

import { isLoadingState } from '../../shared/presentation/LoadingFrame';
import { ImageList } from './ImageList';
import { TagList } from './TagList';

export const ImageDetailView: React.FC = () => {
  const setIsLoading = useSetRecoilState(isLoadingState);
  const history = useHistory();
  const imageUrlsRef = useRef<string[]>([]);
  const [count, setCount] = useState(0);
  const [tags, setTags] = useState([]);
  const [title, setTitle] = useState('');
  const location = useLocation();
  const query = qs.parse(location.search);

  // const [source] = useState(new EventSource(`https://api.jakestory.me/image-scraper/detail-code/${query.url}`));
  const imageUrls = imageUrlsRef.current;
  useEffect(() => {
    if (query.url == null) {
      return;
    }
    console.log('start');
    const source = new EventSource(`https://api.jakestory.me/image-scraper/detail-code/${query.url}`);
    source.onmessage = (event) => {
      // console.log('onmessage', event);
      try {
        // const { data } = JSON.parse(event.data) ?? {};
        if (event.data != null) {
          const image = event.data as string;
          if (!_.includes(imageUrlsRef.current, image)) {
            imageUrlsRef.current.push(image);
          }
          console.log(imageUrlsRef.current);
          setCount(count => count + 1);
        }
      } catch (e) {
        console.log(e);
      }
    };
    return () => source.close();
  }, [query.url]);

  // const uploadImages = useCallback(() => {
  //   const { url } = query;
  //   console.log(url)
  //   if (url == null) {
  //     history.replace('/image');
  //   }
  //   if (imageUrls.length > 0) {
  //     return;
  //   }
  //   axios.get(`https://api.jakestory.me/image-scraper/detail?url=${url}`)
  //     .finally(() => setIsLoading(false))
  //     .then(({ data }) => {
  //       console.log(data);
  //       imageUrlsRef.current.push(data.images);
  //       setTags(data.tags);
  //       setTitle(data.title);
  //     });
  // }, [query])

  const onClickSave = useCallback(() => {
    const { url } = query;
    console.log(url)
    if (url == null) {
      return
    }
    setIsLoading(true)
    axios.post('https://api.jakestory.me/image-scraper/save', { url })
      .finally(() => setIsLoading(false))
  }, [query])

  // useEffect(() => {uploadImages()}, [query])

  return (
    <div className={css(styles.wrapper)}>
      <h1>{title}</h1>
      <TagList tags={tags}/>
      <ImageList imageUrls={imageUrls} count={count}/>
      <div className={css(styles.button)} onClick={onClickSave}>Save</div>
    </div>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  button: {
    position: 'fixed',
    bottom: 10,
    right: 10,

    width: 40,
    height: 40,
    backgroundColor: '#0094FF',
    borderRadius: 10,

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#FFF',

    cursor: 'pointer',
  }
});
