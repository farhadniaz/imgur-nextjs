import styled from "styled-components";

const StyledDiv = styled.div`
  .filter {
    &__item {
      min-height: 32px;
      display: flex;
      &__title {
        padding-right: 8px;
        margin: auto;
      }
      &__control {
        margin: auto;
        width: 100%;
      }
    }
    &_btn {
      width: 100%;
      max-width: 150px;
      margin: 0 auto;
      display: block;
    }
  }
  .clear-filter_btn {
    margin-left: 8px;
  }
`;

export const Vertical = styled.div`
  padding: 24px;
  .filter {
    &__item {
      margin-bottom: 16px;
      &__title {
        width: 100px;
      }
    }
  }
`;

export default StyledDiv;
