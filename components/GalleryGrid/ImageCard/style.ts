import styled from "styled-components";
import { blackMoa, gray, grayAlpha } from "~/assets/style/color";
const StyledDiv = styled.div`
  box-shadow: 0px 0px 4px ${gray};
  border-radius: 8px;
  overflow: hidden;
  height: 280px;
  width: 250px;
  position: relative;
  background: white;
  cursor: pointer;
  margin: auto;
  .image-card {
    &__media-cover {
      height: 200px;
      overflow: hidden;
      width: 100%;
      background: ${grayAlpha};
      &__img {
        max-width: 100%;
        object-fit: scale-down;
      }
    }
    &__img {
      &__description {
        color: ${blackMoa};
        padding: 8px 8px;
        font-size: 0.8rem;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        white-space: nowrap;
        margin: 0;
        padding-top: 16px;
        border-top: 2px solid ${gray};
      }
    }
  }

  .loader {
    position: absolute;
    top: 0;
    right: 0;
    text-align: center;
    width: 100%;
    background: rgba(230, 229, 229, 0.7);
    height: 100%;
    display: flex;
  }
`;

export default StyledDiv;
