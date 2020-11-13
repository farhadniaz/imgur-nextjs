import React, { FC, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { Row, Col, Button, Modal, Switch, Select } from "antd";
import { FilterOutlined } from "@ant-design/icons";

import StyledDiv, { Vertical } from "./style";
import {
  imgurFilterQuery,
  filterDefautValue,
} from "~/store/gallery/initial-state";
interface Props {
  onFilter: Function;
  loading: boolean;
}

const Filter: FC<Props> = (props) => {
  const { onFilter = () => { }, loading } = props;
  const [modalVisible, setModalVisible] = useState(false);

  const [data, setData] = useState(filterDefautValue);
  const Device = useSelector((state) => state.App.device);
  const applyiedFilter = useSelector((state) => state.Gallery.filter);
  const isThereAnyFilter = JSON.stringify(filterDefautValue) != JSON.stringify(applyiedFilter);
  const isMobieOrTablet =
    Device.isMobieOrTablet || (Device.widthInMobile && Device.isDesktop);


  const setModalInVisible = () => setModalVisible(false);
  const setModalBeVisible = () => setModalVisible(true);

  const doFilter = () => {
    onFilter(data);
    setModalInVisible();
  };
  const restFilter = () => {
    onFilter(filterDefautValue);
    setData(filterDefautValue);
    setModalInVisible();
  };

  const renderOptions = (optionsList) => {
    return Object.keys(optionsList).reverse().map((propertyName) => {
      const item = optionsList[propertyName];
      return (
        <Select.Option key={item} value={item} label={item}>
          {item}
        </Select.Option>
      );
    });
  };

  const filterForm = useCallback((spanSize = 4) => {
    const viralChange = (checked) => setData({ ...data, showViral: checked });
    const windowChange = (value) => setData({ ...data, window: value });
    const sortChange = (value) => setData({ ...data, sort: value });
    const sectionChange = (value) => setData({ ...data, section: value });

    return <Row
      data-testid="filter-form"
      style={{
        justifyContent: "space-around",
      }}
    >
      <Col span={spanSize}>
        <label className="filter__item">
          <span className="filter__item__title">Viral:</span>
          <span className="filter__item__control">
            <Switch
              checkedChildren="including"
              unCheckedChildren="excluding"
              checked={data.showViral}
              onChange={viralChange}
            />
          </span>
        </label>
      </Col>
      <Col span={spanSize}>
        <label className="filter__item">
          <span className="filter__item__title">Window:</span>
          <span className="filter__item__control">
            <Select
              style={{ width: "100%" }}
              placeholder="select window"
              value={data.window}
              onChange={windowChange}
              optionLabelProp="label"
            >
              {renderOptions(imgurFilterQuery.window)}
            </Select>
          </span>
        </label>
      </Col>
      <Col span={spanSize}>
        <label className="filter__item">
          <span className="filter__item__title">Sort:</span>
          <span className="filter__item__control">
            <Select
              style={{ width: "100%" }}
              placeholder="select sort"
              defaultValue={data.sort}
              value={data.sort}
              onChange={sortChange}
              optionLabelProp="label"
            >
              {renderOptions(imgurFilterQuery.sort)}
            </Select>
          </span>
        </label>
      </Col>
      <Col span={spanSize}>
        <label className="filter__item">
          <span className="filter__item__title">Section:</span>
          <span className="filter__item__control">
            <Select
              style={{ width: "100%" }}
              placeholder="select section"
              defaultValue={data.section}
              value={data.section}
              onChange={sectionChange}
              optionLabelProp="label"
            >
              {renderOptions(imgurFilterQuery.section)}
            </Select>
          </span>
        </label>
      </Col>
      <Col span={spanSize} style={{ display: "flex" }}>
        <Button
          disabled={loading}
          className="filter_btn"
          type="primary"
          shape="round"
          data-testid="filter-btn"
          onClick={doFilter}
        >
          <FilterOutlined />
          filter
        </Button>
        {isThereAnyFilter && <Button
          disabled={loading}
          className="clear-filter_btn"
          type="primary"
          shape="round"
          data-testid="clear-filter-btn"
          onClick={restFilter}
        >clear</Button>}
      </Col>
    </Row>
  }, [isThereAnyFilter, loading, data]);
  
  return isMobieOrTablet ? (
    <>
      <FilterOutlined
        onClick={setModalBeVisible}
        className="filter-icon-btn"
        data-testid="filter-btn-icon"
      />
      <Modal
        title="Filter form"
        centered
        footer={false}
        visible={modalVisible}
        onOk={setModalInVisible}
        onCancel={setModalInVisible}
      >
        <StyledDiv className="filter--vertical">
          <Vertical>{filterForm(24)} </Vertical>
        </StyledDiv>
      </Modal>
    </>
  ) : (
      <StyledDiv className="filter ">{filterForm()}</StyledDiv>
    );
};

export default Filter;
