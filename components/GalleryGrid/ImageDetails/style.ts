import styled from "styled-components";

import { graySolar, blackTea } from "~/assets/style/color";
import { rgba } from "polished";
const StyledDiv = styled.div`
  .image-details {
    &__media-cover {
      background: ${rgba(blackTea, 0.01)};
      &__img {
        max-width: 100%;
        width: 100%;
        display: block;
        margin: auto;
        max-height: calc(100vh - 100px);
        min-width: 0;
        width: auto;
        height: auto;
      }

      &__video {
        max-width: 100%;
        max-height: calc(100vh - 100px);
      }
    }
    &__info {
      padding: 16px;
      border-left: 2px solid ${graySolar};
      height: 100%;
      &__title {
        font-size: 1rem;
        font-weight: bold;
      }
      &__statics {
        margin-bottom: 8px;
        &__item {
          font-size: 1rem;
          margin-right: 16px;
          .anticon {
            margin-right: 8px;
          }
        }
      }
    }
  }
`;

export default StyledDiv;
