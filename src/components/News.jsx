import React, { useState } from "react";
import { Select, Typography, Row, Col, Avatar, Card } from "antd";
import moment from "moment";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import { useGetCryptosQuery } from "../services/cryptoApi";
import { UserOutlined } from "@ant-design/icons";
import Loader from "./Loader";

const demoImage =
  "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";

const { Text, Title } = Typography;
const { Option } = Select;

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState("cryptocurrency");
  const { data } = useGetCryptosQuery(100);
  const articles = useGetCryptoNewsQuery({
    newsCategory,
    count: simplified ? 6 : 12,
  });
  // console.log(articles.data);
  // console.log(data);

  if (!articles.data?.articles) {
    return <Loader />;
  } else {
    return (
      <Row gutter={[24, 24]}>
        {!simplified && (
          <Col span={24}>
            <Select
              showSearch
              className="select-news"
              placeholder="Select a Crypto"
              optionFilterProp="children"
              onChange={(value) => setNewsCategory(value)}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option value="Cryptocurency">Cryptocurrency</Option>
              {data?.data?.coins?.map((currency) => (
                <Option value={currency.name}>{currency.name}</Option>
              ))}
            </Select>
          </Col>
        )}
        {articles.data.articles.map((news, i) => (
          <Col xs={24} sm={12} lg={8} key={i}>
            <Card hoverable className="news-card">
              <a href={news.url} target="_blank" rel="noreferrer">
                <div className="news-image-container">
                  <Title className="news-title" level={4}>
                    {news.title}
                  </Title>
                  <img
                    src={news.urlToImage || demoImage}
                    alt=""
                    style={{ maxWidth: "100px ", maxHeight: "100px" }}
                  />
                </div>
                <p>
                  {news.description.length > 100
                    ? `${news.description.substring(0, 100)}...`
                    : news.description}
                </p>
                <div className="provider-container">
                  <div>
                    <Avatar
                      src={
                        news.source?.image?.thumbnail?.urlToImage || demoImage
                      }
                      alt=""
                      icon={
                        !news.source?.image?.thumbnail?.urlToImage && (
                          <UserOutlined />
                        )
                      }
                    />
                    <Text className="provider-name">{news.source?.name}</Text>
                  </div>
                  <Text>
                    {moment(news.publishedAt).startOf("ss").fromNow()}
                  </Text>
                </div>
              </a>
            </Card>
          </Col>
        ))}
      </Row>
    );
  }
};

export default News;
