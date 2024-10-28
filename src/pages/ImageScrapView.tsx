import React, { useCallback, useEffect, useState } from 'react';
import { css, StyleSheet } from 'aphrodite';
import axios from 'axios';
import { useHistory, useLocation } from 'react-router-dom';
import qs from 'query-string';

import { ImageItem } from './ImageItem';
import { onKeyEnter } from '../utils/KeyBoardKey.ts';

export const ImageScrapView: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const [images, setImages] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [count, setCount] = useState('20');

  const location = useLocation();
  const query = qs.parse(location.search);
  const { keyword: sKeyword, count: sCount} = query;

  const scrapImages = useCallback(async () => {
    const { keyword, count } = query;
    console.log(query);
    if (keyword == null) {
      return;
    }

    setIsLoading(true);
    try {
      const { data } = await axios.post(`https://api.jakestory.me/image-scraper/search`, {
        tags: [],
        keyword,
      });
      console.log(data)
      setImages(data);
    } finally {
      setIsLoading(false);
    }
  }, [query]);

  useEffect(() => {scrapImages()}, [sKeyword, sCount])

  const refreshWithSearch = () => {
    history.replace(`image?keyword=${keyword}&count=${count}`);
  }

  return <>
    <input
      className={css(styles.input)}
      onChange={e => setKeyword(e.target.value)}
      onKeyDown={(e) => onKeyEnter(e, () => refreshWithSearch())}
      defaultValue={''}
    />
    <input
      type={'number'}
      className={css(styles.input)}
      onChange={e => setCount(e.target.value)}
      value={count}
      onKeyDown={(e) => onKeyEnter(e, () => refreshWithSearch())}
    />
    <div className={css(styles.imagesBox)}>
      {images.map((item: any, index) => (
        <ImageItem item={item} index={index} />
      ))}
    </div>
  </>;
};

const styles = StyleSheet.create({
  input: {
    width: '100%',
    height: 40,

    borderRadius: 10,
    borderColor: '#000',
    borderWidth: 1,
    padding: 18,

    marginBottom: 16,
  },
  imagesBox: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'space-between',
  },
  imageWrapper: {
    width: 350,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  image_thumb: {
    width: 300,
    height: 400,
    marginBottom: 5,
  },
  image_title: {
    fontFamily: 'Spoqa',
    fontSize: 18,
    whiteSpace: 'pre-wrap',
    textAlign: 'center',
    wordBreak: 'keep-all',
  }
});
