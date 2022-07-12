import { Progress } from "@chakra-ui/react";
import { css } from "@emotion/css";
import { usePage } from "../pages/index";
import { BackButton } from "../component/BackButton";

const styled = {
  root: css`
    margin-top: 3.75rem;
    position: relative;
    .back {
      position: absolute;
      top: -30px;
      left: 20px;
      bottom: 0;
      margin: 0 auto;
    }
  `
};

function Header() {
  let value = 0;

  const { page, prevPage } = usePage();
  function showBack() {
    if (page > 0) {
      return (
        <div className="back" onClick={prevPage}>
          <BackButton />
        </div>
      );
    }
  }

  if (page === 0) value = 33.3;
  else if (page === 1) value = 66.6;
  else value = 100;
  return (
    <div className={styled.root}>
      {showBack()}
      <Progress value={value} size="xs" colorScheme="cyan" />
    </div>
  );
}

export default Header;
