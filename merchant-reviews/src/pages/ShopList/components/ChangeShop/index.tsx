import React, { useState, useEffect } from 'react';
import {
  history,
  useParams,
  useSelector,
  useDispatch,
  ShopModelState,
  CommentModelState,
} from 'umi';
import Header from '@/components/Header';
import UploadPic from '../UploadPic';
import { List, InputItem, Button } from 'antd-mobile';
import { message } from 'antd';
import { AutoComplete } from 'react-bmapgl';
import { uploadPicItem } from '@/services/comment'

interface PicProps {
  uid: string;
  name: string;
  status: string;
  url: string;
}

const index = () => {
  const data = useSelector(({ shop }: { shop: ShopModelState }) => shop.shop);
  const pic = useSelector(({ comment }: { comment: CommentModelState }) => comment.pic);
  const { id }: { id: string } = useParams();
  const dispatch = useDispatch();
  const [shop, setShop] = useState('');
  const [category, setCategory] = useState('');
  const [address, setAddress] = useState('');
  const [region, setRegion] = useState('');
  const [price, setPrice] = useState('');
  const [files, setFiles] = useState<Array<PicProps>>([]);
  const [fileList, setFileList] = useState<Array<string>>([]);

  useEffect(() => {
    setShop(() => data?.shop || '');
    setCategory(() => data?.category || '');
    setAddress(() => data?.address || '');
    setRegion(() => data?.region || '');
    setPrice(() => data?.price || '');
    setFiles(() => [
      {
        uid: '-1',
        name: 'image.png',
        status: 'done',
        url: data?.pic,
      },
    ]);
    setFileList(() => [data?.pic || '']);
  }, [data]);

  useEffect(() => {
    dispatch({
      type: 'shop/getShopItem',
      payload: {
        id,
      },
    });
  }, []);

  const  handlePicChange = async (files: any) => {
    if (files.length && files[0]?.file) {
      const { data } = await uploadPicItem({file: files[0]?.file})
      setFileList(() => [data.url]);
    }
    setFiles(() => files);
  };

  const handleBack = () => {
    history.goBack();
  };

  const handleShopChange = (value: string) => {
    setShop(value);
  };

  const handleCategoryChange = (value: string) => {
    setCategory(value);
  };

  const handleAddressChange = (value: string) => {
    setAddress(() => value);
  };

  const handleAddress = (e: any) => {
    setAddress(() => e.item.value.city + e.item.value.business);
    setRegion(() => e.item.value.city);
  };

  const handlePriceChange = (value: string) => {
    setPrice(value);
  };

  const submit = () => {
    if (!shop) {
      message.error('?????????????????????');
    } else if (!category) {
      message.error('???????????????');
    } else if (!address) {
      message.error('???????????????');
    } else if (!price) {
      message.error('?????????????????????');
    } else if (isNaN(Number(price))) {
      message.error('??????????????????????????????');
    } else if (!fileList.length) {
      message.error('???????????????');
    } else {
      dispatch({
        type: 'shop/changeShop',
        payload: {
          id: +id,
          shop,
          category,
          address,
          region,
          price: +price,
          files: fileList[0],
        },
      });
    }
  };

  return (
    <div>
      <Header title="??????????????????" onBack={handleBack} grey />
      <List renderHeader={() => '????????????'}>
        <InputItem
          onChange={handleShopChange}
          value={shop}
          placeholder="?????????????????????"
        >
          ????????????
        </InputItem>
        <InputItem
          onChange={handleCategoryChange}
          value={category}
          placeholder="???????????????"
        >
          ??????
        </InputItem>
        <InputItem
          onChange={handleAddressChange}
          //   onBlur={handleBlur}
          value={address}
          placeholder="???????????????"
          id="address"
        >
          ??????
        </InputItem>
        <AutoComplete input="address" onConfirm={handleAddress} />
        <InputItem
          onChange={handlePriceChange}
          value={price}
          placeholder="?????????????????????"
          extra="??"
        >
          ??????
        </InputItem>
      </List>
      <List renderHeader={() => '????????????'}>
        <UploadPic num={1} fileList={files} handleChange={handlePicChange} />
      </List>
      <Button onClick={submit} type="primary">
        ??????
      </Button>
    </div>
  );
};

export default index;
